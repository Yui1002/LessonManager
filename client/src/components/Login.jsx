import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { PATH } from '../../../config.js';

console.log(PATH)

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const submitLogin = (e) => {
    e.preventDefault();

    let username = e.target[0].value;
    let password = e.target[1].value;

    //localhost:80 (php port) /action=login
    axios.post('http://localhost:8888/lessonManager/api/login', {
      username: username,
      password: password
    })
      .then((data) => {
        setIsLoggedIn(true);
      })
      .catch(err => {
        setIsLoggedIn(false);
        setLoginError(true);
      })
  }

  return (
    <div className='login_container'>
      <form onSubmit={submitLogin} className="login_form">
      <h1 className='login_title'>Log in</h1>
        <section className='login_section_username'>
          <label htmlFor="username">Username</label><br/>
          <input id="username" name="username" type="text" autoComplete="username" required autoFocus className='login_input_username'/>
        </section>
        <section className='login_section_password'>
          <label htmlFor="current-password">Password</label><br/>
          <input id="current-password" name="password" type="password" autoComplete="current-password" required className='login_input_password'/>
        </section>
        <button type="submit" value="Sign in" className='login_button'>Log in</button>
        {isLoggedIn && navigate('/home')}
        {loginError && <p>We cannot find an account with that information</p>}
        New user? <button onClick={() => navigate('/register')} className="register_navigate_button">Register</button>
      </form>
    </div>
  )
}

export default Login;