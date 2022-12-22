import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Schedule.css';
import PopUpEvent from './PopUpEvent.jsx';
import moment from 'moment';
import ClassDetail from './ClassDetail.jsx';
import {NUMBER_MONTHS} from '../CONSTANT.js';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();
const TODAY = today.getDate();
let year = today.getFullYear();
let month = today.getMonth();

const Schedule = () => {
  const [calendar, setCalendar] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [testData, setTestData] = useState([]);
  // const [popUp, setPopUp] = useState(false);
  const [scheduleClassShown, setScheduleClassShown] = useState(false);
  const [noClassScheduled, setNoClassScheduled] = useState(false);
  const [classDetailShown, setClassDetailShown] = useState(false);
  const [currentDetailClass, setCurrentDetailClass] = useState({});
  const duringPopUp = scheduleClassShown ? "during-popup" : "";
  const duringPopUp2 = classDetailShown ? "during-popup_2" : "";

  const navigate = useNavigate();

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
    setScheduleClassShown(true);
  }

  const closeEvent = () => {
    setScheduleClassShown(false);
  }

  const closeClassDetail = (e) => {
    e.stopPropagation();
    setClassDetailShown(false);
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
      subObj['description'] = x.description;
      array.push(subObj);
    });

    setTestData(array);
  }

  const showClassDetail = (e, name, day, startDate, startTime, endTime, description) => {
    e.stopPropagation(); // prevent parent function's execution
    const format = {
      name: name,
      day: day,
      startDate: startDate,
      startTime: startTime,
      endTime: endTime,
      description: description
    };
    setCurrentDetailClass(format);
    setClassDetailShown(true);
  }

  // 27: [
  //   {name: 'john', startTime: '14:00', endTime: '15:00', year: 2022},
  //   {name: 'nick', startTime: '16:00', endTime: '17:00', year: 2022},
  // ]
  return (
    <div className="schedule_container">
      <button className="schedule_go_back_button" onClick={() => navigate('/home')}>Go Back</button><br />
      {/* <div className="schedule_title"> */}
        <button className="schedule_prev_button" onClick={getPreviousMonth}>&lt;</button>
        <div className="schedule_title_date">{NUMBER_MONTHS[month + 1]}  {year}</div>
        <button className="schedule_next_button" onClick={getNextMonth}>&gt;</button>
      {/* </div> */}
      {noClassScheduled && <p className="schedule_no_class">No class scheduled in this month</p>}
      <table className="schedule_calendar">
        <thead>
          <tr>
            {days.map(day => (
              <th className="schedule_day" key={day}>{day}</th> /** Map Mon - Sun */
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map(week => {
            return (
              <tr className="schedule_week">{week.map(day => (
                <td className="schedule_date"
                  onClick={() => setEvent(day.date)}>
                    <span className="schedule_date_text">{day.date}</span>
                  {testData.map((t, idx) => {
                    const startDate = t['start_time'].split(',')[0];
                    if (startDate.split('/')[1] === day.date.toString()) {
                      const name = t['name'];
                      const startTime = t['start_time'].split(',')[1];
                      const endTime = t['end_time'].split(',')[1];
                      const description = t['description'];

                      return (
                        <div className="schedule_class" onClick={(e) => showClassDetail(e, name, day, startDate, startTime, endTime, description)}>
                          {`${startTime.slice(0, -6)} - ${name}`}
                          {classDetailShown && currentDetailClass.day === day &&
                            <div className={duringPopUp2}>
                              <ClassDetail currentDetailClass={currentDetailClass} closeClassDetail={closeClassDetail}/>
                            </div>
                          }
                        </div>
                      )
                    }
                  })}
                </td>
              ))}</tr>
            )
          })}
        </tbody>
      </table>
      <div className={duringPopUp}>
        {scheduleClassShown &&
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


