import React, {useState} from 'react';
import AddStudent from './AddStudent.jsx';

const Profile = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const submitStudent = () => {
    setShowModal(true);
  }

  return (
    <div>
      <h1>Student's Profile</h1>
      <button onClick={submitStudent}>Add a new student</button>
      {students.map((student) =>
        <div>
          <div>name</div>
          <div>lesson hour</div>
        </div>
      )}
      {showModal && <AddStudent />}
    </div>
  )
}

export default Profile;