import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
      <div className='side_nav'>
        <Link to='/profile'>Profile</Link>
        <Link to='/schedule'>Schedule</Link>
        <Link to='/'>Logout</Link>
      </div>
      <h1 className='home_title'>Hello Guillermo!</h1>
    </div>
  )
}

export default Home;