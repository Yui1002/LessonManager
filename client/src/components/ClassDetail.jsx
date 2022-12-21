import React from 'react';
import {useNavigate} from "react-router-dom"
import './ClassDetail.css';

const ClassDetail = (props) => {
  console.log('props: ', props)
  const navigate = useNavigate();

  return (
    <div className="class_detail_container">
      <span className="class_detail_close" onClick={props.closeClassDetail}>&times;</span>
      <h2>{props.currentDetailClass.name}</h2>
      <div>{`${props.currentDetailClass.startTime} - ${props.currentDetailClass.endTime}`}</div>
      <p>{props.currentDetailClass.description}</p>
    </div>
  )
}

export default ClassDetail;