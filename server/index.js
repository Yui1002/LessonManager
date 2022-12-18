import express from 'express';
const app = express();
const port = 8000;
import path from 'path';
import { dirname } from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import Routes from './routes/routes.js';


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// app.use(passport.initialize());
// app.use(passport.session());
// import passportConfig from './passportConfig';
// passportConfig(passport)

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, './client/dist')));


new Routes().applyRouting(app);
// app.get('/login', (req, res) => {
//   res.send('hello test')
// });

// app.post('/login', async (req, res, next) => {

// })

// app.post('/login', (req, res, next) => {
//   const response = new Validator().validateLogin(req, res, next);
//   console.log(response);
  // console.log('response: ', response)
  // if (response) {
  //   req.Login(user, err => {
  //     if (err) throw err;
  //     res.status(200).send('authenticated')
  //   })
  // }
  // passport.authenticate('local', (err, user, info) => {
  //   if (err) throw err;
  //   if (!user.length || !user) {
  //     res.status(404).send('Incorrect username or password');
  //   } else {
  //     // establish a login session
  //     req.logIn(user, err => {
  //       if (err) throw err;
  //       // console.log('Successfully Authenticated!')
  //       // redirect to login page
  //       res.status(200).send('authenticated');
  //     })
  //   }
  // })(req, res, next)
// });

// app.get('/students', (req, res) => {
//   db.query('select * from students', (err, result) => {
//     if (err) throw err;

//     res.send(result);
//   })
// })

// app.post('/students', (req, res) => {
//   let name = req.body.name;
//   let lessonHour = req.body.lessonHour;
//   let email = req.body.email;

//   db.query('select * from students where name = ?', [name], (err, result) => {
//     if (err) throw err;
//     if (result.length !== 0) {
//       res.status(400).send('student already exists');
//     } else {
//       db.query('insert into students (name, lesson_hours, email) values (?, ?, ?)', [name, lessonHour, email], (err, result) => {
//         if (err) throw err;
//         res.status(200).send('student added')
//       })
//     }
//   })
// });

// app.delete('/student', (req, res) => {
//   let name = req.body.name;

//   db.query('delete from students where name = ?', [name], (err, result) => {
//     if (err) throw err;
//     res.status(200).send('student deleted');
//   })
// });

// app.put('/student', (req, res) => {
//   let name = req.body.name;
//   let updatedName = req.body.updatedName;
//   let updatedLessonHours = req.body.updatedLessonHours;
//   let updatedEmail = req.body.updatedEmail;

//   db.query('select id from students where name = ?', [name], (err, result) => {
//     if (err) throw err;
//     const id = result[0].id;

//     db.query('update students set name=?, lesson_hours=?, email=? where id=?', [updatedName, updatedLessonHours, updatedEmail, id], (err, result) => {
//       if (err) throw err;
//       res.status(200).send('student updated')
//     })
//   })
// });

// app.get('/schedule', (req, res) => {
//   console.log('params: ', req.params)
//   const sql = 'select st.name, sc.start_time, sc.end_time from schedules sc inner join students st on st.id = sc.student_id;';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     if (!result.length) {
//       res.status(400).send('no class scheduled');
//     } else {
//       console.log(result)
//       res.status(200).send(result);
//     }
//   })
// })

// app.post('/schedule', (req, res) => {
//   const startTime = req.body.start;
//   const endTime = req.body.end
//   const name = req.body.name;
//   const description = req.body.description;

//   db.query('select id from students where name = ?', [name], (err, result) => {
//     if (err) throw err;
//     if (!result.length) {
//       res.status(400).send('student does not exist');
//     } else {
//       const id = result[0].id;
//       const sql = 'insert into schedules (start_time, end_time, student_id, description) values (?, ?, ?, ?);'
//       db.query(sql, [startTime, endTime, id, description], (err, result) => {
//         if (err) throw err;
//         res.status(200).send('class scheduled')
//       })
//     }
//   })
// })


app.listen(port, () => console.log(`Listening on ${port}`));

