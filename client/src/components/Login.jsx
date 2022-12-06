import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(false);

  const submitLogin = (e) => {
    e.preventDefault();

    let username = e.target[0].value;
    let password = e.target[1].value;

    if (!username.length || !password.length) {
      setFormError(true);
    }

    axios.post('/login', {
      username: username,
      password: password
    })
    .then(() => {

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
      {formError && <p>username or passport is empty</p>}
    </div>
  )
}

export default Login;