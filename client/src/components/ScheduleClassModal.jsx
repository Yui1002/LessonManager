import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, IconButton, FormControl, TextField, InputLabel, NativeSelect, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ScheduleClassModal = (props) => {
  const [start, setStart] = useState("");
  const [start, setStart] = useState("");
  const [start, setStart] = useState("");
  const [start, setStart] = useState("");

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

  return (
    <Modal
      open={props.modalOpen}
      // onClose={handleClose}
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
            defaultValue={`${value}T10:00`}
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
              required
              defaultValue="Select"
              onChange={onStudentChange}
              inputProps={{
                name: "student_name",
                id: "uncontrolled-native",
              }}
            >
              <option>Select</option>
              {students.map((student) => {
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
