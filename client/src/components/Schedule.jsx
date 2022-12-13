import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Schedule.css';
import PopUpEvent from './PopUpEvent.jsx';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();
let year = today.getFullYear();
let month = today.getMonth();

const Schedule = () => {
  const [calendar, setCalendar] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [newEventDate, setNewEventDate] = useState('');
  const [popUp, setPopUp] = useState(false);
  const duringPopUp = popUp ? "during-popup" : "";

  useEffect(() => {
    showCalendar();
    getSchedule();
  }, [])

  const showCalendar = () => {
    let dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail()
    ];

    let weeks = [];
    let weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }

    setCalendar(weeks);
  }

  const getCalendarHead = () => {
    let dates = [];
    let d = new Date(year, month, 0).getDate();
    let n = new Date(year, month, 1).getDay();

    for(let i = 0; i < n; i++) {
        dates.unshift({
            date: d - i,
            isToday: false,
            isDisabled: true
        });
    }
    return dates;
  }

  const getCalendarBody = () => {
    let dates = [];
    let lastDate = new Date(year, month + 1, 0).getDate();

    for(let i = 1; i <= lastDate; i++) {
        dates.push({
            date: i,
            isToday: false,
            isDisabled: false
        });
    }
    if(year === today.getFullYear() && month === today.getMonth()) {
        dates[today.getDate() - 1].isToday = true;
    }
    return dates;
  }

  const getCalendarTail = () => {
    let dates = [];
    let lastDay = new Date(year, month + 1, 0).getDay();

    for(let i = 1; i < 7 - lastDay; i++) {
        dates.push({
            date: i,
            isToday: false,
            isDisabled: true
        });
    }
    return dates;
  }

  const getPreviousMonth = () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }
    showCalendar();
  }

  const getNextMonth = () => {
    month++;
    if (month > 11) {
      year++;
      month = 0
    }
    showCalendar();
  }

  const setEvent = (e) => {
    console.log(e)
    setPopUp(true);
    setNewEventDate(e);
    getSchedule();
  }

  const closeEvent = () => {
    setPopUp(false);
  }

  const getSchedule = () => {
    axios.get('/schedule')
    .then(data => {
      const d = data.data.map(x => {
        return new Date(x.start_time).getHours();
      })
      console.log('xxx: ', d)
      setSchedules(d);
    })
    .catch(err => {
      console.log('no class scheduled');
    })
  }

  return (
    <div className="schedule_container">
      <button onClick={getPreviousMonth}>prev</button>
      <button onClick={getNextMonth}>next</button>
      <div>{year}, {month + 1}</div>
      <table className="schedule_calendar">
        <thead>
          <tr>
            {days.map(day => (
              <th className="schedule_day" key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map(week => {
            return (
              <tr className="schedule_week">{week.map(day => (
                <td
                  value={day.date}
                  className={`schedule_date${day.date === newEventDate ? '_new' : ''}`}
                  onClick={() => setEvent(day.date)}>{day.date}
                  {schedules.indexOf(day.date) > 0 && <span>hello</span>}
                </td>
              ))}</tr>
            )
          })}
        </tbody>
      </table>
      <div className={duringPopUp}>
        {popUp &&
          <PopUpEvent closeEvent={closeEvent} />
        }
      </div>
    </div>
  )
}

export default Schedule;