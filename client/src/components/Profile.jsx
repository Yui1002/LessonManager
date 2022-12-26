import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Student from "./Student.jsx";
import axios from "axios";
import "./Profile.css";
import NewStudent from "./NewStudent.jsx";

const Profile = (props) => {
  const [showForm, setShowForm] = useState(false);
  const duringPopUp3 = showForm ? "during-popup_3" : "";
  const navigate = useNavigate();

  const closeForm = () => {
    setShowForm(false);
  };

  const submitNewStudent = async (e) => {
    e.preventDefault();
    setShowForm(false);

    let name = e.target[0].value;
    let lessonHour = e.target[1].value;
    let email = e.target[2].value;

    const res = await axios.post("/students", {
      name: name,
      lessonHour: lessonHour,
      email: email,
    });
    props.getStudents();
  };

  const deleteStudent = async (e) => {
    const name = e.target.value;

    const res = await axios.delete("/student", {
      data: {
        name: name,
      },
    });
    props.getStudents();
  };

  return (
    <div>
      <button
        className="profile_go_back_button"
        onClick={() => navigate("/home")}
      >
        Go Back
      </button>
      <br />
      <h1 className="profile_title">Student's Profile</h1>
      <div className="profile_add_student_button_wrap">
        <button
          className="profile_add_student_button"
          onClick={() => setShowForm(true)}
        >
          Create a New Student
        </button>
      </div>
      {showForm && (
        <div className={duringPopUp3}>
          <NewStudent closeForm={closeForm}/>
        </div>
      )}
      <div className="students_list">
        {props.students.map((student) => (
          <div key={student.id} className="student">
            <Student
              student={student}
              deleteStudent={deleteStudent}
              getStudents={props.getStudents}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
