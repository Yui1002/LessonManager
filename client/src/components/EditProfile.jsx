import React, { useState } from "react";
import axios from "axios";
import "./EditProfile.css";
import COUNTRY_LIST from "./COUNTRY.js";
import { Box, Typography, TextField, MenuItem, Button } from "@mui/material";
import { config } from './../../../config';

const EditProfile = (props) => {

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 440,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [firstName, setFirstName] = useState(props.student.firstName);
  const [lastName, setLastName] = useState(props.student.lastName);
  const [country, setCountry] = useState(props.student.country);
  const [phone, setPhone] = useState(props.student.phone);
  const [email, setEmail] = useState(props.student.email);
  const [hours, setHours] = useState(props.student.lessonHours);
  const [isFile, setIsFile] = useState(false);
  const [photo, setPhoto] = useState("");
  const [photoSrc, setPhotoSrc] = useState("");

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const onCountryChange = (e) => {
    setCountry(e.target.value);
  };
  const onPhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onHoursChange = (e) => {
    setHours(e.target.value);
  };

  const onPhotoChange = (e) => {
    let file = e.target.files[0];
    setPhoto(file);
    let reader = new FileReader();
    reader.onload = function () {
      setPhotoSrc(reader.result);
    };
    reader.readAsDataURL(file);
    setIsFile(true);
  };

  const saveChanges = async (e) => {
    e.preventDefault();
    props.setOpen(false);

    const formData = new FormData();
    formData.append("file", photo);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("country", country);
    formData.append("phoneNumber", phone);
    formData.append("email", props.student.email);
    formData.append("newEmail", email);
    formData.append("lessonHours", hours);

    const res = await axios.post(`${config.BASE_PATH}editProfile`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.status === 200) {
      props.getStudents();
    } else {
      console.log("update failed");
    }
  };

  return (
    <Box sx={style}>
      <Typography variant="h6">Edit Profile</Typography>
      <section className="popup_section_photo">
        <label htmlFor="file-upload" className="popup_file_upload">
          {isFile ? (
            <img className="popup_img_photo" src={photoSrc} />
          ) : (
            <img
              className="popup_img_photo"
              src={props.student.profile_photo}
            />
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          name="file"
          onChange={onPhotoChange}
          required
        />
      </section>
      <TextField
        required
        id="outlined-required"
        label="first name"
        defaultValue={props.student.firstName}
        size="small"
        sx={{ mr: 2, mb: 2 }}
        onChange={onFirstNameChange}
      />
      <TextField
        required
        id="outlined-required"
        label="last name"
        defaultValue={props.student.lastName}
        size="small"
        onChange={onLastNameChange}
      />
      <TextField
        id="outlined-select-country"
        select
        label="country"
        defaultValue={props.student.country}
        sx={{ width: 100, mb: 2, mr: 2 }}
        size="small"
        onChange={onCountryChange}
      >
        {COUNTRY_LIST.map((country) => (
          <MenuItem key={country} value={country}>
            {country}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        required
        id="outlined-required"
        label="phone number"
        defaultValue={props.student.phone}
        size="small"
        onChange={onPhoneChange}
      />
      <TextField
        required
        id="outlined-required"
        label="email"
        defaultValue={props.student.email}
        size="small"
        sx={{ mr: 2, mb: 2 }}
        onChange={onEmailChange}
      />
      <TextField
        required
        id="outlined-required"
        label="lesson_hours"
        defaultValue={props.student.lessonHours}
        size="small"
        onChange={onHoursChange}
      />
      <Button variant="contained" onClick={saveChanges}>
        Save
      </Button>
    </Box>
  );
};

export default EditProfile;
