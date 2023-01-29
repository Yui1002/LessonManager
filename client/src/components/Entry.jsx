import React from 'react';
import {useNavigate} from "react-router-dom";
import './Entry.css';

const Entry = () => {
  const navigate = useNavigate();

  return (
    <div className='entry_container'>
      <h2 className='entry_title'>Manage Lesson App</h2>
      <div className='entry_button'>
        <button onClick={() => navigate('/register')} className="button_signup">Register</button>
        <button onClick={() => navigate('/login')} className="button_signin">Login</button>
      </div>
    </div>
  )
}

export default Entry;