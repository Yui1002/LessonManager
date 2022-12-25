import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Student from './Student.jsx';
import axios from 'axios';
import './Profile.css'

const Profile = (props) => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const submitNewStudent = async (e) => {
    e.preventDefault();
    setShowForm(false);

    let name = e.target[0].value;
    let lessonHour = e.target[1].value;
    let email = e.target[2].value;

    const res = await axios.post('/students', {
      name: name,
      lessonHour: lessonHour,
      email: email
    });
    props.getStudents();
  }

  const deleteStudent = async (e) => {
    const name = e.target.value;

    const res = await axios.delete('/student', {
      data: {
        name: name
      }
    });
    props.getStudents();
  }

  return (
    <div>
      <button className="profile_go_back_button" onClick={() => navigate('/home')}>Go Back</button><br />
      <h1>Student's Profile</h1>
      <button className="profile_add_student_button" onClick={() => setShowForm(true)}>Add a new student</button>
      {showForm &&
        <form className="profile_add_student_form" onSubmit={submitNewStudent}>
          <section>
            <label htmlFor="name">Student's name</label>
            <input id="name" name="name" type="text" autoComplete="name" required autoFocus />
          </section>
          <section>
            <label htmlFor="lesson-hour">Total lesson hours</label>
            <input id="lesson-hour" name="lesson-hour" type="number" min="0" autoComplete="lesson-hour" required />
          </section>
          <section>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </section>
          <button type="submit" value="add-student">Add</button>
        </form>
      }
      <div className="students_list">
        {props.students.map((student) =>
          <div key={student.id} className="student">
            <Student
              student={student}
              deleteStudent={deleteStudent}
              getStudents={props.getStudents}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile;