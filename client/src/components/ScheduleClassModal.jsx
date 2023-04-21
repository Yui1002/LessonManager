import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, IconButton, FormControl, TextField, InputLabel, NativeSelect, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import axios from 'axios';
import { config } from "./../../../config";

const ScheduleClassModal = (props) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

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

  const style2 = {
    position: "absolute",
    top: "4%",
    right: "4%",
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

  const handleSubmit = function () {
    axios
      .post(`${config.BASE_PATH}createClass`, {
        student_id: parseInt(id),
        name: name,
        start_date: start > 0 ? start : `${props.value} 10:00:00`,
        end_date: end > 0 ? end : `${props.value} 11:00:00`,
        description: note,
      })
      .then((res) => {
        props.setShowSuccess(true);
      })
      .catch((err) => {
        props.setShowError(true);
      });

    props.setModalOpen(false);
  };

  return (
    <Modal
      open={props.modalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Schedule a class
        </Typography>
        <IconButton
          sx={style2}
          aria-label="close"
          color="inherit"
          size="small"
          onClick={props.handleClose}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
        <FormControl>
          <TextField
            required
            sx={{ mb: 3, mt: 3 }}
            id="datetime-local"
            label="Start"
            type="datetime-local"
            variant="standard"
            onChange={onStartTimeChange}
            defaultValue={`${props.value}T10:00`}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            sx={{ mb: 3 }}
            id="datetime-local"
            label="End"
            type="datetime-local"
            variant="standard"
            onChange={onEndTimeChange}
            defaultValue={`${props.value}T11:00`}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Student Name
            </InputLabel>
            <NativeSelect
              required
              defaultValue="Select"
              onChange={onStudentChange}
              inputProps={{
                name: "student_name",
                id: "uncontrolled-native",
              }}
            >
              <option>Select</option>
              {props.students.length && props.students.map((student) => {
                return (
                  <option
                    value={`${student["id"]}-${student["first_name"]} ${student["last_name"]}`}
                  >{`${student["first_name"]} ${student["last_name"]}`}</option>
                );
              })}
            </NativeSelect>
          </FormControl>
          <TextField
            sx={{ mb: 3, width: 300 }}
            id="standard-basic"
            label="Note"
            variant="standard"
            onChange={onNoteChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Create
          </Button>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default ScheduleClassModal;
