const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const db = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'admin',
    password: '',
    database: 'facefinder'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

// // Load hash from your password DB.
// bcrypt.compare('bacon', hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare('veggies', hash, function(err, res) {
//   // res = false
// });

app.get('/', (req, res) => {
  res.json(db.users);
});

app.post('/login', (req, res) => {
  const { email, pass } = req.body;
  return db
    .select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(pass, data[0].hash);

      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', email)
          .then(user => res.json(user[0]))
          .catch(err => res.status(400).json(err));
      }
      return res.status(400).json('Error happened');
    })
    .catch(err => res.status(400).json(err));
});

app.post('/register', (req, res) => {
  const { email, name, pass } = req.body;
  const hash = bcrypt.hashSync(pass);

  // bcrypt.compareSync(myPlaintextPassword, hash); // true

  return db
    .transaction(trx => {
      trx
        .insert({
          hash,
          email
        })
        .into('login')
        .returning('email')
        .then(mail =>
          trx('users')
            .returning('*')
            .insert({
              name,
              email: mail[0],
              joined: new Date()
            })
            .then(user => res.json(user[0]))
            .catch(err => res.status(400).json(err))
        )
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json(err));
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;

  return db
    .select('*')
    .from('users')
    .where('id', id)
    .then(user => {
      if (user.length) res.json(user[0]);
      else res.status(404).json('User not found');
    })
    .catch(err => res.status(400).json('Server error'));
});

app.put('/image', (req, res) => {
  const { id } = req.body;

  return db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entry => res.json(entry[0]))
    .catch(err => res.status(400).json('Server error'));
});

app.listen(3003, () => {
  console.log('Server up and running');
});
