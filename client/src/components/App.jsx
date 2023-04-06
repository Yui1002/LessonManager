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
  return (
    <Routes>
      <Route path="/" element={<Entry />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mainPage" element={<Home/>} />
        <Route
          path="/profile"
          element={<Profile/>}
        />
        <Route
          path="/schedule"
          element={<Schedule/>}
        />
        <Route path="/pastClass" element={<PastClass />} />
      <Route element={<PrivateRoute />}>
  
      </Route>
    </Routes>
  );
};

export default App;
