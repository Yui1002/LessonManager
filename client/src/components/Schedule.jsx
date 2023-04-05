import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Schedule.css";
import PopUpEvent from "./PopUpEvent.jsx";
import ClassDetail from "./ClassDetail.jsx";
import { config } from "./../../../config";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  Alert,
  Button,
  CloseIcon,
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
  console.log(props);
  const [value, setValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const getStudents = async () => {
    axios
      .get(`${config.BASE_PATH}getAllStudents`)
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  };

  const onValueChange = function (e) {
    let year = e["$y"];
    let month = e["$M"] + 1;
    month = month < 10 ? `0${month}` : `${month}`;
    let day = e["$D"];
    day = day < 10 ? `0${day}` : `${day}`;
    setValue(`${year}-${month}-${day}`);
  };

  const handleOpen = function () {
    setModalOpen(true);
  };

  const handleClose = function () {
    setModalOpen(false);
  };

  return (
    <div className="schedule_container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar onChange={onValueChange} onClick={handleOpen} />
        {modalOpen && (
          <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Schedule a class
              </Typography>
              <FormControl>
                <TextField
                  sx={{ mb: 3, mt: 3 }}
                  id="datetime-local"
                  label="Start"
                  type="datetime-local"
                  variant="standard"
                  defaultValue={`${value}T10:00`}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  sx={{ mb: 3 }}
                  id="datetime-local"
                  label="End"
                  type="datetime-local"
                  variant="standard"
                  defaultValue={`${value}T11:00`}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Student Name
                  </InputLabel>
                  <NativeSelect
                    defaultValue="Select"
                    inputProps={{
                      name: "student_name",
                      id: "uncontrolled-native",
                    }}
                  >
                    <option>Select</option>
                    {students.map((student) => {
                      return (
                        <option
                          value={`${student["first_name"]} ${student["last_name"]}`}
                        >{`${student["first_name"]} ${student["last_name"]}`}</option>
                      );
                    })}
                  </NativeSelect>
                </FormControl>
                {/* <InputLabel sx={{ mb: 3 }}>Name</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={`${students[0]["first_name"]} ${students[0]["last_name"]}`}
                  label="Name"
                  // onChange={handleChange}
                >
                  {students.map((student) => {
                    console.log(student);
                    return (
                      <MenuItem
                        value={`${student["first_name"]} ${student["last_name"]}`}
                      >{`${student["first_name"]} ${student["last_name"]}`}</MenuItem>
                    );
                  })}
                </Select> */}
                <TextField
                  sx={{ mb: 3, width: 300 }}
                  id="standard-basic"
                  label="Note"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button variant="contained">Create</Button>
              </FormControl>
            </Box>
          </Modal>
        )}
      </LocalizationProvider>
    </div>
  );
};

export default Schedule;
