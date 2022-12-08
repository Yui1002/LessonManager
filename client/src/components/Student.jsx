import React from 'react';
import { FaUserAlt } from 'react-icons/fa';

const Student = (props) => {
  console.log(props)
  return (
    <div>
      <FaUserAlt />
      <div>{props.student.name}</div>
      <div>{props.student.lesson_hours}</div>
    </div>
  )
}

export default Student;