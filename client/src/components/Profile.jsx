import React, {useState, useEffect} from 'react';
import AddStudent from './AddStudent.jsx';
import axios from 'axios';

const Profile = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getStudents();
  }, [])

  const submitNewStudent = async (e) => {
    e.preventDefault();
    let name = e.target[0].value;
    let lessonHour = e.target[1].value;

    const res = await axios.post('/students', {
      name: name,
      lessonHour: lessonHour
    });
    getStudents();
  }

  const getStudents = async () => {
    const res = await axios.get('/students');
    setStudents(res.data);
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
          <button type="submit" value="add-student">Add</button>
        </form>
      }
      {students.map((student) =>
        <div key={student.id}>
          <div>{student.name}</div>
          <div>{student.lesson_hours}</div>
        </div>
      )}
      {/* {showModal && <AddStudent students={students} setStudents={setStudents}/>} */}
    </div>
  )
}

export default Profile;