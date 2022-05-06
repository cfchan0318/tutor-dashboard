import React from 'react'
import Dashboard from '../Layout/dashboard/dashboard.component'
import { useParams } from 'react-router-dom'
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
  const [maxCapacity, setMaxCapacity] = React.useState(0)
  const [courseId, setCourseId] = React.useState(0)
  const [classroomId, setClassroomId] = React.useState(0)

  //Modal
  const [course, setCourse] = React.useState(null)
  const [classroom, setClassroom] = React.useState(null)

  

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
          setMaxCapacity(resClass.maxCapacity)
          setCourseId(resClass.courseId)
          setClassroomId(resClass.classroomId)
          setCourse(getCourseById(resClass.courseId))
          setClassroom(getClassroomById(resClass.classroomId))
        })
    }
   }
  

  React.useEffect(() => {
    setClassId(id)
    getClassById(classId);
  }, [id, classId])
  

  return (
    <Dashboard>
      <div>Class Details: {classId}</div>
    </Dashboard>
  )
}

export default ClassDetails
