import React, { useState } from "react";
import axios from "axios";
import "./PopUp.css";
import COUNTRY_LIST from "./COUNTRY.js";

const PopUp = (props) => {
  const saveChanges = async (e) => {
    e.preventDefault();
    props.setPopUp(false);
    let updatedName = e.target[0].value;
    let updatedLessonHours = e.target[1].value;
    let updatedEmail = e.target[2].value;

    const res = await axios.put("/student", {
      name: props.name,
      updatedName: updatedName,
      updatedLessonHours: updatedLessonHours,
      updatedEmail: updatedEmail,
    });

    if (res.status === 200) {
      props.getStudents();
    } else {
      console.log("update failed");
    }
  };

  return (
    <div className="popup_container">
      <h2 className="popup_title">Edit Profile</h2>
      <span className="popup_close" onClick={props.closePopUp}>
        &times;
      </span>
      <form onSubmit={saveChanges}>
        <section className="popup_section_photo">
          <label htmlFor="file-upload" className="popup_file_upload"></label>
          <img
            className="popup_img_photo"
            src={`data:image/png;base64, ${props.student.profile_photo}`}
          />
        </section>
        <section className="section_first_name">
          <label htmlFor="first_name">First Name</label>
          <br />
          <input
            id="first_name"
            className="input_first_name"
            name="first_name"
            type="text"
            value={props.student.firstName}
            autoComplete="first_name"
            required
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
            value={props.student.lastName}
            autoComplete="last_name"
            required
          />
        </section>
        <section className="section_country">
          <label htmlFor="country">Country</label>
          <br />
          <select className="select_country">
            {COUNTRY_LIST.map((c) => (
              <option
                value={c}
                selected={props.student.country === c ? "selected" : "0"}
              >
                {c}
              </option>
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
            type="text"
            value={props.student.phone}
            autoComplete="phone_number"
            required
          />
        </section>
        <section className="section_email">
          <label htmlFor="email">Email Address</label>
          <br />
          <input
            id="email"
            className="input_email"
            name="email"
            type="email"
            value={props.student.email}
            autoComplete="email"
            required
          />
        </section>
        <section className="section_lesson_hours">
          <label htmlFor="lesson_hour">Lesson hours</label>
          <br />
          <input
            id="lesson_hour"
            className="input_lesson_hour"
            name="lesson_hour"
            type="number"
            value={props.student.lessonHours}
            autoComplete="lesson_hour"
            required
          />
        </section>
        <div className="button_container">
          <button type="submit" value="Save" className="submit_button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PopUp;
