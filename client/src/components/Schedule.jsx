import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Schedule.css";
import PopUpEvent from "./PopUpEvent.jsx";
import moment from "moment";
import ClassDetail from "./ClassDetail.jsx";
import { NUMBER_MONTHS } from "../CONSTANT.js";

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
    // console.log('head dates:', dates)
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
    // console.log('body dates: ', dates)
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
    // console.log('tail dates: ', dates)
    return dates;
  };

  const getPreviousMonth = () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }
    // setCurrentShownMonth(month);
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
    console.log(date);
    setClassDetailShown(true);
    setClassDate(date);
  };

  const getSchedule = async () => {
    const response = await axios.get("/schedule");
    const data = response.data;
    data.map((d) => {
      d["start_date"] = new Date(d["start_date"]).toString();
      d["end_date"] = new Date(d["end_date"]).toString();
    });

    setClasses(data);
  };

  const closeClassDetail = () => {
    setClassDetailShown(false);
  };

  return (
    <div className="schedule_container">
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
                              t["student_name"]
                            } ${startDate.getHours()}:${startDate.getMinutes()} - ${endDate.getHours()}:${endDate.getMinutes()}`}
                            {classDetailShown &&
                              className === "class_detail" &&
                              classDate === day.date && (
                                <div className={duringPopUp2}>
                                  <ClassDetail
                                    closeClassDetail={closeClassDetail}
                                    name={t['student_name']}
                                    date={day.date}
                                    description={t['description']}
                                    startDate={startDate}
                                    endDate={endDate}
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
            />
          </div>
        )}
      </div>
  );
};

export default Schedule;
