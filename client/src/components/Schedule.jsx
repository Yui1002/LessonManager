import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Schedule.css";
import PopUpEvent from "./PopUpEvent.jsx";
import ClassDetail from "./ClassDetail.jsx";
import ScheduleClassModal from "./ScheduleClassModal.jsx";
import { config } from "./../../../config";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { Alert, Badge } from "@mui/material";

const Schedule = (props) => {
  const [value, setValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [highlightedDays, setHighlisghtedDays] = useState([1, 2, 3]);
  const [test, setTest] = useState()

  useEffect(() => {
    getStudents();
    // getSchedules();
  }, []);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowSuccess(false);
      setShowError(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [showError, showSuccess]);

  const getStudents = () => {
    axios
      .get(`${config.BASE_PATH}getAllStudents`)
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  };

  const getSchedules = () => {
    // get all schedules
    axios
      .get(`${config.BASE_PATH}getClasses`)
      .then((res) => {
        let data = res.data;
        data.map((x) => {
          // extract date from data
          let dateTime = x["start_date"];
          let date = dateTime.split(" ")[0];
          // set to highlightedDays
          setHighlisghtedDays(date);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const serverDay = function () {
    return (
      <Badge key={"3"} overlap="circular" badgeContent={'🌚'}>
        <PickersDay outsideCurrentMonth={true} day={test} />
      </Badge>
    );
  };


  const onValueChange = function (e) {
    setTest(e);
    let currentSelectedYear = value.length > 0 ? value.split("-")[0] : "";
    let currentSelectedMonth = value.length > 0 ? value.split("-")[1] + 1 : "";
    let currentSelectedDay = value.length > 0 ? value.split("-")[2] : "";

    let year = e["$y"];
    let month = e["$M"] + 1;
    month = month < 10 ? `0${month}` : `${month}`;
    let day = e["$D"];
    day = day < 10 ? `0${day}` : `${day}`;
    setValue(`${year}-${month}-${day}`);

    if (
      currentSelectedYear == "" &&
      currentSelectedMonth == "" &&
      currentSelectedDay == ""
    )
      handleOpen(e);

    if (
      currentSelectedYear == year &&
      (currentSelectedMonth != month || currentSelectedDay != day)
    )
      handleOpen(e);
  };

  const handleOpen = function (e) {
    setModalOpen(true);
  };

  const handleClose = function () {
    setModalOpen(false);
  };

  return (
    <div className="schedule_container">
      {showSuccess && (
        <Alert severity="success">Class has been scheduled successfully!</Alert>
      )}
      {showError && (
        <Alert severity="error">
          This class is overlapped with other class
        </Alert>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          onChange={onValueChange}
          showDaysOutsideCurrentMonth
        />
        {modalOpen && (
          <ScheduleClassModal
            modalOpen={modalOpen}
            handleClose={handleClose}
            handleOpen={handleOpen}
            value={value}
            students={students}
            setShowError={setShowError}
            setShowSuccess={setShowSuccess}
            setModalOpen={setModalOpen}
          />
        )}
      </LocalizationProvider>
    </div>
  );
};

export default Schedule;
