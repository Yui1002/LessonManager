import React from 'react';
import './PopUp.css';

const PopUp = () => {
  return (
    <div className="popup_container">
      <h3>Account Setting</h3>
      <form>
        <section>
          <label htmlFor="name">name</label>
          <input id="name" name="name" type="text" value="john" autoComplete="name" required autoFocus />
        </section>
        <section>
          <label htmlFor="lesson_hour">Lesson hours</label>
          <input id="lesson_hour" name="lesson_hour" type="number" value="2" autoComplete="lesson_hour" required autoFocus />
        </section>
        <button type="submit" value="Save">Save</button>
      </form>
    </div>
  )
}

export default PopUp;