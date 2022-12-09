import React, {useState} from 'react';
import axios from 'axios';
import './PopUp.css';

const PopUp = (props) => {

  const saveChanges = async (e) => {
    e.preventDefault();
    props.setPopUp(false);
    let updatedName = e.target[0].value;
    let updatedLessonHours = e.target[1].value;
    let updatedEmail = e.target[2].value;

    const res = await axios.put('/student', {
      name: props.name,
      updatedName: updatedName,
      updatedLessonHours: updatedLessonHours,
      updatedEmail: updatedEmail
    });

    if (res.status === 200) {
      props.getStudents();
    } else {
      console.log('update failed');
    }
  }

  return (
    <div className="popup_container">
      <h3>Account Setting</h3>
      <span className="popup_close" onClick={props.closePopUp}>&times;</span>
      <form onSubmit={saveChanges}>
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
        <section>
          <label htmlFor="lesson_hour">Lesson hours</label>
          <input
            id="lesson_hour"
            name="lesson_hour"
            type="number"
            autoComplete="lesson_hour"
            required autoFocus
          />
        </section>
        <section>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required autoFocus
          />
        </section>
        <button type="submit" value="Save">Save</button>
      </form>
    </div>
  )
}

export default PopUp;