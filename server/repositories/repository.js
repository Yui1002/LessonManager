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

}

export default Repository;