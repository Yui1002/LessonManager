import ScheduleManager from '../managers/scheduleManager.js';

class ScheduleController {
  constructor() {
    this.ScheduleManager = new ScheduleManager();
  }

  async getSchedule(req, res) {
    const response = await new ScheduleManager().getSchedule();
    if (response === 'No class scheduled') {
      res.status(400).send('No class scheduled');
    } else {
      res.status(200).send(response);
    }
  }

  async createNewClass(req, res) {
    const response = await new ScheduleManager().createNewClass(req.body)
    res.status(200).send(response);
  }
}

export default ScheduleController;