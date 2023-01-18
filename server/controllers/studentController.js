import StudentManager from '../managers/studentManager.js';

class StudentController {
  constructor() {
    this.StudentManager = new StudentManager();
  }

  async getStudents(req, res) {
    const response = await new StudentManager().getStudents();
    res.status(200).send(response);
  }

  async createNewStudent(req, file) {
    return await this.StudentManager.createNewStudent(req, file);
  }

  async deleteStudent(req, res) {
    const response = await new StudentManager().deleteStudent(req);
    res.status(200).send(response);
  }

  async updateStudent(req) {
    let file = req.files.file;
    if (!file) {
      res.status(204).send('No file uploaded');
      return;
    }

    let studentUpdatedError = await new StudentManager().updateStudent(req.body, file);
    // console.log(req.body);
    // console.log(req.files.file)
    // return await new StudentManager().updateStudent(req);
  }

  async saveStudent(req, res, next) {
    let file = req.files.file;
    if (!file) {
      //do something else without image
      res.status(204).send('No file uploaded');
      return
    }

    let studentSavedError = await new StudentManager().saveStudent(req, file);
    if (studentSavedError) {
      res.status(500).send();
      return;
    }
    res.status(204).send();
  }

  async getStudentProfile(req, res, next) {
    let profile = await new StudentManager().getStudentByEmail(req.query.email);
    res.status(200).send(profile);
  }
}

export default StudentController;