import React from 'react';
import axios from 'axios';

// Modal window for adding a new student
const AddStudent = () => {
  const submitNewStudent = (e) => {
    e.preventDefault();

    let name = e.target[0].value;
    let lessonHour = e.target[1].value;

    axios.post('/addStudent', {
      name: name,
      lessonHour: lessonHour
    })
    .then((data) => {

    })
    .catch(err => {

    })
  }

  return (
    <form onSubmit={submitNewStudent}>
      <section>
        <label htmlFor="name">Student's name</label>
        <input id="name" name="name" type="text" autoComplete="name" required autoFocus />
      </section>
      <section>
        <label htmlFor="lesson-hour">Total lesson hours</label>
        <input id="lesson-hour" name="lesson-hour" type="number" autoComplete="lesson-hour" required />
      </section>
      <button type="submit" value="add-student">Add</button>
    </form>
  )
}

export default AddStudent;