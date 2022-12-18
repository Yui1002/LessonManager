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

