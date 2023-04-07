import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Schedule.css";
import PopUpEvent from "./PopUpEvent.jsx";
import ClassDetail from "./ClassDetail.jsx";
import ScheduleClassModal from "./ScheduleClassModal";
import { config } from "./../../../config";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import {
  Alert,
  Button,
  IconButton,
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Input,
  NativeSelect,
} from "@mui/material";

const Schedule = (props) => {
  const [value, setValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    getStudents();
    console.log(modalOpen);
  }, []);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowSuccess(false);
      setShowError(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [showError, showSuccess]);

  // const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: 400,
  //   bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
  // };

  const style2 = {
    position: "absolute",
    top: "4%",
    right: "4%",
  };

  const getStudents = async () => {
    axios
      .get(`${config.BASE_PATH}getAllStudents`)
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  };

  const onValueChange = function (e) {
    let currentSelectedYear = value.length > 0 ? value.split("-")[0] : ""; 
    let currentSelectedMonth = value.length > 0 ? value.split("-")[1] + 1 : ""; 
    let currentSelectedDay = value.length > 0 ? value.split("-")[2] : ""; 

    let year = e["$y"];
    let month = e["$M"] + 1;
    month = month < 10 ? `0${month}` : `${month}`;
    let day = e["$D"];
    day = day < 10 ? `0${day}` : `${day}`;
    setValue(`${year}-${month}-${day}`);

    if (
      currentSelectedYear == "" &&
      currentSelectedMonth == "" &&
      currentSelectedDay == ""
    )
      handleOpen(e);

    if (
      currentSelectedYear == year &&
      (currentSelectedMonth != month || currentSelectedDay != day)
    )
      handleOpen(e);
  };

  const onStartTimeChange = function (e) {
    let startDateTime = moment(e.target.value).format("YYYY-MM-DD hh:mm:ss");
    setStart(startDateTime);
  };

  const onEndTimeChange = function (e) {
    let endDateTime = moment(e.target.value).format("YYYY-MM-DD hh:mm:ss");
    setEnd(endDateTime);
  };

  const onStudentChange = function (e) {
    const value = e.target.value;
    setId(value.substring(0, value.indexOf("-")));
    setName(value.substring(value.indexOf("-") + 1));
  };

  const onNoteChange = function (e) {
    setNote(e.target.value);
  };

  const handleOpen = function (e) {
    setModalOpen(true);
  };

  const handleClose = function () {
    setModalOpen(false);
  };

  const handleSubmit = function () {
    axios
      .post(`${config.BASE_PATH}createClass`, {
        student_id: parseInt(id),
        name: name,
        start_date: start > 0 ? start : `${value} 10:00:00`,
        end_date: end > 0 ? end : `${value} 11:00:00`,
        description: note,
      })
      .then((res) => {
        setShowSuccess(true);
      })
      .catch((err) => {
        setShowError(true);
      });

    setModalOpen(false);
  };

  return (
    <div className="schedule_container">
      {showSuccess && (
        <Alert severity="success">Class has been scheduled successfully!</Alert>
      )}
      {showError && (
        <Alert severity="error">
          This class is overlapped with other class
        </Alert>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar onChange={onValueChange} showDaysOutsideCurrentMonth />
        {modalOpen && (
          // <Modal
          //   open={modalOpen}
          //   // onClose={handleClose}
          //   aria-labelledby="modal-modal-title"
          //   aria-describedby="modal-modal-description"
          // >
          //   <Box sx={style}>
          //     <Typography id="modal-modal-title" variant="h6" component="h2">
          //       Schedule a class
          //     </Typography>
          //     <IconButton
          //       sx={style2}
          //       aria-label="close"
          //       color="inherit"
          //       size="small"
          //       onClick={handleClose}
          //     >
          //       <CloseIcon fontSize="inherit" />
          //     </IconButton>
          //     <FormControl>
          //       <TextField
          //         required
          //         sx={{ mb: 3, mt: 3 }}
          //         id="datetime-local"
          //         label="Start"
          //         type="datetime-local"
          //         variant="standard"
          //         onChange={onStartTimeChange}
          //         defaultValue={`${value}T10:00`}
          //         InputLabelProps={{
          //           shrink: true,
          //         }}
          //       />
          //       <TextField
          //         required
          //         sx={{ mb: 3 }}
          //         id="datetime-local"
          //         label="End"
          //         type="datetime-local"
          //         variant="standard"
          //         onChange={onEndTimeChange}
          //         defaultValue={`${value}T11:00`}
          //         InputLabelProps={{
          //           shrink: true,
          //         }}
          //       />
          //       <FormControl fullWidth sx={{ mb: 3 }}>
          //         <InputLabel variant="standard" htmlFor="uncontrolled-native">
          //           Student Name
          //         </InputLabel>
          //         <NativeSelect
          //           required
          //           defaultValue="Select"
          //           onChange={onStudentChange}
          //           inputProps={{
          //             name: "student_name",
          //             id: "uncontrolled-native",
          //           }}
          //         >
          //           <option>Select</option>
          //           {students.map((student) => {
          //             return (
          //               <option
          //                 value={`${student["id"]}-${student["first_name"]} ${student["last_name"]}`}
          //               >{`${student["first_name"]} ${student["last_name"]}`}</option>
          //             );
          //           })}
          //         </NativeSelect>
          //       </FormControl>
          //       <TextField
          //         sx={{ mb: 3, width: 300 }}
          //         id="standard-basic"
          //         label="Note"
          //         variant="standard"
          //         onChange={onNoteChange}
          //         InputLabelProps={{
          //           shrink: true,
          //         }}
          //       />
          //       <Button variant="contained" onClick={handleSubmit}>
          //         Create
          //       </Button>
          //     </FormControl>
          //   </Box>
          // </Modal>
          <ScheduleClassModal modalOpen={modalOpen} handleClose={handleClose} />
        )}
      </LocalizationProvider>
    </div>
  );
};

export default Schedule;
