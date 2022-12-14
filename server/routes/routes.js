import LoginController from '../controllers/loginController.js';
import StudentController from '../controllers/studentController.js';
import ScheduleController from '../controllers/scheduleController.js';

class Routes {
  constructor() {
    this.LoginController = new LoginController();
    this.StudentController = new StudentController();
    this.ScheduleController = new ScheduleController();
  }

  applyRouting(app) {
    app.post('/register', async (req, res) => {
      const response = await this.LoginController.register(req.body.username, req.body.password);
      if (response === 'User already exists') {
        res.status(400).send('User already exists')
      } else {
        res.status(200).send('registered successfully');
      }
    });

    app.post('/login', async (req, res) => {
      const response = await this.LoginController.login(req.body.username, req.body.password);
      if (response === 'Incorrect username or password') {
        res.status(400).send('Incorrect username or password');
      } else {
        res.status(200).send('Logined successfully');
      }
    });

    app.get('/students', async (req, res) => {
      const response = await this.StudentController.getStudents();
      res.status(200).send(response);
    });

    app.get('/schedule', async (req, res) => {
      const response = await this.ScheduleController.getSchedule();
      if (response === 'No class scheduled') {
        res.status(400).send('No class scheduled');
      } else {
        res.status(200).send(response);
      }
    })

    app.post('/students', async (req, res) => {
      const response = await this.StudentController.createNewStudent(req.body);
      if (response === 'Student already exists') {
        res.status(400).send('Student already exists');
      } else {
        res.status(200).send('Successfully created new student');
      }
    });

    app.post('/schedule', async (req, res) => {
      const response = await this.ScheduleController.createNewClass(req.body);
      res.status(200).send('Class scheduled');
    })

    app.delete('/student', async (req, res) => {
      const response = await this.StudentController.deleteStudent(req.body);
      res.status(200).send('Successfully deleted the student');
    });

    app.put('/student', async (req, res) => {
      const response = await this.StudentController.updateStudent(req.body);
      res.status(200).send(response);
    });
  }
}

export default Routes;