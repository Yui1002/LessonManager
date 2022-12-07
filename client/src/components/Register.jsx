import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  const submitRegister = (e) => {
    e.preventDefault();

    let username = e.target[0].value;
    let password = e.target[1].value;

    axios.post('/register', {
      username: username,
      password: password
    })
    .then((data) => {
      // console.log('register data: ', data)
      if (data.status === 200) {
        setIsRegistered(true);
        navigate('/login');
      }
    })
    .catch(err => {
      setRegisterError(true);
      setIsRegistered(false);
    })
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={submitRegister}>
        <section>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" autoComplete="username" required autoFocus />
        </section>
        <section>
          <label htmlFor="current-password">Password</label>
          <input id="current-password" name="password" type="password" autoComplete="current-password" required />
        </section>
        <button type="submit" value="Register">Register</button>
      </form>
      {isRegistered && navigate('/login')}
      {registerError && <p>User already exists</p>}
      Already have an account? <button onClick={() => navigate('/login')}>Login</button>
    </div>
  )
}

export default Register;