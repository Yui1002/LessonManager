import Repository from '../repositories/repository.js';

class ScheduleManager {
  constructor() {
    this.Repository = new Repository();
  }

  async getSchedule() {
    const schedule = await this.Repository.getSchedule();
    if (!schedule.length) {
      return 'No class scheduled';
    }
    return schedule;
  }

  async createNewClass(req) {
    const studentId = await this.Repository.findStudentId(req.email);
    if (!studentId) {
      return 'student does not exist';
    }
    await this.Repository.createNewClass(req, studentId);
  }
}

export default ScheduleManager;