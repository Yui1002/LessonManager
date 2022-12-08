import React, {useState} from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai'
import PopUp from './PopUp.jsx';
import './Student.css';

const Student = (props) => {
  // console.log(props)
  const [popUp, setPopUp] = useState(false);
  const duringPopUp = popUp ? "during-popup" : "";

  const goToSettings = () => {
    setPopUp(true);
  }

  return (
    <div>
      <FaUserAlt />
      <AiFillSetting onClick={goToSettings}/>
      <div>{props.student.name}</div>
      <div>{props.student.lesson_hours} hours</div>
      <button value={props.student.name} onClick={props.deleteStudent}>Delete student</button>
      <div className={duringPopUp}>
        {popUp &&
          <PopUp
            name={props.student.name}
            lessonHours={props.student.lesson_hours}
            getStudents={props.getStudents}
          />}
      </div>
    </div>
  )
}

export default Student;