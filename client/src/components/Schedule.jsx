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
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { Alert, Badge } from "@mui/material";

function ServerDay(props) {
  const { highlightedDays, day, outsideCurrentMonth, ...other } = props;
  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) > 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      color="primary"
      badgeContent={isSelected ? "" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

const Schedule = (props) => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [value, setValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [highlightedDays, setHighlisghtedDays] = useState([1, 2, 15]);

  useEffect(() => {
    getStudents();
    getSchedules();
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
    axios
      .get(`${config.BASE_PATH}getClassesByDate`, {
        params: {
          month: month,
          year: year,
        },
      })
      .then((res) => {
        res.data.map((x) => {
          let dateTime = x["start_date"];
          let date = new Date(dateTime).getDate();
          console.log(highlightedDays);
          // if (highlightedDays.indexOf(date) < 0) {
          //   console.log('yes: ', date)
          setHighlisghtedDays((oldArray) => [...oldArray, date]);
          // } else {
          //   console.log('duplicate')
          // }
        });
        // setHighlisghtedDays((val) =>
        //   val.map((x) => new Date(x["start_date"]).getDate())
        // );
        // setHighlisghtedDays(val => val.map((x) => {
        //   let dateTime = x["start_date"];
        //   let date = new Date(dateTime).getDate();
        //   return date;
        // }))
        // res.data.map((x) => {
        //   let dateTime = x["start_date"];
        //   let date = new Date(dateTime).getDate();
        //   console.log(date)
        //   setHighlisghtedDays(oldArray => [...oldArray, date]);
        // })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // function ServerDay(props) {
  //   const { highlightedDays, day, outsideCurrentMonth, ...other } = props;
  //   return (
  //     <Badge key={"3"} overlap="circular" badgeContent={"🌚"}>
  //       <PickersDay
  //         {...other}
  //         outsideCurrentMonth={outsideCurrentMonth}
  //         day={day}
  //       />
  //     </Badge>
  //   );
  // }

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

  const handleMonthChange = function (e) {
    setMonth(e["$M"] + 1);
  };

  const handleYearChange = function (e) {
    setYear(e["$y"]);
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
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
          showDaysOutsideCurrentMonth
          slots={{ day: ServerDay }}
          slotProps={{ day: { highlightedDays } }}
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
