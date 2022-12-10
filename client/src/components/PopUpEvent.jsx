import React from 'react';
import './PopUpEvent.css';

const PopUpEvent = (props) => {

  const scheduleClass = (e) => {
    e.preventDefault();

    let date = e.target[0].value;
    let time = e.target[1].value;
    let name = e.target[2].value;
    let description = e.target[3].value;
  }

  return (
    <div className="popup_event_container">
      <h3>Schedule a class</h3>
      <span className="popup_event_close" onClick={props.closeEvent}>&times;</span>
      <form onSubmit={scheduleClass}>
        <section>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            autoComplete="date"
            required autoFocus
          />
        </section>
        <section>
          <label htmlFor="time">Time</label>
          <input
            id="time"
            name="time"
            type="time"
            autoComplete="time"
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
    </div>
  )
}

export default PopUpEvent;