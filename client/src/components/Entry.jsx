import React from 'react';
import { Link } from "react-router-dom";
import './Entry.css';
 
const Entry = () => {

  return (
    <div className='entry_container'>
      <h2 className='entry_title'>Manage Lesson App</h2>
      <div className='entry_button'>
        <Link to="/register">
          <button className="button_signup">Register</button>
        </Link>
        <Link to="/login">
          <button className="button_signin">Login</button>
        </Link>
      </div>
    </div>
  )
}

export default Entry;