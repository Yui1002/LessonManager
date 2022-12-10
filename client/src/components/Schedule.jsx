import React, {useState, useEffect} from 'react';
import './Schedule.css';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();
let year = today.getFullYear();
let month = today.getMonth();

const Schedule = () => {

  let [calendar, setCalendar] = useState([]);
  let [displayedMonth, setDisplayedMonth] = useState(month);
  let [displayedYear, setDisplayedYear] = useState(year);

  useEffect(() => {
    showCalendar();
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
                <td className="schedule_date">{day.date}</td>
              ))}</tr>
            )

          })}
        </tbody>
      </table>
    </div>
  )
}

export default Schedule;