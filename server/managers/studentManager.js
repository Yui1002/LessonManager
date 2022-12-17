import StudentRepository from '../repositories/studentRepository.js';

class StudentManager {
  constructor() {
    this.StudentRepository = new StudentRepository();
  }


}

export default StudentManager;