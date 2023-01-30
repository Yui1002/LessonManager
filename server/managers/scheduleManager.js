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
    const isClassOverlap = await this.Repository.isClassOverlap(req);
    console.log('isClassOverlap: ', isClassOverlap)
    if (isClassOverlap.length > 0) {
      return 'overlap error';
    } else {
      await this.Repository.createNewClass(req, studentId);
    }
  }

  async deleteClass(req) {
    const classId = await this.Repository.findClassId(req);
    const response = await this.Repository.deleteClass(classId);
    return response;
  }

  async getClassNotification() {
    return await this.Repository.getClassNotification();
  }

}

export default ScheduleManager;