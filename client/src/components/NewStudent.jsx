import React from "react";
import './NewStudent.css';

const NewStudent = (props) => {

  return (
    <div className="new_student_container">
      <h2>Create a New Student</h2>
      <span className="new_student_close" onClick={props.closeForm}>&times;</span>
      <form className="profile_add_student_form">
        <section>
          <label htmlFor="name">Student's name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            autoFocus
          />
        </section>
        <section>
          <label htmlFor="lesson-hour">Total lesson hours</label>
          <input
            id="lesson-hour"
            name="lesson-hour"
            type="number"
            min="0"
            autoComplete="lesson-hour"
            required
          />
        </section>
        <section>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </section>
        <button type="submit" value="add-student">
          Add
        </button>
      </form>
    </div>
  );
};

export default NewStudent;
