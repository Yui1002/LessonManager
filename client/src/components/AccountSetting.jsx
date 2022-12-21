import React, {useState} from 'react';
import axios from 'axios';
import './AccountSetting.css';

const AccountSetting = (props) => {

  const saveChanges = async (e) => {
    e.preventDefault();

    props.setAccountSettingShown(false); // hide modal window
    const updatedName = e.target[0].value;
    const updatedLessonHours = e.target[1].value;
    const updatedEmail = e.target[2].value;

    const res = await axios.put('/student', {
      name: props.name,
      updatedName: updatedName,
      updatedLessonHours: updatedLessonHours,
      updatedEmail: updatedEmail
    });

    res.status === 200 && props.getStudents();
  }

  return (
    <div className="account_setting_container">
      <h3>Account Setting</h3>
      <span className="account_setting_close" onClick={props.closeAccountSetting}>&times;</span>
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

export default AccountSetting;