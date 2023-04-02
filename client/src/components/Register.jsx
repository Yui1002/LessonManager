import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  const submitRegister = (e) => {
    e.preventDefault();

    let username = e.target[0].value;
    let password = e.target[1].value;

    axios.post('http://localhost:80/?action=register', {
      username: username,
      password: password
    })
    .then((data) => {
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
    <div className='register_container'>
      <form onSubmit={submitRegister} className="register_form">
        <h1 className='register_title'>Register</h1>
        <section className='register_section_username'>
          <label htmlFor="username">Username</label><br/>
          <input id="username" name="username" type="text" autoComplete="username" required autoFocus className='register_input_username'/>
        </section>
        <section className='register_section_password'>
          <label htmlFor="current-password">Password</label><br/>
          <input id="current-password" name="password" type="password" autoComplete="current-password" required className='register_input_password'/>
        </section>
        <button type="submit" value="Register" className='register_button'>Register</button>
        {isRegistered && navigate('/login')}
        {registerError && <p>User already exists</p>}
        Already have an account? <button onClick={() => navigate('/login')} className="login_navigate_button">Login</button>
      </form>
    </div>
  )
}

export default Register;