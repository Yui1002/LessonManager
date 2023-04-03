import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PopUpEvent.css";
import moment from "moment";
import { config } from './../../../config';

const PopUpEvent = (props) => {
  const [scheduleError, setScheduleError] = useState("");

  const scheduleClass = async (e) => {
    e.preventDefault();
    const name = e.target[0].value.slice(0, e.target[0].value.indexOf('(') - 1);
    const email = e.target[0].value.slice(e.target[0].value.indexOf('(') + 1, e.target[0].value.length - 1);
    const startTime = e.target[1].value;
    const endTime = e.target[2].value;

    const year = props.currentShownSchedule.year;
    const month = (props.currentShownSchedule.month < 10) ? '0' + props.currentShownSchedule.month : props.currentShownSchedule.month;
    const date = (props.currentShownSchedule.date < 10) ? '0' + props.currentShownSchedule.date : props.currentShownSchedule.date;
    
    const startDateInTimeStamp = `${year}-${month}-${date} ${startTime}:00`;
    const endDateInTimeStamp = `${year}-${month}-${date} ${endTime}:00`;

    if (checkDateError(startDateInTimeStamp, endDateInTimeStamp)) {
      setScheduleError('Please select a future data and time');
      return;
    }

    axios
      .post(`${config.BASE_PATH}createClass`, {
        name: name,
        email: email,
        startDate: startDateInTimeStamp,
        endDate: endDateInTimeStamp,
        description: e.target[3].value
      })
      .then((res) => {
        if (res.data === 'overlap error') {
          props.setIsOverlapped(true);
          props.setOpen(true);
          props.closeEvent();
        } else if (res.status === 200) {
          props.closeEvent();
          console.log(`class scheduled with ${name}`);
          props.setIsScheduled(true);
          props.setOpen(true);
          props.getSchedule();
        }
      })
      .catch((err) => {
        setScheduleError("Student does not exist");
      });
  };

  const checkDateError = (start, end) => {
    let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    return start > end || start < currentTime || end < currentTime;
  }

  return (
    <div className="popup_event_container">
      <h2 className="popup_event_title">Schedule a class</h2>
      <span className="popup_event_close" onClick={props.closeEvent}>
        &times;
      </span>
      <form onSubmit={scheduleClass}>
        <div className="popup_event_date">
          {props.currentShownSchedule.year} / {props.currentShownSchedule.month}{" "}
          / {props.currentShownSchedule.date}
        </div>
        <section className="popup_event_section">
          <label htmlFor="name">Student name</label>
          <select name="name" id="name">
            <option>select</option>
            {props.students.length && props.students.map((student, index) => (
              <option key={index}>{`${student.firstName} ${student.lastName} (${student.email})`}</option>
            ))}
          </select>
        </section>
        <section className="popup_event_section">
          <label htmlFor="start_time">Start time</label>
          <input
            id="start_time"
            name="start_time"
            type="time"
            autoComplete="start_time"
            required
            autoFocus
          />
        </section>
        <section className="popup_event_section">
          <label htmlFor="end_time">End time</label>
          <input
            id="end_time"
            name="end_time"
            type="time"
            autoComplete="end_time"
            required
            autoFocus
          />
        </section>
        <section className="popup_event_section">
          <label htmlFor="description">Description</label>
          <input
            id="ndescriptioname"
            name="description"
            type="text"
            autoComplete="description"
            required
            autoFocus
          />
        </section>
        <button type="submit" value="submit">
          submit
        </button>
      </form>
      {scheduleError.length !== "" && <p>{scheduleError}</p>}
    </div>
  );
};

export default PopUpEvent;
