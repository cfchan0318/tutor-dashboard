import axios from 'axios'
import * as React from 'react'
import Dashboard from '../Layout/dashboard/dashboard.component'
import CourseList from '../components/courses/courseList'
import CourseForm from '../components/courses/courseForm'

export default function Subject(props) {
  //auth
  const token = localStorage.getItem('token')
  
  const [courseId, setCourseId] = React.useState(null);
  const [courses, setCourses] = React.useState([]);

  const getCourses = () => { 
    axios.get('/api/courses', { headers: { "Authorization": token } })
      .then(response => {
        setCourses(response.data);
      });
  }

  React.useEffect(() => { 
    getCourses();
  },[])

  const handleUpdateOnClick = (event, cellValues) => { 
    setCourseId(cellValues.row.id);
  }

  const handleDeleteOnClick = (event,cellValues) => { 
    axios.delete('/api/courses/' + cellValues.row.id, { headers: { "Authorization": token } })
      .then(() => {
        getCourses();
      })
  }

  const handleSubmit = () => { 
    getCourses();
  }

  return (
    <Dashboard headerHandleOnClick={props.logoutOnClick}>
      <CourseForm
        token={token}
        courseId={courseId}
        handleSubmit={handleSubmit}
      />
      <CourseList
        courses={courses}
        handleUpdateOnClick={handleUpdateOnClick}
        handleDeleteOnClick={handleDeleteOnClick}
      />
    </Dashboard>
  )
}
