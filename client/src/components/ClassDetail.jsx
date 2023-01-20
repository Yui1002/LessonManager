import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import './ClassDetail.css';
import { BsFillPeopleFill } from 'react-icons/bs';
import {AiFillCalendar} from 'react-icons/ai';
import {FaStickyNote} from 'react-icons/fa';
import {DAYS, MONTHS} from '../CONSTANT.js';

const ClassDetail = (props) => {
  const navigate = useNavigate();

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  return (
    <div className="class_detail_container">
      <span className="class_detail_close" onClick={props.closeClassDetail}>&times;</span>
      <h2>
        <span className="class_student_icon"><BsFillPeopleFill /></span>
        {props.name}
      </h2>
      <div><span className="class_calendar_icon"><AiFillCalendar /></span>
        {/* {day}, {month} {props.date} ・ {startTime} - {endTime} */}
      </div>
      <p><span className="class_description_icon"><FaStickyNote /></span>
        {props.description}
      </p>
    </div>
  )
}

export default ClassDetail;