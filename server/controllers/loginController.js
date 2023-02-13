import LoginManager from '../managers/loginManager.js';
import { body, validationResult } from 'express-validator';


class LoginController {
  constructor() {
    this.LoginManager = new LoginManager();
  }
  
  async register(req, res) {
    const response = await new LoginManager().register(req.body.username, req.body.password);
    if (response === 'User already exists') {
      res.status(400).send('User already exists');
    } else if (response.auth) {
      res.status(200).send({ auth: true, token: response.token });
    } else {
      res.send(500).send('Something is wrong')
    }
  }

  async login(req, res) {
    const response = await new LoginManager().login(req.body.username, req.body.password);
    if (response === 'User Not Found') {
      res.json({
        auth: false,
        message: 'User Not Found'
      })
    } else if (response === 'Invalid Password') {
      res.json({
        auth: false,
        message: 'Wrong Username or Password'
      })
    } else {
      res.json({
        auth: true,
        token: response.token
      })
    }
  }

}

export default LoginController;