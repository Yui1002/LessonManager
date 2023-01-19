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
    const response = await this.Repository.findStudentId(req.email);
    console.log('idddddd: ', response)
    if (!response.length) {
      return 'student does not exist';
    }
    const id = response[0].id;
    await this.Repository.createNewClass(req, id);
  }
}

export default ScheduleManager;