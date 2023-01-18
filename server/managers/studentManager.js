import Repository from '../repositories/repository.js';
import fs from "fs"
import dotenv from 'dotenv';
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
    return studentsWithBase64;
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
    const deletedPhoto = await this.Repository.deleteStudent(req);
    fs.unlink(deletedPhoto, (err) => {
      if (err) {
        console.log('Failed to delete the file');
      } else {
        console.log('File removed')
      }
    });
  }

  async updateStudent(req, file) {
    console.log('reqqqqq: ', req);
    console.log('file: ', file)
    const id = await this.Repository.findStudentId(req.body.email);
    console.log('iddddd: ', id)

    // delete old photo => get image file from database => fs.unlink()
    const deletedPhoto = await this.Repository.deletePhoto(req.body.email);
    fs.unlink(deletedPhoto, (err) => {
      if (err) {
        console.log('Failed to delete the file');
      } else {
        console.log('File removed');
      }
    });

    try {
      let buffer = Buffer.from(file.data);
      let path = this.generateNameAndPath(file.name);
      this.writeFile(path, buffer);
      await this.Repository.updateStudent({
        id: id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        countryCode: req.body.country,
        phone: req.body.phoneNumber,
        email: req.body.email,
        newEmail: req.body.newEmail,
        filePath: path,
        hours: req.body.lessonHours
      })
    } catch (e) {
      console.log('exception thrown: ', e);
      return e;
    }
    
    return null;
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
        countryCode: req.body.country,
        phone: req.body.phoneNumber,
        email: req.body.email,
        filePath: path,
        hours: req.body.lessonHours
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
    console.log('path + name: ', path + name)
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