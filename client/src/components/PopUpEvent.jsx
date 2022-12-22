import React, {useState} from 'react';
import axios from 'axios';
import './PopUpEvent.css';
import moment from 'moment';

const PopUpEvent = (props) => {
  const [scheduleError, setScheduleError] = useState('');

  const convertToUTC = (dateTime) => {
    const dateTimeObj = new Date(dateTime);

    const year = dateTimeObj.getUTCFullYear();
    const month = dateTimeObj.getUTCMonth() + 1;
    const date = dateTimeObj.getUTCDate();
    const hours = dateTimeObj.getUTCHours();
    const minutes = dateTimeObj.getUTCMinutes();

    const UTCDateTime = `${year}-${month}-${date} ${hours}:${minutes}:00`;

    return UTCDateTime;
  }

  const scheduleClass = async (e) => {
    e.preventDefault();

    // const date = e.target[0].value;
    const date = `${props.currentShownSchedule.year} / ${props.currentShownSchedule.month} / ${props.currentShownSchedule.date}`;
    const startTime = e.target[0].value;
    const endTime = e.target[1].value;
    const name = e.target[2].value;
    const description = e.target[3].value;

    const startDateTime = moment().format(`${date} ${startTime}:00`);
    const endDateTime = moment().format(`${date} ${endTime}:00`);

    if (startTime > endTime) {
      setScheduleError('Time Error')
      return;
    }

    axios.post('/schedule', {
      start: startDateTime,
      end: endDateTime,
      name: name,
      description: description
    })
    .then(res => {
      if (res.status === 200) {
        props.closeEvent();
        console.log(`class scheduled with ${name}`);
        props.getSchedule();
      }
    })
    .catch(err => {
      setScheduleError('Student does not exist');
    })
  }

  return (
    <div className="popup_event_container">
      <h3>Schedule a class</h3>
      <span className="popup_event_close" onClick={props.closeEvent}>&times;</span>
      <form onSubmit={scheduleClass}>
        <div>{props.currentShownSchedule.year} / {props.currentShownSchedule.month} / {props.currentShownSchedule.date}</div>
        <section>
          <label htmlFor="start_time">Start time</label>
          <input
            id="start_time"
            name="start_time"
            type="time"
            autoComplete="start_time"
            required autoFocus
          />
        </section>
        <section>
          <label htmlFor="end_time">End time</label>
          <input
            id="end_time"
            name="end_time"
            type="time"
            autoComplete="end_time"
            required autoFocus
          />
        </section>
        <section>
          <label htmlFor="name">Student name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required autoFocus
          />
        </section>
        <section>
          <label htmlFor="description">Description</label>
          <input
            id="ndescriptioname"
            name="description"
            type="text"
            autoComplete="description"
            required autoFocus
          />
        </section>
        <button type="submit" value="submit">submit</button>
      </form>
      {scheduleError.length && <p>{scheduleError}</p>}
    </div>
  )
}

export default PopUpEvent;