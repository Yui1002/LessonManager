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

app.get('/students', (req, res) => {
  db.query('select * from students', (err, result) => {
    if (err) throw err;

    res.send(result);
  })
})

app.post('/students', (req, res) => {
  let name = req.body.name;
  let lessonHour = req.body.lessonHour;
  let email = req.body.email;

  db.query('select * from students where name = ?', [name], (err, result) => {
    if (err) throw err;
    if (result.length !== 0) {
      res.status(400).send('student already exists');
    } else {
      db.query('insert into students (name, lesson_hours, email) values (?, ?, ?)', [name, lessonHour, email], (err, result) => {
        if (err) throw err;
        res.status(200).send('student added')
      })
    }
  })
});

app.delete('/student', (req, res) => {
  let name = req.body.name;

  db.query('delete from students where name = ?', [name], (err, result) => {
    if (err) throw err;
    res.status(200).send('student deleted');
  })
});

app.put('/student', (req, res) => {
  console.log('req.body: ', req.body);
  let name = req.body.name;
  let updatedName = req.body.updatedName;
  let updatedLessonHours = req.body.updatedLessonHours;
  let updatedEmail = req.body.updatedEmail;

  db.query('select id from students where name = ?', [name], (err, result) => {
    if (err) throw err;
    const id = result[0].id;

    db.query('update students set name=?, lesson_hours=?, email=? where id=?', [updatedName, updatedLessonHours, updatedEmail, id], (err, result) => {
      if (err) throw err;
      res.status(200).send('student updated')
    })
  })
});

app.post('/schedule', (req, res) => {
  console.log('hello')
  console.log(req.body);
  const startTime = req.body.startTime;
  const endTime = req.body.endTime
  const name = req.body.name;
  const description = req.body.description;

  db.query('select id from students where name = ?', [name], (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.status(400).send('student does not exist');
    }

    const id = result[0].id
    const sql = 'insert into schedules (start_time, end_time, student_id, description) values (?, ?, ?, ?);'
    db.query(sql, [startTime, endTime, id, description], (err, result) => {
      if (err) throw err;

      res.status(200).send('class scheduled')
    })
  })
})


app.listen(port, () => console.log(`Listening on ${port}`));

