import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Hello Yui!</h1>
      <button onClick={() => navigate('/profile')}>Students' profiles</button>
      <button onClick={() => navigate('/schedule')}>Schedule</button>
    </div>
  )
}

export default Home;