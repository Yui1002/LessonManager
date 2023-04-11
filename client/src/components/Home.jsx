import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { IconButton, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from 'react-router-dom';
import { config } from './../../../config';

const Home = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [classScheduledIn1hour, setClassScheduledIn1hour] = useState([]);

  useEffect(() => {
    setOpen(true);
    hasClassSoon();
  }, []);

  const logout = () => {
    axios.get(`${config.BASE_PATH}endSession`)
    .then(() => {
      navigate('/')
      return;
    }).catch((err) => {
      console.log(err);
      navigate('/')
      return;
    })
  };

  const hasClassSoon = () => {
    axios.get(`${config.BASE_PATH}notification`).then((data) => {
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
