import * as React from 'react'
import SchoolForm from '../components/schools/form'
import SchoolList from '../components/schools/schoolList'
import Dashboard from '../Layout/dashboard/dashboard.component'
import { Box,Button, Typography } from '@mui/material'

import axios from 'axios'

export default function Schools(props) {
  //auth
  const token = localStorage.getItem('token')

  //Data
  const [schools, setSchools] = React.useState([])
  const [schoolId, setSchoolId] = React.useState(0)
  const [schoolDesc, setSchoolDesc] =React.useState('')
  

  function onSubmit(id, description) {
    if (description === '') {
      alert('please enter description')
    } else {
      if (id === 0) {
        const school = {
          description: description,
        }
        //submit school to api
        axios
          .post('/api/schools', school, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          })
          .then(() => {
            getSchools();
            setSchoolId(0);
            setSchoolDesc('');
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        const school = {
          description: description,
        }

        //submit school to api
        axios
          .put('/api/schools/'+id, school, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          })
          .then(() => {
            getSchools();
            setSchoolId(0);
            setSchoolDesc('');
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
    //initiate school to be submitted

    console.log(description)
  }

  //schools list
  function getSchools() {
    axios
      .get('api/schools', { headers: { Authorization: token } })
      .then((response) => {
        setSchools(response.data)
      })
  }

  function updateOnClick(event, cellValues) {
    event.preventDefault()
    setSchoolId(cellValues.row.id)
    setSchoolDesc(cellValues.row.description)
  }

  function deleteOnClick(event,cellValues){
    event.preventDefault();
    let id = cellValues.row.id
    //submit school to api
    axios
    .delete('/api/schools/'+id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
    .then((response) => console.log(response))
    .then(() => {
      getSchools()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  React.useEffect(() => {
    getSchools()
  }, [])

  return (
    <Dashboard headerHandleOnClick={props.logoutOnClick}>
      <Box sx={{ mb: 1 }}>
        <Box display="flex" justifyContent="flex-start">
          <Typography variant="h4" sx={{ pr: '10px' }}>
            學校
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setSchoolId(0);
              setSchoolDesc('');
            }}
          >
            新增學校
          </Button>
        </Box>
      </Box>
      <Box sx={{ mb: 1 }}>
        <SchoolForm
          id={schoolId}
          schoolDesc={schoolDesc}
          
          onSubmit={onSubmit}
        />
      </Box>

      <Box sx={{ mb: 1 }}>
        <SchoolList schools={schools} updateOnClick={updateOnClick} deleteOnClick={deleteOnClick}/>
      </Box>
    </Dashboard>
  )
}
