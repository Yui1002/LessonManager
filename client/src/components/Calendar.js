const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();

const calendar = {
  days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  year: today.getFullYear(),
  month: today.getMonth(),
  getCalendarHead: () => {
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
  },

  getCalendarBody: () => {
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
  },

  getCalendarTail: () => {
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
  },

  getPreviousMonth: () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }
    showCalendar();
  },

  getNextMonth: () => {
    month++;
    if (month > 11) {
      year++;
      month = 0
    }
    showCalendar();
  },

  showCalendar: () => {
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

    return weeks;
  },
}

export default calendar;