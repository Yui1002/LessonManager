import LoginController from '../controllers/loginController.js';

class Routes {
  constructor() {
    this.LoginController = new LoginController();
  }

  applyRouting(app) {
    app.post('/register', async (req, res) => {
      const response = await this.LoginController.register(req.body.username, req.body.password);
      if (response === 'User already exists') {
        res.status(404).send('User already exists')
      } else {
        res.status(200).send('registered successfully');
      }
    });
  }
}

export default Routes;