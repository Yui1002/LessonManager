import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClassDetail.css';
import { BsFillPeopleFill } from 'react-icons/bs';
import {AiFillCalendar} from 'react-icons/ai';
import {FaStickyNote} from 'react-icons/fa';
import {BiTimeFive} from "react-icons/bi";
import moment from 'moment'

const ClassDetail = (props) => {

  const deleteClass = () => {
    props.deleteClass(props.startDate, props.endDate);
  }

  const editClass = (e) => {
    e.preventDefault();
    // button changes to save changes
    // turn to save mode
    // enable input mode 
    // when save change button clicked, send changes to db 
  }

  return (
    <div className="class_detail_container">
      <span className="class_detail_close" onClick={props.closeClassDetail}>&times;</span>
      <h2>
        <span className="class_student_icon"><BsFillPeopleFill /></span>
        {props.name}
      </h2>
      <div><span className="class_calendar_icon"><AiFillCalendar /></span>
        {moment(props.startDate).format('MMMM Do,  YYYY')}
      </div>
      <div>
        <span className="class_time_icon"><BiTimeFive /></span>
        {`${moment(props.startDate).format('LT')} - ${moment(props.endDate).format('LT')}`}
      </div>
      <p><span className="class_description_icon"><FaStickyNote /></span>
        {props.description}
      </p>
      <button onClick={(e) => editClass(e)}>Edit this schedule</button>
      <button onClick={deleteClass}>Delete this schedule</button>
    </div>
  )
}

export default ClassDetail;