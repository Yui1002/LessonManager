import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

/**
 * current datetime
 * schedule 
 */

const Home = () => {
  const logout = () => {
    axios.get('/logout')
  }


  return (
    <div>
      <div className='side_nav'>
        <Link to='/profile'>Profile</Link>
        <Link to='/schedule'>Schedule</Link>
        <Link to='/' onClick={logout}>Logout</Link>
      </div>
      <h1 className='home_title'>Hello Guillermo!</h1>
      <div>
        <h3>Upcoming Events</h3>
        
      </div>
    </div>
  )
}

export default Home;