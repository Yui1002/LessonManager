import Repository from "../repositories/repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class LoginManager {
  constructor() {
    this.LoginRepository = new Repository();
  }

  async register(username, password) {
    const user = await this.LoginRepository.findUser(username);

    if (!user.length) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await this.LoginRepository.registerUser(
        username,
        hashedPassword
      );
      // create a token for the new created user
      const token = jwt.sign(
        {
          id: response.userId,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: 86400,
        }
      );
      return { auth: true, token: token };
    } else {
      return "User already exists";
    }
  }

  async login(username, password) {
    const user = await this.LoginRepository.findUser(username);
    // console.log('userrrr: ', user)
    if (!user.length) {
      return "User Not Found";
    }

    const hashedPassword = await this.LoginRepository.findPassword(username);
    const passwordIsValid = await bcrypt.compare(password, hashedPassword);
    if (!passwordIsValid) {
      return "Invalid Password";
    }
    const token = jwt.sign(
      {
        id: user[0].id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: 86400,
      }
    );

    return { auth: true, token: token, user: user };
  }
}

export default LoginManager;
