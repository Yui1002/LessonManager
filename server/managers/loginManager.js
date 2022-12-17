import Repository from '../repositories/repository.js';

class LoginManager {
  constructor() {
    this.LoginRepository = new Repository();
  }

  async register(username, password) {
    const user = await this.LoginRepository.findUser(username);

    if (user.length === 0) {
      const response = await this.LoginRepository.registerUser(username, password);
      return response;
    } else {
      return 'User already exists';
    }
  }
}

export default LoginManager;