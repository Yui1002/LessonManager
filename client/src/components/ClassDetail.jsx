import React from 'react';
import {useNavigate} from "react-router-dom"
import './ClassDetail.css';

const ClassDetail = (props) => {
  console.log('props: ', props)
  const navigate = useNavigate();

  return (
    <div className="class_detail_container">
      <span className="class_detail_close" onClick={props.closeClassDetail}>&times;</span>
      <h3>{`${props.currentDetailClass.name}  ${props.currentDetailClass.startTime}`}</h3>
      <p>description description description</p>
    </div>
  )
}

export default ClassDetail;