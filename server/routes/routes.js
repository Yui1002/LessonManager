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
    app.post('/register', this.LoginController.register); // ok

    app.post('/login', this.LoginController.login); // ok
    
    app.get('/students', this.StudentController.getStudents); //ok

    app.get('/schedule', this.ScheduleController.getSchedule); //ok

    app.post('/students', this.StudentController.saveStudent);

    app.get('/profile', this.StudentController.getStudentProfile);

    app.post('/schedule', this.ScheduleController.createNewClass);

    app.delete('/student', this.StudentController.deleteStudent);

    app.put('/student', this.StudentController.updateStudent);
  }
}

export default Routes;