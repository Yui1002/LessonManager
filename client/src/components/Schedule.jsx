import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Schedule.css';
import PopUpEvent from './PopUpEvent.jsx';
import moment from 'moment';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();
let year = today.getFullYear();
let month = today.getMonth();

const Schedule = () => {
  const [calendar, setCalendar] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [testData, setTestData] = useState([]);
  const [newEventDate, setNewEventDate] = useState('');
  const [popUp, setPopUp] = useState(false);
  const [noClassScheduled, setNoClassScheduled] = useState(false);
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
    setPopUp(true);
    setNewEventDate(e);
    getSchedule();
  }

  const closeEvent = () => {
    setPopUp(false);
  }

  const getTimezone = (date) => {
    const UTCdate = new Date(date);
    // get difference between UTC and where user is
    const offset = UTCdate.getTimezoneOffset();
    const difference = offset / 60;

    return difference;
  }

  const getSchedule = async () => {
    const response = await axios.get('/schedule');
    const data = response.data; // UTC

    let array = [];
    data.forEach(x => {
      let subObj = {};
      subObj['name'] = x.name;
      subObj['start_time'] = new Date(x.start_time).toLocaleString();
      subObj['end_time'] = new Date(x.end_time).toLocaleString();
      array.push(subObj);
    });

    console.log('array: ', array)
    setTestData(array);
  }

  return (
    <div className="schedule_container">
      <button onClick={getPreviousMonth}>prev</button>
      <button onClick={getNextMonth}>next</button>
      <div>{year}, {month + 1}</div>
      {noClassScheduled && <p className="schedule_no_class">No class scheduled in this month</p>}
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

                  className={`schedule_date${day.date === newEventDate ? '_new' : ''}`}
                  onClick={() => setEvent(day.date)}>{day.date}
                  {testData.map(t => {
                    const name = t.name;
                    const startDate = t['start_time'].split(',')[0];
                    const startTime = t['start_time'].split(',')[1];

                    if (startDate.split('/')[1] === day.date.toString()) {
                      return (<div>{`${name} - ${startTime}`}</div>)
                    }
                  })}
                </td>
              ))}</tr>
            )
          })}
        </tbody>
      </table>
      <div className={duringPopUp}>
        {popUp &&
          <PopUpEvent
            closeEvent={closeEvent}
            getSchedule={getSchedule}
          />
        }
      </div>
    </div>
  )
}

export default Schedule;



/**
 *
 *     // need to know where the user is located
    axios.get('/schedule')
    .then(data => {
      console.log('data: ', data.data)
      data.data.map(x => {
        let startDateTime = new Date(x.start_time);
        if (!schedules_1[startDateTime.getDate()]) {
          schedules_1[startDateTime.getDate()] = [];
          schedules_1[startDateTime.getDate()].push(startDateTime.getHours());
        } else {
          schedules_1[startDateTime.getDate()].push(startDateTime.getHours());
        }
      //   const s = moment().format(x.start_time);
      //   return s;
      })
      // console.log('localArray: ', d)
      // setSchedules(d);
      // setNoClassScheduled(false);
    })
    .catch(err => {
      setNoClassScheduled(true);
    })
 */

