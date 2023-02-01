import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import moment from "moment";
import "./PastClass.css";
import {useNavigate} from "react-router-dom";

const PastClass = () => {
  const [pastClasses, setPastClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPastClasses();
  }, []);

  const getPastClasses = () => {
    axios.get("/schedule/past").then((res) => {
      console.log("1: ", res.data);
      res.data.sort((a, b) => {
        return new Date(b.start_date) - new Date(a.start_date);
      });
      console.log("2: ", res.data);
      setPastClasses(res.data);
    });
  };

  return (
    <div>
      <button
        className="profile_go_back_button"
        onClick={() => navigate("/home")}
      >
        Go Back
      </button>
      <h2 className="past_class_title">Past classes</h2>
      <TableContainer>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Student's name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pastClasses.map((c, index) => (
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PastClass;
