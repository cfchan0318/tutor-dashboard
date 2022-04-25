import * as React from 'react'
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import axios from 'axios';

export default function CourseForm({ token, courseId, handleSubmit }) {
  let defaultCourse = {
    "id": -1,
    "description": "",
    "subjectId": 0,
  }

  const [course, setCourse] = React.useState(defaultCourse);
  const [subjects, setSubjects] = React.useState([]);

  //Fetch Data
  const getCourseById = () => { 
    if (courseId) {
      axios.get('/api/courses/' + courseId, { headers: { "Authorization": token } })
        .then(response => {
          if (response.data.subjectId === null) { 
            response.data.subjectId = 0;
          }
          setCourse(response.data) 
        })
    }
  }

  const getSubjects = () => {
    axios.get('/api/subjects', { headers: { "Authorization": token } })
      .then(response => {
        setSubjects(response.data)
      })
  }

  //Form
  const handleSubmitOnClick = () => { 
    if (course.id === -1) {
      axios.post('/api/courses', course, { headers: { "Authorization": token } })
        .then(() => {
          handleSubmit();
        })
    } else { 
      axios.put('/api/courses/'+course.id, course, { headers: { "Authorization": token } })
        .then(() => {
          handleSubmit();
        })
    }
  }

  React.useEffect(() => { 
    getSubjects();
  },[])

  React.useEffect(() => {
    getCourseById();
  }, [courseId]);


  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmitOnClick();
      }}
      noValidate
      sx={{ mb: 2 }}
    >
      <Typography variant="h5">Create/Update Course</Typography>
      <TextField
        disabled
        value={course.id}
        type="hidden"
        name="id"
        variant="standard"
      />
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs>
          <Box>
            <TextField
              required
              fullWidth
              value={course.description}
              id="outlined-required"
              label="Description"
              name="description"
              onChange={(e) => {
                setCourse((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }}
            />
          </Box>
        </Grid>
        <Grid item xs>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="subjectId">Subject</InputLabel>
            <Select
              
              labelId="subjectId"
              id="subjectId"
              value={course.subjectId}
              label="Subject"
              onChange={e => {
                setCourse((prevState) => ({
                  ...prevState,
                  subjectId: e.target.value,
                }))
              }}
            >
              <MenuItem value={0}>Please select Subject</MenuItem>
              {subjects.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>
                  {subject.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <Box>
            <Button
              type="submit"
              style={{ marginRight: '10px' }}
              variant="contained"
              color="primary"
            >
              {course.id === -1 ? 'Create COurse' : 'Update Course'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
