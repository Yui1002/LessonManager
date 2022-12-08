import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai'

const Student = (props) => {
  // console.log(props)
  return (
    <div>
      <FaUserAlt />
      <AiFillSetting />
      <div>{props.student.name}</div>
      <div>{props.student.lesson_hours}</div>
      <button value={props.student.name} onClick={props.deleteStudent}>Delete student</button>
    </div>
  )
}

export default Student;