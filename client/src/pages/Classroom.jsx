import * as React from 'react'
import Dashboard from '../Layout/dashboard/dashboard.component'
import ClassroomList from '../components/classrooms/classroomList'
import ClassroomForm from '../components/classrooms/classroomForm'
import axios from 'axios'

export default function Classrooms(props) {
  //auth
  const token = localStorage.getItem('token')

  //data
  const [schools, setSchools] = React.useState([])
  const [classrooms, setClassrooms] = React.useState([])

  async function fetchSchools() {
    axios
      .get('/api/schools', {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setSchools(response.data)
      })
  }

  async function findSchoolById(id) {
    let school = schools.find((element) => element.id === id)
    
    if (school === undefined) {
      return ''
    }
    return school.description
  }

  function fetchClassrooms() {
    axios
      .get('/api/classrooms', {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        return response.data
      })
      .then((data) => {
        const res = data.map((classroom, i) => {
          findSchoolById(classroom.schoolId).then((description) => {
            classroom.school = description
          })
          return classroom
        })

        setClassrooms(res)
      })
  }

  React.useEffect(() => {
    fetchSchools()
  }, [])

  React.useEffect(() => {
    fetchClassrooms()
  }, [schools])

  return (
    <Dashboard>
      <ClassroomForm classroom={{}} schools={schools}/>
      <ClassroomList classrooms={classrooms}></ClassroomList>
    </Dashboard>
  )
}
