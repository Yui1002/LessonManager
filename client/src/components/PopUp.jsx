import React, { useState } from "react";
import axios from "axios";
import "./PopUp.css";
import COUNTRY_LIST from "./COUNTRY.js";

const PopUp = (props) => {
  const [src, setSrc] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [editedFirstName, setEditedFirstName] = useState(
    props.student.firstName
  );
  const [editedLastName, setEditedLastName] = useState(props.student.lastName);
  const [editedCountry, setEditedCountry] = useState(props.student.country);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(
    props.student.phone
  );
  const [editedEmail, setEditedEmail] = useState(props.student.email);
  const [editedLessonHours, setEditedLessonHours] = useState(
    props.student.lessonHours
  );

  const saveChanges = async (e) => {
    e.preventDefault();
    props.setPopUp(false);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("firstName", editedFirstName);
    formData.append("lastName", editedLastName);
    formData.append("country", editedCountry);
    formData.append("phoneNumber", editedPhoneNumber);
    formData.append("email", props.student.email);
    formData.append("newEmail", editedEmail);
    formData.append("lessonHours", editedLessonHours);

    const res = await axios.put("/student", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(res);

    if (res.status === 204) {
      props.getStudents();
    } else {
      console.log("update failed");
    }
  };

  const changeHandler = (e) => {
    let file = e.target.files[0];
    setSelectedFile(file);
    let reader = new FileReader();
    reader.onload = function () {
      setSrc(reader.result);
    };
    reader.readAsDataURL(file);
    setIsFilePicked(true);
  };

  const onFirstNameChange = (e) => {
    setEditedFirstName(e.target.value);
  };

  const onLastNameChange = (e) => {
    setEditedLastName(e.target.value);
  };

  const onCountryChange = (e) => {
    setEditedCountry(e.target.value);
  };

  const onPhoneNumberChange = (e) => {
    setEditedPhoneNumber(e.target.value);
  };

  const onEmailChange = (e) => {
    setEditedEmail(e.target.value);
  };

  const onLessonHoursChange = (e) => {
    setEditedLessonHours(e.target.value);
  };

  return (
    <div className="popup_container">
      <h2 className="popup_title">Edit Profile</h2>
      <span className="popup_close" onClick={props.closePopUp}>
        &times;
      </span>
      <form onSubmit={saveChanges}>
        <section className="popup_section_photo">
          <label htmlFor="file-upload" className="popup_file_upload">
            {isFilePicked ? (
              <img className="popup_img_photo" src={src} />
            ) : (
              <img
                className="popup_img_photo"
                src={`data:image/png;base64, ${props.student.profile_photo}`}
              />
            )}
          </label>
          <input
            id="file-upload"
            type="file"
            name="file"
            onChange={changeHandler}
            required
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
            defaultValue={props.student.firstName}
            autoComplete="first_name"
            required
            onChange={onFirstNameChange}
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
            defaultValue={props.student.lastName}
            autoComplete="last_name"
            required
            onChange={onLastNameChange}
          />
        </section>
        <section className="section_country">
          <label htmlFor="country">Country</label>
          <br />
          <select
            className="select_country"
            onChange={onCountryChange}
            value={props.student.country}
          >
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
            type="text"
            defaultValue={props.student.phone}
            autoComplete="phone_number"
            required
            onChange={onPhoneNumberChange}
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
            defaultValue={props.student.email}
            autoComplete="email"
            required
            onChange={onEmailChange}
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
            defaultValue={props.student.lessonHours}
            autoComplete="lesson_hour"
            required
            onChange={onLessonHoursChange}
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
