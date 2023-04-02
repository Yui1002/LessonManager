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
import PrivateRoute from './PrivateRoute.jsx';
import "./App.css";


const App = () => {
  const [students, setStudents] = useState([]);

  // useEffect(() => {
  //   getStudents();
  // }, []);

  // const getStudents = async () => {
  //   axios.get('/students')
  //   .then(res => setStudents(res.data))
  //   .catch(err => console.log(err));
  // };

  return (
    <Routes>
      <Route path="/" element={<Entry />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home setStudents={setStudents} />} />
        <Route
          path="/profile"
          // element={<Profile getStudents={getStudents} students={students} />}
          element={<Profile students={students} />}
        />
        <Route
          path="/schedule"
          element={<Schedule students={students} />}
        />
        <Route path="/pastClass" element={<PastClass />} />
      </Route>
    </Routes>
  );
};

export default App;
