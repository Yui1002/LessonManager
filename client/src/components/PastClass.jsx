import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, 
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from "@mui/material";
import moment from "moment";
import "./PastClass.css";
import {useNavigate} from "react-router-dom";
import { config } from "./../../../config";

const PastClass = () => {
  const [pastClasses, setPastClasses] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getPastClasses();
  }, [month, year]);

  const getPastClasses = () => {
    if (month === '' || year === '') return;

    axios.get(`${config.BASE_PATH}getClassesByDate`, {
      params: { month: month, year: year }
    })
    .then((res) => {
      if (res.data === '') {
        setPastClasses([]);
      } else {
        res.data.sort((a, b) => {
          return new Date(b.start_date) - new Date(a.start_date);
        });
        setPastClasses(res.data);
      }
    });
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div>
      <button
        className="profile_go_back_button"
        onClick={() => navigate("/mainPage")}
      >
        Go Back
      </button>
      <h2 className="past_class_title">Past classes</h2>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Month</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={month}
          onChange={handleMonthChange}
          label="month"
        >
          {[1,2,3,4,5,6,7,8,9,10,11,12].map((m) => (
            <MenuItem value={m}>{m}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={year}
          onChange={handleYearChange}
          label="month"
        >
          <MenuItem value={moment().format('YYYY') - 5}>{moment().format('YYYY') - 5}</MenuItem>
          <MenuItem value={moment().format('YYYY') - 4}>{moment().format('YYYY') - 4}</MenuItem>
          <MenuItem value={moment().format('YYYY') - 3}>{moment().format('YYYY') - 3}</MenuItem>
          <MenuItem value={moment().format('YYYY') - 2}>{moment().format('YYYY') - 2}</MenuItem>
          <MenuItem value={moment().format('YYYY') - 1}>{moment().format('YYYY') - 1}</MenuItem>
          <MenuItem value={moment().format('YYYY')}>{moment().format('YYYY')}</MenuItem>
        </Select>
      </FormControl>
      <TableContainer>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Student's name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pastClasses.length > 0 ? pastClasses.map((c, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {moment(c.start_date).format("YYYY/MM/DD")} <br />
                  {`${moment(c.start_date).format("HH:mm")} - ${moment(
                    c.end_date
                  ).format("HH:mm")}`}
                </TableCell>
                <TableCell>{c.name}</TableCell>
              </TableRow>
            )) : <TableRow><TableCell style={{borderBottom:"none"}}>No class found</TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PastClass;
