import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Schedule.css";
import PopUpEvent from "./PopUpEvent.jsx";
import moment from "moment";
import ClassDetail from "./ClassDetail.jsx";
import { NUMBER_MONTHS } from "../CONSTANT.js";
import Alert from "@mui/material/Alert";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const today = new Date();
const TODAY = today.getDate();
let year = today.getFullYear();
let month = today.getMonth();

const Schedule = (props) => {
  const [calendar, setCalendar] = useState([]);
  const [classes, setClasses] = useState([]);
  const [scheduleClassShown, setScheduleClassShown] = useState(false);
  const [noClassScheduled, setNoClassScheduled] = useState(false);
  const [classDetailShown, setClassDetailShown] = useState(false);
  const [currentShownSchedule, setCurrentShownSchedule] = useState({});
  const duringPopUp = scheduleClassShown ? "during-popup" : "";
  const duringPopUp2 = classDetailShown ? "during-popup_2" : "";
  const [className, setClassName] = useState("");
  const [classDate, setClassDate] = useState();
  const [isOverlapped, setIsOverlapped] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [open, setOpen] = useState(false);

  console.log('is overlapped', isOverlapped)

  const navigate = useNavigate();

  useEffect(() => {
    showCalendar();
    getSchedule();
  }, []);

  const showCalendar = () => {
    let dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];

    let weeks = [];
    let weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }

    setCalendar(weeks);
  };

  const getCalendarHead = () => {
    let dates = [];
    let d = new Date(year, month, 0).getDate(); // 30
    let n = new Date(year, month, 1).getDay(); // 4

    for (let i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
        month: month - 1,
        year: year,
      });
    }
    return dates;
  };

  const getCalendarBody = () => {
    let dates = [];
    let lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        month: month,
        year: year,
      });
    }
    return dates;
  };

  const getCalendarTail = () => {
    let dates = [];
    let lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        month: month + 1,
        year: year,
      });
    }
    return dates;
  };

  const getPreviousMonth = () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }
    showCalendar();
  };

  const getNextMonth = () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }
    showCalendar();
  };

  const setEvent = (e, year, month, date) => {
    setClassName(e.target.className);
    const event = {
      year: year,
      month: month + 1,
      date: date,
    };
    setCurrentShownSchedule(event);
    setScheduleClassShown(true);
  };

  const closeEvent = () => {
    setScheduleClassShown(false);
  };

  const showClassDetail = (date) => {
    setClassDetailShown(true);
    setClassDate(date);
  };

  const getSchedule = async () => {
    axios
      .get("/schedule")
      .then((res) => {
        if (!res.data || !res.data.length) {
          setClasses([]);
        } else {
          res.data.map((d) => {
            d["start_date"] = new Date(d["start_date"]).toString();
            d["end_date"] = new Date(d["end_date"]).toString();
          });
          setClasses(res.data);
        }
      })
      .catch((err) => console.log("error: ", err));
  };

  const closeClassDetail = () => {
    setClassDetailShown(false);
  };

  const deleteClass = (startDate, endDate) => {
    const warning = window.confirm(
      "Are you sure you want to delete the scheduled class?"
    );
    if (warning) {
      axios
        .delete("/schedule", {
          data: {
            startDate: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
            endDate: moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
          },
        })
        .then(async (data) => {
          await getSchedule();
        });
    }
  };

  return (
    <div className="schedule_container">
      {isOverlapped && open && (
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          This class is duplicated to another class. Try it different time. 
        </Alert>
      )}
      {isScheduled && (
        <Alert severity="success" >
          Class scheduled successfully
        </Alert>
      )}
      <button
        className="schedule_go_back_button"
        onClick={() => navigate("/home")}
      >
        Go Back
      </button>
      <br />
      <button className="schedule_prev_button" onClick={getPreviousMonth}>
        &lt;
      </button>
      <div className="schedule_title_date">
        {NUMBER_MONTHS[month + 1]} {year}
      </div>
      <button className="schedule_next_button" onClick={getNextMonth}>
        &gt;
      </button>
      {noClassScheduled && (
        <p className="schedule_no_class">No class scheduled in this month</p>
      )}
      <table className="schedule_calendar">
        <thead>
          <tr>
            {days.map((day) => (
              <th className="schedule_day" key={day}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map((week) => {
            return (
              <tr className="schedule_week">
                {week.map((day) => (
                  <td
                    className="schedule_date"
                    onClick={(e) =>
                      setEvent(e, year, day["month"], day["date"])
                    }
                  >
                    <span className="schedule_date_text">{day.date}</span>
                    {classes.map((t, idx) => {
                      const startDate = new Date(t["start_date"]);
                      const endDate = new Date(t["end_date"]);

                      if (
                        day.year === startDate.getFullYear() &&
                        day.month + 1 === startDate.getMonth() + 1 &&
                        day.date === startDate.getDate()
                      ) {
                        return (
                          <div
                            className="class_detail"
                            onClick={() => showClassDetail(day.date)}
                          >
                            {`${
                              t["name"]
                            } ${startDate.getHours()}:${startDate.getMinutes()} - ${endDate.getHours()}:${endDate.getMinutes()}`}
                            {classDetailShown &&
                              className === "class_detail" &&
                              classDate === day.date && (
                                <div className={duringPopUp2}>
                                  <ClassDetail
                                    closeClassDetail={closeClassDetail}
                                    name={t["name"]}
                                    date={day.date}
                                    description={t["description"]}
                                    startDate={startDate}
                                    endDate={endDate}
                                    getSchedule={getSchedule}
                                    deleteClass={deleteClass}
                                  />
                                </div>
                              )}
                          </div>
                        );
                      }
                    })}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {scheduleClassShown && className === "schedule_date" && (
        <div className={duringPopUp}>
          <PopUpEvent
            currentShownSchedule={currentShownSchedule}
            closeEvent={closeEvent}
            getSchedule={getSchedule}
            students={props.students}
            setIsOverlapped={setIsOverlapped}
            setIsScheduled={setIsScheduled}
            setOpen={setOpen}
          />
        </div>
      )}
    </div>
  );
};

export default Schedule;
