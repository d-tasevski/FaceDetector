const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const db = {
  users: [
    {
      id: 123,
      name: 'John',
      email: 'john@john.com',
      pass: 'secret',
      entries: 0,
      joined: new Date()
    },
    {
      id: 1234,
      name: 'Ann',
      email: 'ann@ann.com',
      pass: 'cake',
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get('/', (req, res) => {
  res.json(db.users);
});

app.post('/login', (req, res) => {
  if (
    req.body.email === db.users[0].email &&
    req.body.pass === db.users[0].pass
  ) {
    res.json('test login');
  }
  res.status(400).json('Error');
});

app.post('/register', (req, res) => {
  const { email, name, pass } = req.body;
  db.users.push({
    id: 12345,
    name: name,
    email: email,
    pass: pass,
    entries: 0,
    joined: new Date()
  });
  res.json(db.users[2]);
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
