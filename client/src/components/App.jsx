import React from 'react';
import {HashRouter,Routes,Route} from "react-router-dom";
import Chat from './Chat.jsx';
import LessonCounts from './LessonCounts.jsx';
import Profile from './Profile.jsx';
import Schedule from './Schedule.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Home from './Home.jsx';
import Entry from './Entry.jsx';


const App = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Entry />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/home" element={<Home />}/>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App;