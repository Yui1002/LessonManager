import React from 'react';
import Chat from './Chat.jsx';
import LessonCounts from './LessonCounts.jsx';
import Profile from './Profile.jsx';
import Schedule from './Schedule.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

const App = () => {
  return (
    <div>
      <h1>Lesson Manager</h1>
      <Register />
      <Login />
      {/* <Profile /> */}
      {/* <LessonCounts /> */}
      {/* <Schedule /> */}
      {/* <Chat /> */}
    </div>
  )
}

export default App;