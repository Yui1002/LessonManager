import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import { logOut } from "../helpers/cookie.js";

const Home = (props) => {
  const [open, setOpen] = useState(false);
  const [classScheduledIn1hour, setClassScheduledIn1hour] = useState([]);

  useEffect(() => {
    
    setOpen(true);
    hasClassSoon();
  }, []);

  const logout = () => {
    logOut();
  };

  const getStudents = async () => {
    axios.get('/students')
    .then(res => props.setStudents(res.data))
    .catch(err => console.log(err));
  };

  const hasClassSoon = () => {
    axios.get("/schedule/notification").then((data) => {
      console.log(data)
      setClassScheduledIn1hour(data.data);
    });
  };


  return (
    <div>
      <div className="side_nav">
        <Link to="/profile">Profile</Link>
        <Link to="/schedule">Schedule</Link>
        <Link to="/" onClick={logout}>
          Logout
        </Link>
        <Link to="/pastClass">Past Class</Link>
      </div>
      {open && classScheduledIn1hour.length > 0 && (
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
            <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {`Class starts within 1 hour with ${classScheduledIn1hour[0].name}`}
        </Alert>
      )}
      <h1 className="home_title">Hello Guillermo!</h1>
    </div>
  );
};

export default Home;
