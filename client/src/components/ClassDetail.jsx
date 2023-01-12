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

  useEffect(() => {
    changeFormat();
  })

  const changeFormat = () => {
    const formattedDate = new Date(props.currentDetailClass.startDate).toString();
    const formattedDay = DAYS[formattedDate.slice(0, 3)];
    const formatteMonth = MONTHS[formattedDate.slice(4, 7)];
    const formatteStartTime = props.currentDetailClass.startTime.slice(0, -6);
    const formattedEndTime = props.currentDetailClass.endTime.slice(0, -6);

    setDay(formattedDay);
    setMonth(formatteMonth);
    setStartTime(formatteStartTime);
    setEndTime(formattedEndTime);
  }

  return (
    <div className="class_detail_container">
      <span className="class_detail_close" onClick={props.closeClassDetail}>&times;</span>
      <h2>
        <span className="class_student_icon"><BsFillPeopleFill /></span>
        {props.currentDetailClass.name}
      </h2>
      <div><span className="class_calendar_icon"><AiFillCalendar /></span>
        {day}, {month} {props.currentDetailClass.day.date} ・ {startTime} - {endTime}
      </div>
      <p><span className="class_description_icon"><FaStickyNote /></span>
        {props.currentDetailClass.description}
      </p>
    </div>
  )
}

export default ClassDetail;