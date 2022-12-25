import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Profile from "./Profile.jsx";
import Schedule from "./Schedule.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Home from "./Home.jsx";
import Entry from "./Entry.jsx";
import "./App.css";

const App = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    const res = await axios.get("/students");
    setStudents(res.data);
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
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
