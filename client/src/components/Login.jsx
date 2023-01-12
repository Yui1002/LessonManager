import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useState(false);
  const [loginError, setLoginError]= useState(false);

  const submitLogin = (e) => {
    e.preventDefault();

    let username = e.target[0].value;
    let password = e.target[1].value;

    axios.post('/login', {
      username: username,
      password: password
    })
    .then((data) => {
      if (data.status === 200) {
        setIsLogined(true);
        setLoginError(false);
      }
    })
    .catch(err => {
      setIsLogined(false);
      setLoginError(true);
    })
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={submitLogin}>
        <section>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" autoComplete="username" required autoFocus />
        </section>
        <section>
          <label htmlFor="current-password">Password</label>
          <input id="current-password" name="password" type="password" autoComplete="current-password" required />
        </section>
        <button type="submit" value="Sign in">Log in</button>
      </form>
      {isLogined && navigate('/home')}
      {loginError && <p>We cannot find an account with that information</p>}
      New user? <button onClick={() => navigate('/register')}>Register</button>
    </div>
  )
}

export default Login;