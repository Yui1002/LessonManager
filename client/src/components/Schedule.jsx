import React, {useState, useEffect} from 'react'

const Schedule = () => {
  // const weeks = [];
  const [calendar, setCalendar] = useState([]);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 8月
  useEffect(() => {
    // getCalendarHead();
    // getCalendarBody();
    // getCalendarTail();
    // showCalendar();
    // let weeks = showCalendar();
    // console.log(weeks)
    showCalendar();

  }, [])

  const showCalendar = () => {
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail()
    ];

    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }

    setCalendar(weeks);
  }

  const getCalendarHead = () => {
    const dates = [];
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for(let i = 0; i < n; i++) {
        dates.unshift({
            date: d - i,
            isToday: false,
            isDisabled: true
        });
    }
    console.log('dates in head: ', dates)
    return dates;
  }

  const getCalendarBody = () => {
    const dates = [];
    const lastDate = new Date(year, month + 1, 0).getDate();

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
    console.log('dates in body: ', dates)
    return dates;
  }

  const getCalendarTail = () => {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for(let i = 1; i < 7 - lastDay; i++) {
        dates.push({
            date: i,
            isToday: false,
            isDisabled: true
        });
    }
    console.log('dates in tail: ', dates)
    return dates;
  }

  return (
    <div className="schedule_container">
      <button>prev</button>
      <button>next</button>
      <table>
        <thead>
          <tr>
            {days.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map(week => {
            console.log('week: ', week)
            return (
              <tr>{week.map(day => (
                <td>{day.date}</td>
              ))}</tr>
            )

          })}
            {/* {calendar.map((week) => {
              return (
                <tr></tr>
              )
              console.log('week: ', week)
              week.map((day) => {
                console.log('day: ', day.date);
                return (
                  <td>{day.date}</td>
                )
              })
            })} */}
        </tbody>
      </table>
    </div>
  )
}

export default Schedule;