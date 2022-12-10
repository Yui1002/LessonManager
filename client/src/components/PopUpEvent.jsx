import React from 'react';
import './PopUpEvent.css';

const PopUpEvent = () => {

  return (
    <div className="popUp_event_container">
      <form>
        <section>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required autoFocus
          />
          </section>
      </form>
    </div>
  )
}

export default PopUpEvent;