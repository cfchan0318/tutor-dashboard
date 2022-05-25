import React from 'react'
import Dashboard from '../Layout/dashboard/dashboard.component'
import CourseStudentsList from '../components/courseDetails/CourseStudentsList'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Grid } from '@mui/material'
import { Typography } from '@mui/material'

const CourseDetails = ({ logoutOnClick }) => {
  //auth
  const token = localStorage.getItem('token')
  let { id } = useParams()
  const [course, setCourse] = React.useState({})
  const [subject, setSubject] = React.useState('')
  const [courseStudents, setCourseStudents] = React.useState([])

  React.useEffect(() => {
    axios
      .get('/api/courses/' + id, { headers: { Authorization: token } })
      .then((res) => {
        setCourse(res.data)
        return res.data.subjectId
      })
      .then((subjectId) => {
        axios
          .get('/api/subjects/' + subjectId, {
            headers: { Authorization: token },
          })
          .then((res) => {
            setSubject(res.data.description)
          })
      })
  }, [])

  return (
    <Dashboard headerHandleOnClick={logoutOnClick}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">課程: {course.description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">科目: {subject}</Typography>
              </Grid>
              <Grid item xs={12}>
                  <CourseStudentsList courseId={id} token={token}></CourseStudentsList>
        </Grid>
      </Grid>
    </Dashboard>
  )
}

export default CourseDetails
