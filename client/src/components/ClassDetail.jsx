import React from 'react';
import {useNavigate} from "react-router-dom"
import './ClassDetail.css';

const ClassDetail = (props) => {
  const navigate = useNavigate();

  return (
    <div className="class_detail_container">
      <span className="class_detail_close" onClick={props.closePopUp}>&times;</span>
      <h3>John - 17:00~18:00</h3>
      <p>description description description</p>
    </div>
  )
}

export default ClassDetail;