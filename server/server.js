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

console.log(
  db
    .select('*')
    .from('users')
    .then(data => console.log(data))
);

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
  // // Load hash from your password DB.
  // bcrypt.compare('bacon', hash, function(err, res) {
  //   // res == true
  // });

  console.log(req.body);
  if (
    req.body.email === db.users[0].email &&
    req.body.pass === db.users[0].pass
  ) {
    res.json('success');
  }
  res.status(400).json('Error');
});

app.post('/register', (req, res) => {
  const { email, name, pass } = req.body;

  bcrypt.hash(pass, null, null, function(err, hash) {
    // Store hash in your password DB.
  });
  db('users')
    .returning('*')
    .insert({
      email,
      name,
      joined: new Date()
    })
    .then(user => res.json(user[0]))
    .catch(err => res.status(400).json(err));
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;

  db.users.forEach(user => {
    if (user.id == id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json('User not found');
  }
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;

  db.users.forEach(user => {
    if (user.id == id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json('User not found');
  }
});

app.listen(3003, () => {
  console.log('Server up and running');
});
