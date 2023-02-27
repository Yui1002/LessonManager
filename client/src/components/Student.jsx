import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import PopUp from "./PopUp.jsx";
import "./Student.css";
import { Card, CardHeader, CardActions, CardContent, Avatar, Typography, IconButton } from "@mui/material";
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';

const Student = (props) => {
  const [popUp, setPopUp] = useState(false);
  const duringPopUp = popUp ? "during-popup" : "";

  const openPopUp = (e) => {
    setPopUp(true);
  };

  const closePopUp = () => {
    setPopUp(false);
  };

  return (
    <Card>
      <CardHeader avatar={props.student.profile_photo === null ? <Avatar>H</Avatar> : <Avatar src={`data:image/png;base64, ${props.student.profile_photo}`}/>} />
      <CardContent>
        <Typography variant="body1" component="div">
          {props.student.firstName} {props.student.lastName}
        </Typography>
        <Typography variant="body2" component="div">
          {props.student.lessonHours} hours
        </Typography>
        <Typography variant="body2" component="div">
          {props.student.country}
        </Typography>
        <Typography variant="body2" component="div">
          {props.student.email}
        </Typography>
        <Typography variant="body2" component="div">
          {props.student.phone_number}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <DeleteSharpIcon />
          <EditSharpIcon />
        </IconButton>
      </CardActions>
    </Card>
    // <div className="student_container">
    //   <div className="student_head_icon">
    //     {props.student.profile_photo === null ? <FaUserAlt className="student_photo_icon" /> : <img className="student_photo_icon" src={`data:image/png;base64, ${props.student.profile_photo}`} />}
        
    //     <FaTrash className="student_trash_icon" onClick={() => props.deleteStudent(props.student.email)} />
    //     <AiFillSetting className="student_setting_icon" onClick={openPopUp} />
    //   </div>
    //   <div className="student_body">
    //     <div className="student_name">
    //       {props.student.firstName} {props.student.lastName}
    //     </div>
    //     <div className="student_lesson_hours">
    //       {props.student.lessonHours} hours
    //     </div>
    //     <div className="student_country">{props.student.country}</div>
    //     <div className="student_email">{props.student.email}</div>
    //     <div>{props.student.phone_number}</div>
    //   </div>
    //   <div className={duringPopUp}>
    //     {popUp && (
    //       <PopUp
    //         student={props.student}
    //         lessonHours={props.student.lesson_hours}
    //         getStudents={props.getStudents}
    //         setPopUp={setPopUp}
    //         closePopUp={closePopUp}
    //         profile_photo={props.student.profile_photo}
    //       />
    //     )}
    //   </div>
    // </div>
  );
};

export default Student;
