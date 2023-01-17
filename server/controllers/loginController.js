import LoginManager from '../managers/loginManager.js';
import { body, validationResult } from 'express-validator';


class LoginController {
  constructor() {
    this.LoginManager = new LoginManager();
  }
  
  async register(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const response = await new LoginManager().register(username, password);
    if (response === 'User already exists') {
      res.status(400).send('User already exists');
    } else {
      res.status(200).send(response);
    }
  }

  async login(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const response = await new LoginManager().login(username, password);
    if (response === 'Incorrect username or password') {
      res.status(400).send('Incorrect username or password');
    } else {
      res.status(200).send(response);
    }
  }
}

export default LoginController;