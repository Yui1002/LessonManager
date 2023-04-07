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
import { Alert } from "@mui/material";

const Schedule = (props) => {
  const [value, setValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    getStudents();
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

  const getStudents = async () => {
    axios
      .get(`${config.BASE_PATH}getAllStudents`)
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  };

  const onValueChange = function (e) {
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
        <DateCalendar onChange={onValueChange} showDaysOutsideCurrentMonth />
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
