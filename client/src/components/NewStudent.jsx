import React from "react";
import axios from 'axios';
import "./NewStudent.css";
import COUNTRY_LIST from "./COUNTRY.js";

const NewStudent = (props) => {
  const submitNewStudent = async (e) => {
    e.preventDefault();
    props.setShowForm(false);

    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    const country = e.target[2].value;
    const phoneNumber = e.target[3].value;
    const email = e.target[4].value;
    const lessonHours = e.target[5].value;

    const res = await axios.post("/students", {
      firstName: firstName,
      lastName: lastName,
      country: country,
      phoneNumber: phoneNumber,
      email: email,
      lessonHours: lessonHours,
    });
    props.getStudents();
  };

  return (
    <div className="new_student_container">
      <h2 className="new_student_title">Create a New Student</h2>
      <span className="new_student_close" onClick={props.closeForm}>
        &times;
      </span>
      <form className="profile_add_student_form" onSubmit={submitNewStudent}>
        <section className="section_first_name">
          <label htmlFor="first_name">First Name</label>
          <br />
          <input
            id="first_name"
            className="input_first_name"
            name="first_name"
            type="text"
            autoComplete="first_name"
            placeholder="e.g. John"
            required
            autoFocus
          />
        </section>
        <section className="section_last_name">
          <label htmlFor="last_name">Last Name</label>
          <br />
          <input
            id="last_name"
            className="input_last_name"
            name="last_name"
            type="text"
            autoComplete="last_name"
            placeholder="e.g. Smith"
            required
            autoFocus
          />
        </section>
        <section className="section_country">
          <label htmlFor="country">Country</label>
          <br />
          <select className="select_country">
            {COUNTRY_LIST.map((c) => (
              <option value={c}>{c}</option>
            ))}
          </select>
        </section>
        <section className="section_phone_number">
          <label htmlFor="phone_number">Phone Number</label>
          <br />
          <input
            id="phone_number"
            className="input_phone_number"
            name="phone_number"
            type="tel"
            autoComplete="phone_number"
            required
          />
        </section>
        <section className="section_email">
          <label htmlFor="email">Email Address</label>
          <br />
          <input
            className="input_email"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="e.g. john@email.com"
            required
          />
        </section>
        <section>
          <label htmlFor="lesson-hour">Initial lesson hours</label>
          <br />
          <input
            id="lesson-hour"
            className="input_lesson_hour"
            name="lesson-hour"
            type="number"
            min="0"
            max="50"
            placeholder="0"
            autoComplete="lesson-hour"
            required
          />{" "}
          h
        </section>
        <button type="submit" value="add-student" className="new_student_btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default NewStudent;
