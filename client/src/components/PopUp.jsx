import React, {useState} from 'react';
import axios from 'axios';
import './PopUp.css';

const PopUp = (props) => {

  console.log('props in popup: ', props);

  const saveChanges = async (e) => {
    e.preventDefault();
    let updatedName = e.target[0].value;
    let updatedLessonHours = e.target[1].value;

    console.log('updatedName: ', updatedName)
    console.log('updatedLessonHours: ', updatedLessonHours)

    const res = await axios.put('/student', {
      name: props.name,
      updatedName: updatedName,
      updatedLessonHours: updatedLessonHours
    })
    console.log('res: ', res)
    if (res.status === 200) {
      props.getStudents();
    } else {
      console.log('update failed');
    }
  }

  return (
    <div className="popup_container">
      <h3>Account Setting</h3>
      <form onSubmit={saveChanges}>
        <section>
          <label htmlFor="name">name</label>
          <input
            id="name"
            name="name"
            type="text"
            // value={props.name}
            // value={props.name}
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
            // value={props.lessonHours}
            autoComplete="lesson_hour"
            required autoFocus
          />
        </section>
        <button type="submit" value="Save">Save</button>
      </form>
    </div>
  )
}

export default PopUp;