import Repository from '../repositories/repository.js';
import bcrypt from 'bcrypt';

class LoginManager {
  constructor() {
    this.LoginRepository = new Repository();
  }

  async register(username, password) {
    const user = await this.LoginRepository.findUser(username);

    if (user.length === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await this.LoginRepository.registerUser(username, hashedPassword);
      return response;
    } else {
      return 'User already exists';
    }
  }

  async login(username, password) {
    const user = await this.LoginRepository.findUser(username);
    if (!user.length) {
      return 'Incorrect username or password';
    }

    const hashedPassword = await this.LoginRepository.findPassword(username);
    const validPassword = await bcrypt.compare(password, hashedPassword);

    return (!validPassword) ? 'Incorrect username or password' : { name: user[0].username };
  }
}

export default LoginManager;