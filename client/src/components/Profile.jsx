import React, {useState, useEffect} from 'react';
import AddStudent from './AddStudent.jsx';
import axios from 'axios';

const Profile = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getStudents();
  }, [])

  const submitStudent = () => {
    setShowModal(true);
  }

  const getStudents = () => {
    axios.get('/students')
    .then(data => {
      const result = data.data;
      console.log('result: ', result);
      setStudents(result);
    })
    .catch(err => {
      console.log('error: ', err);
    })
  }


  return (
    <div>
      <h1>Student's Profile</h1>
      <button onClick={submitStudent}>Add a new student</button>
      {students.map((student) =>
        <div key={student.id}>
          <div>{student.name}</div>
          <div>{student.lesson_hours}</div>
        </div>
      )}
      {showModal && <AddStudent />}
    </div>
  )
}

export default Profile;