import Repository from '../repositories/repository.js';
import fs from "fs"
import dotenv from 'dotenv';
import util from "util"
dotenv.config();


class StudentManager {
  constructor() {
    this.Repository = new Repository();
  }

  async getStudents() {
    const students = await this.Repository.getStudents();

    const promises = students.map(async student => {
      const base64 = await this.getStudentByEmail(student.email);
      return base64;
    });

    const studentsWithBase64 = await Promise.all(promises);
    // console.log(studentsWithBase64);
    

    // for (let i = 0; i < students.length; i++) {
    //   students[i].profile_photo = await this.getStudentByEmail(students[i].email);
    // }
    console.log('studentsWithBase64: ', studentsWithBase64)

    // console.log('studentssss:', students)
    return studentsWithBase64;
    // return await this.Repository.getStudents();
  }

  async createNewStudent(req, file) {
    const student = await this.Repository.findStudent(req.email);
    if (student.length !== 0) {
      return 'Student already exists';
    } else {
      await this.Repository.createNewStudent(req, file);
      return 'Successfully created new student';
    }
  }

  async uploadStudentPhoto(file) {
    return await this.Repository.uploadStudentPhoto(file);
  }

  async deleteStudent(req) {
    return await this.Repository.deleteStudent(req);
  }

  async updateStudent(req) {
    const id = await this.Repository.findStudentId(req.name);
    return await this.Repository.updateStudent(req, id);
  }

  async getStudentByEmail(email) {
    const student = await this.Repository.findStudent(email);
     if (!student[0]) return 'No student found'

     const contents = fs.readFileSync(student[0].profile_photo);
     const contents_in_base64 = contents.toString('base64');
     return {
      firstName: student[0].first_name,
      lastName: student[0].last_name,
      country: student[0].country,
      phone: student[0].phone_number,
      email: student[0].email,
      lessonHours: student[0].lesson_hours,
      profile_photo: contents_in_base64
     };
  }

  async saveStudent(req, file) {
    const student = await this.Repository.findStudent(req.body.email);
    if (student.length !== 0) {
      return 'Student already exists';
    }
    try {
      let buffer = Buffer.from(file.data);
      let path = this.generateNameAndPath(file.name);
      this.writeFile(path, buffer);
      await this.Repository.saveStudent({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        countryCode: req.body.countryCode,
        phone: req.body.phone,
        email: req.body.email,
        filePath: path,
        hours: req.body.hours
      });
    } catch (e) {
      console.log("exception thrown", e);
      return e;
    }
    return null;
  }


  //fileName -> gorilla.jpeg
  //fileName -> gorilla{randomeNum}.jpeg
  //return ./images/gorilla{namdomNum}.jpeg
  generateNameAndPath(fileName) {
    let name = fileName.substring(0, fileName.lastIndexOf('.'));
    if (name.length > 15) name = name.substring(0, 15);
    name = name.replace(/\s/g, '');
    let nameMime = fileName.substring(fileName.lastIndexOf('.'));
    let timestampSec = Math.floor(Date.now()/1000) + "";
    let path = process.env.IMAGE_PATH;
    name += (timestampSec + nameMime);
    return path + name;
  }

  writeFile(name, buffer) {
    fs.writeFile(name, buffer, (err) => {
      if (err) {
        console.log("error writing file", err);
        return;
      }
      console.log("file has been saved");
    });
  }
}

export default StudentManager;