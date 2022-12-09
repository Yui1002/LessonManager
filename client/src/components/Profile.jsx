import React, {useState, useEffect} from 'react';
import Student from './Student.jsx';
import axios from 'axios';
import './Profile.css'

const Profile = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getStudents();
  }, [])

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
    getStudents();
  }

  const getStudents = async () => {
    const res = await axios.get('/students');
    setStudents(res.data);
  }

  const deleteStudent = async (e) => {
    const name = e.target.value;

    const res = await axios.delete('/student', {
      data: {
        name: name
      }
    });
    getStudents();
  }

  return (
    <div>
      <h1>Student's Profile</h1>
      <button onClick={() => setShowForm(true)}>Add a new student</button>
      {showForm &&
        <form onSubmit={submitNewStudent}>
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
        {students.map((student) =>
          <div key={student.id} className="student">
            <Student
              student={student}
              deleteStudent={deleteStudent}
              getStudents={getStudents}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile;