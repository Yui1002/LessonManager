const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const Localtrategy = require('passport-local');
const db = require('./db.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/login', (req, res) => {
  res.send('hello test')
});

app.post('/login', (req, res, next) => {
  // console.log(req.body);
  passport.authenticate('local', (err, user, info) => {
    console.log('err: ', err);
    console.log('user in route: ', user);
    if (err) throw err;
    if (!user.length || !user) {
      res.status(404).send('Incorrect username or password');
    } else {
      // establish a login session
      req.logIn(user, err => {
        if (err) throw err;
        // console.log('Successfully Authenticated!')
        // redirect to login page
        res.status(200).send('authenticated');
      })
    }
  })(req, res, next)
});

app.post('/register', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  db.query('select * from users where username = ?', [username], async (err, result) => {
    if (err) throw err;

    if (result.length !== 0) {
      res.status(400).send('User already exists')
    }

    if (result.length === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query('insert into users (username, password) values (?, ?);', [username, hashedPassword], (err, result) => {
        if (err) throw err;

        // console.log('User created!');
        res.status(200).send('User created!')
      });
    }
  })
});


app.listen(port, () => console.log(`Listening on ${port}`));

