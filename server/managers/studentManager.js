import Repository from '../repositories/repository.js';

class StudentManager {
  constructor() {
    this.Repository = new Repository();
  }

  async getStudents() {
    return await this.Repository.getStudents();
  }

  async createNewStudent(req) {
    const student = await this.Repository.findStudent(req.email);
    if (student.length !== 0) {
      return 'Student already exists';
    } else {
      await this.Repository.createNewStudent(req);
      return 'Successfully created new student';
    }
  }

  async deleteStudent(req) {
    return await this.Repository.deleteStudent(req);
  }

  async updateStudent(req) {
    const id = await this.Repository.findStudentId(req.name);
    return await this.Repository.updateStudent(req, id);
  }
}

export default StudentManager;