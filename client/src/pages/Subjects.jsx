import axios from 'axios'
import * as React from 'react'
import Dashboard from '../Layout/dashboard/dashboard.component'
import SubjectForm from '../components/subjects/subjectForm'
import SubjectList from '../components/subjects/subjectList'
import { Box, Typography, Button } from '@mui/material'

export default function Subject(props) {
  //auth
  const token = localStorage.getItem('token')

  //states
  const [subjects, setSubjects] = React.useState([])
  const [subjectId, setSubjectId] = React.useState(0)
  const [subjectDesc, setSubjectDesc] = React.useState('')

  // Subject Form
  function handleOnSubmit(id, description) {
    if (id !== 0) {
      axios
        .put(
          '/api/subjects/' + id,
          {
            description: description,
          },
          { headers: { Authorization: token } },
        )
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      axios
        .post(
          '/api/subjects',
          {
            description: description,
          },
          { headers: { Authorization: token } },
        )
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    setSubjectId(0);
    setSubjectDesc('');
    fetchSubjects();
  }

  //Subject List
  function fetchSubjects() {
    axios
      .get('api/subjects', { headers: { Authorization: token } })
      .then((res) => {
        setSubjects(res.data)
      })
  }

  function handleUpdateOnClick(event, cellValues) {
    event.preventDefault()
    setSubjectId(cellValues.row.id)
    setSubjectDesc(cellValues.row.description)
  }

  function handleDeleteOnClick(event,cellValues){
    event.preventDefault();
    const id = cellValues.row.id;
    axios.delete('/api/subjects/'+id,{headers:{Authorization:token}});
    fetchSubjects();
  }
  React.useEffect(() => {
    fetchSubjects()
  }, [])

  return (
    <Dashboard headerHandleOnClick={props.logoutOnClick}>
      <Box sx={{ mb: 1 }}>
        <Box display="flex" justifyContent="flex-start">
          <Typography variant="h4" sx={{ pr: '10px' }}>
            科目
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setSubjectId(0);
              setSubjectDesc('');
            }}
          >
            新增科目
          </Button>
        </Box>
      </Box>
      <SubjectForm
        subjectId={subjectId}
        subjectDesc={subjectDesc}
        handleOnSubmit={handleOnSubmit}
      />
      <SubjectList
        handleUpdateOnClick={handleUpdateOnClick}
        handleDeleteOnClick={handleDeleteOnClick}
        subjects={subjects}
      />
    </Dashboard>
  )
}
