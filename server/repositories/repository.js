import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const db_setting = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
};

class Repository {
  async findUser(username) {
    const con = await mysql.createConnection(db_setting);
    const sql = 'select * from users where username = ?';
    const [rows, fields] = await con.query(sql, [username]);
    return rows;
  }

  async findPassword(username) {
    const con = await mysql.createConnection(db_setting);
    const sql = 'select password from users where username = ?';
    const [rows, fields] = await con.query(sql, [username]);
    return rows[0]['password'];
  }

  async registerUser(username, hashedPassword) {
    const con = await mysql.createConnection(db_setting);
    const sql = 'insert into users (username, password) values (?, ?);';
    const [rows, fields] = await con.query(sql, [username, hashedPassword]);
    return rows;
  }

  async getStudents() {
    const con = await mysql.createConnection(db_setting);
    const sql = 'select * from students';
    const [rows, fields] = await con.query(sql);
    return rows;
  }

  async findStudent(name) {
    const con = await mysql.createConnection(db_setting);
    const sql = 'select * from students where name = ?';
    const [rows, fields] = await con.query(sql, [name]);
    return rows;
  }

  async findStudentId(name) {
    const con = await mysql.createConnection(db_setting);
    const sql = 'select id from students where name = ?';
    const [rows, fields] = await con.query(sql, [name]);
    return rows;
  }

  async createNewStudent(req) {
    const name = req.name;
    const lessonHour = req.lessonHour;
    const email = req.email;

    const con = await mysql.createConnection(db_setting);
    const sql = 'insert into students (name, lesson_hours, email) values (?, ?, ?)';
    const [rows, fields] = await con.query(sql, [name, lessonHour, email]);
    return rows;
  }

  async deleteStudent(req) {
    const name = req.name;

    const sql_1 = 'delete from schedules where student_id = (select id from students where name = ?);'
    const sql_2 = 'delete from students where name = ?';

    const con = await mysql.createConnection(db_setting);
    const [rows_1, fields_1] = await con.query(sql_1, [name]);
    const [rows_2, fields_2] = await con.query(sql_2, [name]);
    return rows_2;
  }

  async updateStudent(req, id) {
    const updatedName = req.updatedName;
    const updatedLessonHours = req.updatedLessonHours;
    const updatedEmail = req.updatedEmail;

    const con = await mysql.createConnection(db_setting);
    const sql = 'update students set name=?, lesson_hours=?, email=? where id=?';
    const [rows, fields] = await con.query(sql, [updatedName, updatedLessonHours, updatedEmail, id]);
    return rows;
  }

  async getSchedule() {
    const con = await mysql.createConnection(db_setting);
    const sql = 'select st.name, sc.start_time, sc.end_time, sc.description from schedules sc inner join students st on st.id = sc.student_id;';
    const [rows, fields] = await con.query(sql);
    return rows;
  }

  async isClassDuplicated(req) {
    // const date = req.start.split(' ')[0];
    // const startTime = req.start.split(' ')[1];
    // const endTime = req.end.split(' ')[1];
    // const name = req.name;

    // const replacedDate = date.toString().replaceAll(':', '/');
    // const replacedDateTime = `${replacedDate} ${startTime}`

    // const MS_PER_MINUTE = 60000;
    // const myStartDate = new Date(new Date(replacedDateTime) - 60 * MS_PER_MINUTE);

    // console.log('myStartDate: ', myStartDate);


    // class time: 4:35 - 5:35
    // cannot schedule between 4:05 - 6:05 cannot schedule
    // const con = await mysql.createConnection(db_setting);
    // const sql = 'SELECT * FROM schedules WHERE (start_time BETWEEN ? AND ?)';
    // const [rows, fields] = await con.query(sql, [])
  }

  async createNewClass(req, id) {
    const startTime = req.start;
    const endTime = req.end
    const name = req.name;
    const description = req.description;

    const con = await mysql.createConnection(db_setting);
    const sql = 'insert into schedules (start_time, end_time, student_id, description) values (?, ?, ?, ?);';
    const [rows, fields] = await con.query(sql, [startTime, endTime, id, description]);
    return rows;
  }

}

export default Repository;