import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Student from "./Student.jsx";
import axios from "axios";
import "./Profile.css";
import NewStudent from "./NewStudent.jsx";
import { config } from "./../../../config";

const Profile = (props) => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const duringPopUp3 = showForm ? "during-popup_3" : "";
  const navigate = useNavigate();

  useEffect(() => {
    console.log("yes");
    props.checkLogin(getStudents);
  }, []);

  const getStudents = async () => {
    axios
      .get(`${config.BASE_PATH}getAllStudents`)
      .then((res) => {
        console.log("see here", res);
        setStudents(res.data);
      })
      .catch((err) => console.log(err));
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const deleteStudent = async (email) => {
    if (confirm("Are you sure you want to delete the student?")) {
      await axios.delete(`${config.BASE_PATH}deleteStudent`, {
        data: {
          email: email,
        },
      });
      getStudents();
    }
  };

  return (
    <div>
      {props.isLoggedIn && (
        <div>
          <button
            className="profile_go_back_button"
            onClick={() => navigate("/mainPage")}
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
              <NewStudent
                closeForm={closeForm}
                setShowForm={setShowForm}
                getStudents={getStudents}
              />
            </div>
          )}
          {students && students.length > 0 ? (
            <div className="students_list">
              {students.map((student) => (
                <div key={student.id} className="student">
                  <Student
                    student={student}
                    deleteStudent={deleteStudent}
                    getStudents={getStudents}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="no_students_registered">No students registered</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
