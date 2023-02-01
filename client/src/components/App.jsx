import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Profile from "./Profile.jsx";
import Schedule from "./Schedule.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Home from "./Home.jsx";
import Entry from "./Entry.jsx";
import PastClass from './PastClass.jsx';
import "./App.css";

const App = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    axios.get('/students')
    .then(res => setStudents(res.data))
    .catch(err => console.log(err));
  };

  return (
    <>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Entry />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/home" element={<Home />} />
          <Route
            exact
            path="/profile"
            element={<Profile getStudents={getStudents} students={students} />}
          />
          <Route
            exact
            path="/schedule"
            element={<Schedule students={students} />}
          />
          <Route exact path="/pastClass" element={<PastClass />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
