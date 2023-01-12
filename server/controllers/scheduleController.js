import ScheduleManager from '../managers/scheduleManager.js';

class ScheduleController {
  constructor() {
    this.ScheduleManager = new ScheduleManager();
  }

  async getSchedule() {
    return await this.ScheduleManager.getSchedule();
  }

  async createNewClass(req) {
    return await this.ScheduleManager.createNewClass(req);
  }
}

export default ScheduleController;