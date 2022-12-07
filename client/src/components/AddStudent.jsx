import React, {useState} from 'react';
import axios from 'axios';

// Modal window for adding a new student
const AddStudent = () => {
  const [addStudentError, setAddStudentError] = useState(false);

  const submitNewStudent = (e) => {
    e.preventDefault();

    let name = e.target[0].value;
    let lessonHour = e.target[1].value;

    axios.post('/students', {
      name: name,
      lessonHour: lessonHour
    })
    .then((data) => {
      // get latest list of students
      axios.get('/students')
    })
    .catch(err => {
      setAddStudentError(true);
    })
  }

  return (
    <div>
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
      {addStudentError && <p>The student already exists</p>}
    </div>
  )
}

export default AddStudent;