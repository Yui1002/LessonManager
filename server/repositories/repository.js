import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const db_setting = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

class Repository {
  async findUser(username) {
    const con = await mysql.createConnection(db_setting);
    const sql = 'select username from users where username = ?';
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

  async findStudent(email) {
    const con = await mysql.createConnection(db_setting);
    const sql = 'select * from students where email = ?';
    const [rows, fields] = await con.query(sql, [email]);
    return rows;
  }

  async findStudentId(name) {
    const con = await mysql.createConnection(db_setting);
    const sql = 'select id from students where name = ?';
    const [rows, fields] = await con.query(sql, [name]);
    return rows;
  }

  async createNewStudent(req, file) {
    const firstName = req.firstName;
    const lastName = req.lastName;
    const country = req.country;
    const phoneNumber = req.phoneNumber;
    const email = req.email;
    const lessonHours = req.lessonHours;

    const con = await mysql.createConnection(db_setting);
    const sql = 'insert into students (first_name, last_name, country, phone_number, email, profile_photo, lesson_hours) values (?, ?, ?, ?, ?, ?, ?)';
    const [rows, fields] = await con.query(sql, [firstName, lastName, country, phoneNumber, email, file.file, lessonHours]);
    return rows;
  }

  async deleteStudent(req) {
    const email = req.body.email;

    const sql_1 = 'delete from schedules where student_id = (select id from students where email = ?);'
    const sql_2 = 'delete from students where email = ?';

    const con = await mysql.createConnection(db_setting);
    const [rows_1, fields_1] = await con.query(sql_1, [email]);
    const [rows_2, fields_2] = await con.query(sql_2, [email]);
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
    const sql = 'select st.first_name, st.last_name, sc.start_date, sc.end_date, sc.description from schedules sc inner join students st on st.id = sc.student_id;';
    const [rows, fields] = await con.query(sql);
    return rows;
  }

  async uploadStudentPhoto(file) {
    const con = await mysql.createConnection(db_setting);
    const sql = 'update students set '
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

  async saveStudent(req) {
    const sql = 'INSERT INTO students VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?);';
    const con = await mysql.createConnection(db_setting);
    await con.query(sql, [req.firstName, req.lastName, req.countryCode, req.phone, req.email, req.filePath, req.hours]);
  }

}

export default Repository;