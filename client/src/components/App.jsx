import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Profile from "./Profile.jsx";
import Schedule from "./Schedule.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Home from "./Home.jsx";
import Entry from "./Entry.jsx";
import PastClass from "./PastClass.jsx";
import "./App.css";
import { config } from "./../../../config";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLogin = async (cb) => {
    axios
      .get(`${config.BASE_PATH}checkLogin`)
      .then(() => {
        setIsLoggedIn(true);
        cb();
      })
      .catch((err) => {
        setIsLoggedIn(false);
        navigate("/");
        return;
      });
  };

  return (
    <Routes>
      <Route path="/" element={<Entry />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/mainPage"
        element={<Home checkLogin={checkLogin} isLoggedIn={isLoggedIn} />}
      />
      <Route
        path="/profile"
        element={<Profile checkLogin={checkLogin} isLoggedIn={isLoggedIn} />}
      />
      <Route
        path="/schedule"
        element={<Schedule checkLogin={checkLogin} isLoggedIn={isLoggedIn} />}
      />
      <Route
        path="/pastClass"
        element={<PastClass checkLogin={checkLogin} isLoggedIn={isLoggedIn} />}
      />
    </Routes>
  );
};

export default App;
