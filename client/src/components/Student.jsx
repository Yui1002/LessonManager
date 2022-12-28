import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import PopUp from "./PopUp.jsx";
import "./Student.css";

const Student = (props) => {
  const [popUp, setPopUp] = useState(false);
  const duringPopUp = popUp ? "during-popup" : "";

  const openPopUp = (e) => {
    setPopUp(true);
  };

  const closePopUp = () => {
    setPopUp(false);
  };

  return (
    <div className="student_container">
      <div className="student_head_icon">
        <FaUserAlt className="student_photo_icon" />
        <FaTrash className="student_trash_icon" onClick={() => props.deleteStudent(props.student.email)} />
        <AiFillSetting className="student_setting_icon" onClick={openPopUp} />
      </div>
      <div className="student_body">
        <div className="student_name">
          {props.student.first_name} {props.student.last_name}
        </div>
        <div className="student_lesson_hours">
          {props.student.lesson_hours} hours
        </div>
        <div>{props.student.country}</div>
        <div className="student_email">{props.student.email}</div>
        <div>{props.student.phone_number}</div>

      </div>
      <div className={duringPopUp}>
        {popUp && (
          <PopUp
            name={props.student.name}
            lessonHours={props.student.lesson_hours}
            getStudents={props.getStudents}
            setPopUp={setPopUp}
            closePopUp={closePopUp}
          />
        )}
      </div>
    </div>
  );
};

export default Student;
