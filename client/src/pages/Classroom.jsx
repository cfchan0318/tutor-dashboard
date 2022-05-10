import * as React from 'react'
import Dashboard from '../Layout/dashboard/dashboard.component'
import ClassroomList from '../components/classrooms/classroomList'
import ClassroomForm from '../components/classrooms/classroomForm'
import axios from 'axios'

export default function Classrooms(props) {
  //auth
  const token = localStorage.getItem('token')

  const [schools, setSchools] = React.useState([])
  const [classrooms, setClassrooms] = React.useState([])

  //current classroom
  const [id, setId] = React.useState(0)
  const [schoolId, setSchoolId] = React.useState(0)
  const [description, setDescription] = React.useState('')

  //Data
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

  //Classroom Form utils
  function handleSchoolIdOnChange(schoolId) {
    setSchoolId(schoolId)
  }

  function handleDescriptionOnChange(description) {
    setDescription(description)
  }

  function handleOnSubmit() {
    console.log(id + ' ' + schoolId + ' ' + description)
    const classroom = {
      schoolId: schoolId,
      description: description,
    }

    if (id === 0) {
      axios
        .post('/api/classrooms', classroom, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          alert('created successfully.')
          fetchClassrooms()
        })
    } else {
      axios
        .put('/api/classrooms/'+id, classroom, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          alert('updated successfully.')
          fetchClassrooms()
        })
    }
  }

  //Classroom List Utils
  function handleDeleteOnClick(event, cellValues) {
    const classroomId = cellValues.row.id
    axios
      .delete('/api/classrooms/' + classroomId, {
        headers: { Authorization: token },
      })
      .then((response) => {
        alert(response.data.message)
        fetchSchools();
      })
  }

  function handleUpdateOnClick(event,cellValues){
    setId(cellValues.row.id);
    setSchoolId(cellValues.row.schoolId);
    setDescription(cellValues.row.description);
  }

  //Lifecycle
  React.useEffect(() => {
    fetchSchools()
  }, [])

  React.useEffect(() => {
    fetchClassrooms()
  }, [schools])

  return (
    <Dashboard headerHandleOnClick={props.logoutOnClick}>
      <ClassroomForm
        id={id}
        schoolId={schoolId}
        description={description}
        schools={schools}
        handleSchoolIdOnChange={handleSchoolIdOnChange}
        handleDescriptionOnChange={handleDescriptionOnChange}
        handleOnSubmit={handleOnSubmit}
      />
      <ClassroomList
        classrooms={classrooms}
        handleDeleteOnClick={handleDeleteOnClick}
        handleUpdateOnClick={handleUpdateOnClick}
      ></ClassroomList>
    </Dashboard>
  )
}
