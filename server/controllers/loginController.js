import LoginManager from '../managers/loginManager.js';

class LoginController {
  constructor() {
    this.LoginManager = new LoginManager();
  }

  async register(username, password) {
    return await this.LoginManager.register(username, password);
  }

  async login(username, password) {
    return await this.LoginManager.login(username, password);
  }
}

export default LoginController;