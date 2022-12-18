import LoginController from '../controllers/loginController.js';
import Validator from '../validator/validator.js';

class Routes {
  constructor() {
    this.LoginController = new LoginController();
    this.Validator = new Validator();
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
      console.log('response: ', response)
      if (response === 'Incorrect username or password') {
        res.status(400).send('Incorrect username or password');
      } else {
        res.status(200).send('Logined successfully');
      }
    })
  }
}

export default Routes;