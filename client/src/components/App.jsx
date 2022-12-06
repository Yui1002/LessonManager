import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Chat from './Chat.jsx';
import LessonCounts from './LessonCounts.jsx';
import Profile from './Profile.jsx';
import Schedule from './Schedule.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Home from './Home.jsx';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/register" element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
  // return (
  //   <div>
  //     <h1>Lesson Manager</h1>
  //     <Register />
  //     {/* <Route path='register' element={<Register />} />
  //     <Route path='login' element={<Login />} /> */}
  //     {/* <Login /> */}
  //     {/* <Profile /> */}
  //     {/* <LessonCounts /> */}
  //     {/* <Schedule /> */}
  //     {/* <Chat /> */}
  //   </div>
  // )
}

export default App;