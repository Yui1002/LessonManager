import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  const submitRegister = (e) => {
    e.preventDefault();

    let username = e.target[0].value;
    let password = e.target[1].value;

    axios.post('/register', {
      username: username,
      password: password
    })
    .then(() => {

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
    </div>
  )
}

export default Register;