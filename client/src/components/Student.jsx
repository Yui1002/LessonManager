import React, { useState } from "react";
import EditProfile from "./EditProfile.jsx";
import "./Student.css";
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  Modal,
} from "@mui/material";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";

const Student = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Card>
        <CardHeader
          avatar={
            props.student.profile_photo === null ? (
              <Avatar>H</Avatar>
            ) : (
              <Avatar
                src={`data:image/png;base64, ${props.student.profile_photo}`}
              />
            )
          }
        />
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
            <DeleteSharpIcon
              onClick={() => props.deleteStudent(props.student.email)}
            />
          </IconButton>
          <IconButton>
            <EditSharpIcon onClick={handleOpen} />
          </IconButton>
        </CardActions>
      </Card>

      <Modal open={open} onClose={handleClose}>
          <EditProfile student={props.student} setOpen={setOpen} getStudents={props.getStudents} />
      </Modal>
      {/* <div className={duringPopUp}>
        {popUp && (
          <PopUp
            student={props.student}
            lessonHours={props.student.lesson_hours}
            getStudents={props.getStudents}
            setPopUp={setPopUp}
            closePopUp={closePopUp}
            profile_photo={props.student.profile_photo}
          />
        )}
      </div> */}
    </div>
  );
};

export default Student;
