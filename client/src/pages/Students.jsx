import * as React from 'react'
import Dashboard from '../Layout/dashboard/dashboard.component'
import { Box, Typography } from '@mui/material'
import StudentList from '../components/students/studentsList'
import StudentForm from '../components/students/studentForm'
import axios from 'axios'

export default function Student(props) {
  //auth
  const newStudent = {
    id: -1,
    studentNumber: '',
    name: '',
    chineseName: '',
    sex: '',
    birthday: '',
    hkid: '',
    address: '',
    joinDate: '',
  }
  const token = localStorage.getItem('token')
  const [students, setStudents] = React.useState([])
  const [student, setStudent] = React.useState(newStudent);

  function getStudents() {
    axios
      .get('/api/students', {
        headers: { Authorization: token },
      })
      .then((response) => {
        setStudents(response.data)
      })
  }

  function submitStudent() {
    console.log("submitted");
    getStudents();
  }

  function updateOnClick(event, cellValues) {
    
    console.log(cellValues.row.id);
    axios.get('/api/students/' + cellValues.row.id, {
      headers: {
        Authorization: token,
      }
    }).then(response => {
      console.log(response.data.birthday)
      setStudent(response.data);
    });

    
  }

  function deleteOnClick(event, cellValues) {
    axios.delete('/api/students/' + cellValues.row.id, {
      headers: {
        Authorization: token,
      },
    })
    getStudents();
  }

  React.useEffect(() => {
    getStudents()
  },[])

  return (
    <Dashboard headerHandleOnClick={props.logoutOnClick}>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h4">學生</Typography>
        
          <StudentForm
            token={token}
            student={student}
            submitStudent={submitStudent}
            deleteOnClick={deleteOnClick}
          />
        
       
      </Box>

      <StudentList
        students={students}
        updateOnClick={updateOnClick}
        deleteOnClick={deleteOnClick}
      />
    </Dashboard>
  )
}
