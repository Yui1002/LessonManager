import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db_setting = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

class Repository {
  async findUser(username) {
    const con = await mysql.createConnection(db_setting);
    const sql = "select username from users where username = ?";
    const [rows, fields] = await con.query(sql, [username]);
    return rows;
  }

  async findPassword(username) {
    const con = await mysql.createConnection(db_setting);
    const sql = "select password from users where username = ?";
    const [rows, fields] = await con.query(sql, [username]);
    return rows[0]["password"];
  }

  async registerUser(username, hashedPassword) {
    const con = await mysql.createConnection(db_setting);
    const sql = "insert into users values (?, ?);";
    const [rows, fields] = await con.query(sql, [username, hashedPassword]);
    return rows;
  }

  async getStudents() {
    const con = await mysql.createConnection(db_setting);
    const sql = "select * from students";
    const [rows, fields] = await con.query(sql);
    return rows;
  }

  async findStudent(email) {
    const con = await mysql.createConnection(db_setting);
    const sql = "select * from students where email = ?";
    const [rows, fields] = await con.query(sql, [email]);
    return rows;
  }

  async findStudentId(email) {
    const con = await mysql.createConnection(db_setting);
    const sql = "select id from students where email = ?";
    const [rows, fields] = await con.query(sql, [email]);
    return rows[0].id;
  }

  async createNewStudent(req, file) {
    const firstName = req.firstName;
    const lastName = req.lastName;
    const country = req.country;
    const phoneNumber = req.phoneNumber;
    const email = req.email;
    const lessonHours = req.lessonHours;

    const con = await mysql.createConnection(db_setting);
    const sql =
      "insert into students values (?, ?, ?, ?, ?, ?, ?)";
    const [rows, fields] = await con.query(sql, [
      firstName,
      lastName,
      country,
      phoneNumber,
      email,
      file.file,
      lessonHours,
    ]);
    return rows;
  }

  async deleteStudent(req) {
    const email = req.body.email;

    const sql_1 = "select profile_photo from students where email = ?";
    const sql_2 =
      "delete from schedules where student_id = (select id from students where email = ?);";
    const sql_3 = "delete from students where email = ?";

    const con = await mysql.createConnection(db_setting);
    const [rows_1, fields_1] = await con.query(sql_1, [email]);
    const [rows_2, fields_2] = await con.query(sql_2, [email]);
    const [rows_3, fields_3] = await con.query(sql_3, [email]);
    return rows_1[0].profile_photo;
  }

  async deletePhoto(email) {
    const sql = "select profile_photo from students where email = ?";
    const con = await mysql.createConnection(db_setting);
    const [rows, fields] = await con.query(sql, [email]);
    console.log('rowssssss: ', rows)
    return rows[0].profile_photo;
  }

  async updateStudent(req) {
    const con = await mysql.createConnection(db_setting);
    const sql =
      "update students set first_name=?, last_name=?, country=?, phone_number=?, email=?, profile_photo=?, lesson_hours=? where id=?";
    const [rows, fields] = await con.query(sql, [
      req.firstName,
      req.lastName,
      req.countryCode,
      req.phone,
      req.email,
      req.filePath,
      req.hours,
      req.id
    ]);
    return rows;
  }

  async getSchedule() {
    const con = await mysql.createConnection(db_setting);
    const sql =
      "select student_id, student_name, start_date, end_date, description from schedules;";
    const [rows, fields] = await con.query(sql);
    return rows;
  }

  async uploadStudentPhoto(file) {
    const con = await mysql.createConnection(db_setting);
    const sql = "update students set ";
  }

  async createNewClass(req, studentId) {
    const con = await mysql.createConnection(db_setting);
    const sql =
      "insert into schedules values (DEFAULT, ?, ?, ?, ?, ?);";
    const [rows, fields] = await con.query(sql, [
      studentId,
      req.name,
      req.startDate,
      req.endDate,
      req.description,
    ]);
    return rows;
  }

  async saveStudent(req) {
    const sql = "INSERT INTO students VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?);";
    const con = await mysql.createConnection(db_setting);
    await con.query(sql, [
      req.firstName,
      req.lastName,
      req.countryCode,
      req.phone,
      req.email,
      req.filePath,
      req.hours,
    ]);
  }
}

export default Repository;
