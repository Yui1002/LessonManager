import StudentManager from '../managers/studentManager.js';

class StudentController {
  constructor() {
    this.StudentManager = new StudentManager();
  }

  async getStudents() {
    return await this.StudentManager.getStudents();
  }

  async createNewStudent(req) {
    return await this.StudentManager.createNewStudent(req);
  }

  async deleteStudent(req) {
    return await this.StudentManager.deleteStudent(req);
  }

  async updateStudent(req) {
    return await this.StudentManager.updateStudent(req);
  }
}

export default StudentController;