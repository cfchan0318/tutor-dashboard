import axios from 'axios'
import * as React from 'react'
import Dashboard from '../Layout/dashboard/dashboard.component'
import ClassList from '../components/classes/classList'
import CreateClassModal from '../components/classes/createClassModal'
import { Box, Button, Typography } from '@mui/material'

export default function Class(props) {
  //auth
  const token = localStorage.getItem('token');

  //Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    getClasses();
  };
  
  //Modal - update class
  const [classId, setClassId] = React.useState(0);

  //classes
  const [classes, setClasses] = React.useState([]);
  const [courses, setCourses] = React.useState([])
  const [classrooms, setClassrooms] = React.useState([])


  const createClasssOnClick = () => {
    handleOpen();
  }

  const handleUpdateOnClick = (event, cellValues) => {
    setClassId(cellValues.row.id);
    handleOpen();

  }

  const handleDeleteOnClick = (event, cellValues)=>{
    axios.delete('/api/classes/' + cellValues.row.id, { headers: { Authorization: token } })
      .then(response => {
        getClasses();
      })
  }
  const getClassrooms = () => {
    axios
      .get('/api/classrooms', { headers: { Authorization: token } })
      .then((response) => {
        setClassrooms(response.data)
      })
  }

  const getCourses = () => {
    axios
      .get('/api/courses', { headers: { Authorization: token } })
      .then((response) => {
        setCourses(response.data)
      })
  }


  const getClasses = () => { 
    axios.get('/api/classes', { headers: { Authorization: token } })
      .then(response => {
        setClasses(response.data);
      })
  }

  React.useEffect(() => { 
    getClasses();
    getCourses();
    getClassrooms();
  },[])

  return (
    <Dashboard headerHandleOnClick={props.logoutOnClick}>
      <Typography variant="h4" gutterBottom>
        課堂管理
      </Typography>
      <Box>
        <Button
          type="submit"
          style={{ marginRight: '10px' }}
          variant="contained"
          color="primary"
          onClick={createClasssOnClick}
        >
          新增課堂
        </Button>
      </Box>
      <CreateClassModal classId={classId} classrooms={classrooms} courses={courses} token={token} open={open} handleOpen={handleOpen} handleClose={handleClose} keepMounted/>
      <ClassList handleUpdateOnClick={handleUpdateOnClick} handleDeleteOnClick={handleDeleteOnClick} courses={courses} classrooms={classrooms} classes={classes}/>
    </Dashboard>
  )
}
