import React, {useState} from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai'
import PopUp from './PopUp.jsx';
import './Student.css';

const Student = (props) => {
  // console.log(props)
  const [popUp, setPopUp] = useState(false);
  const duringPopUp = popUp ? "during-popup" : "";

  const openPopUp = () => {
    setPopUp(true);
  }

  const closePopUp = () => {
    setPopUp(false);
  }

  return (
    <div className="student_container">
      <div className="student_head_icon">
        <FaUserAlt className="student_photo_icon"/>
        <AiFillSetting
          className="student_setting_icon"
          onClick={openPopUp}
        />
      </div>
      <div className="student_name">{props.student.name}</div>
      <div className="student_lesson_hours">{props.student.lesson_hours} hours</div>
      <div className="student_email">{props.student.email}</div>
      <button
        className="student_delete_btn"
        value={props.student.name}
        onClick={props.deleteStudent}>Delete student
      </button>
      <div className={duringPopUp}>
        {popUp &&
          <PopUp
            name={props.student.name}
            lessonHours={props.student.lesson_hours}
            getStudents={props.getStudents}
            setPopUp={setPopUp}
            closePopUp={closePopUp}
          />}
      </div>
    </div>
  )
}

export default Student;