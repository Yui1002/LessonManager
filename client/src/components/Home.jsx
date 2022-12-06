import React from 'react';
import {useNavigate} from "react-router-dom"

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome to Manage Lesson App</h2>
      <button onClick={() => navigate('/register')}>Register</button>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  )
}

export default Home;