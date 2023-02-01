import e from 'express';
import ScheduleManager from '../managers/scheduleManager.js';

class ScheduleController {
  constructor() {
    this.ScheduleManager = new ScheduleManager();
  }

  async getSchedule(req, res) {
    const response = await new ScheduleManager().getSchedule();
    if (response === 'No class scheduled') {
      res.status(204).send('No class scheduled');
    } else {
      res.status(200).send(response);
    }
  }

  async createNewClass(req, res) {
    const response = await new ScheduleManager().createNewClass(req.body);
    if (response === 'overlap error') {
      res.status(200).send('overlap error');
    } else {
      res.status(200).send(response);
    }
  }

  async deleteClass(req, res) {
    const response = await new ScheduleManager().deleteClass(req.body);
    if (response === 'class deleted') {
      res.status(200).send('class deleted successfully');
    } else {
      res.status(500).send('failed to delete class');
    }
  }

  async getClassNotification(req, res) {
    const response = await new ScheduleManager().getClassNotification();
    console.log('response: ', response)
    if (!response || response.length === 0) {
      res.status(204).send('There is no class scheduled in 1 hour');
    } else {
      res.status(200).send(response);
    }
  }

  async getPastClasses(req, res) {
    const response = await new ScheduleManager().getPastClasses();
    if (!response || response.length === 0) {
      res.status(204).send('there is no class done in the past')
    } else {
      res.status(200).send(response);
    }
  }

}

export default ScheduleController;