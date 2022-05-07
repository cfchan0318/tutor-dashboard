import React from 'react'
import Dashboard from '../Layout/dashboard/dashboard.component'
import { useParams } from 'react-router-dom'
import { Typography, Grid } from '@mui/material';
import ClassStudentList from '../components/classDetails/ClassStudentList';
import ClassStudentModal from '../components/classDetails/ClassStudentModal';
import axios from 'axios'

const ClassDetails = (props) => {
  //auth
  const token = localStorage.getItem('token')

  let { id } = useParams()

  const getCurrentDateTime = () => {
    var tzoffset = -480 * 60000 //offset in milliseconds
    var localISOTime = new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, -8)

    return localISOTime
  }

  const [classId, setClassId] = React.useState(id)

  //Form
  const [description, setDescription] = React.useState('')
  const [startDateTime, setStartDateTime] = React.useState(getCurrentDateTime())
  const [endDateTime, setEndDateTime] = React.useState(getCurrentDateTime())
  const [studentCount, setStudentCount] = React.useState(0);
  const [maxCapacity, setMaxCapacity] = React.useState(0)
  const [courseId, setCourseId] = React.useState(0)
  const [classroomId, setClassroomId] = React.useState(0)
  

  //Modal
  const [course, setCourse] = React.useState(null)
  const [classroom, setClassroom] = React.useState(null)

  const [students, setStudents] = React.useState([]);

  

  const formatDateTime = (datetime) => {
    return datetime.slice(0, -8)
  }


  const getCourseById = (id) => {

    axios.get('/api/courses/' + id, { headers: { Authorization: token } })
      .then((response) => {
        return response.description;
      })
  }

  
  const getClassroomById = (id) => {
    axios.get('/api/classrooms/' + id, { headers: { Authorization: token } })
      .then((response) => {
        return response.description;
       })
  }
  const getClassById = (id) => {
    if (id !== 0) {
      axios
        .get('/api/classes/' + id, { headers: { Authorization: token } })
        .then((response) => {
          const resClass = response.data
          setDescription(resClass.description)
          setStartDateTime(formatDateTime(resClass.fromDateTime))
          setEndDateTime(formatDateTime(resClass.toDateTime))
          setStudentCount(resClass.studentCount)
          setMaxCapacity(resClass.maxCapacity)
          setCourseId(resClass.courseId)
          setClassroomId(resClass.classroomId)
          setCourse(getCourseById(resClass.courseId))
          setClassroom(getClassroomById(resClass.classroomId))
          setStudents(resClass.students)
        })
    }
   }
  

  React.useEffect(() => {
    setClassId(id)
    getClassById(classId);
  }, [id, classId])
  

  return (
    <Dashboard>
      <ClassStudentModal/>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">課堂詳情: {course} - {description}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">上課時間: 由 {startDateTime} 至 {endDateTime}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">學生人數: {studentCount} / {maxCapacity}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">課室: {classroom}</Typography>
        </Grid>
        <Grid item xs={12}>
          <ClassStudentList students={students}/>
        </Grid>
      </Grid>
    </Dashboard>
  )
}

export default ClassDetails
