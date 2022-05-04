import axios from 'axios'
import * as React from 'react'
import {
  Button,
  Box,
  Typography,
  Modal,
  TextField,
  Grid,
  FormControl,
  Autocomplete,
} from '@mui/material'

export default function CreateClassModal({
  classId,
  courses,
  classrooms,
  token,
  open,
  handleOpen,
  handleClose,
}) {
  const getCurrentDateTime = () => {
    var tzoffset = -480 * 60000 //offset in milliseconds
    var localISOTime = new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, -8)

    return localISOTime
  }

  const formatDateTime = (datetime) => {
    return datetime.slice(0, -8)
  }

  const getCourseById = (id) => {
    let course = courses.filter((course) => (course.id === id))
    return course[0]
  }

  const getClassroomById = (id) => {
    let classroom = classrooms.filter((classroom) => (classroom.id === id))
    return classroom[0]
  }

  //Form
  const [description, setDescription] = React.useState('');
  const [startDateTime, setStartDateTime] = React.useState(getCurrentDateTime())
  const [endDateTime, setEndDateTime] = React.useState(getCurrentDateTime())
  const [maxCapacity, setMaxCapacity] = React.useState(0)
  const [courseId, setCourseId] = React.useState(0)
  const [classroomId, setClassroomId] = React.useState(0)

  //Modal
  const [course, setCourse] = React.useState(null)
  const [classroom, setClassroom] = React.useState(null)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',

    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

  const handleSubmmit = () => {
    if (classId === 0) {
      const classToCreate = {
        description: description,
        fromDateTime: startDateTime + ':00.000Z',
        toDateTime: endDateTime + ':00.000Z',
        maxCapacity: maxCapacity,
        courseId: courseId,
        classroomId: classroomId,
      }

      axios
        .post('/api/classes', classToCreate, {
          headers: { Authorization: token },
        })
        .then((response) => {
          handleClose()
        })
    } else {
      const classToUpdate = {
        id: classId,
        description: description,
        fromDateTime: startDateTime + ':00.000Z',
        toDateTime: endDateTime + ':00.000Z',
        maxCapacity: maxCapacity,
        courseId: courseId,
        classroomId: classroomId,
      }

      axios
        .put('/api/classes/' + classId, classToUpdate, {
          headers: { Authorization: token },
        })
        .then((response) => {
          getClassById(classId)
          handleClose()
        })
    }
  }

  const getClassById = (id) => {
    if (id !== 0) {
      axios
        .get('/api/classes/' + id, { headers: { Authorization: token } })
        .then((response) => {
          const resClass = response.data;
          setDescription(resClass.description);
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
    getClassById(classId)
  }, [classId])

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setCourse(null)
          setClassroom(null)
          setStartDateTime(getCurrentDateTime())
          setEndDateTime(getCurrentDateTime())
          setMaxCapacity(0)
          handleClose()
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmmit()
          }}
          noValidate
          sx={{ mb: 2 }}
        >
          <Box sx={style}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {classId === 0 ? '新增課堂' : '更新課堂'}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Box>
                  <TextField
                    required
                    fullWidth
                    type="text"
                    value={description}
                    id="outlined-required"
                    label="描述"
                    name="description"
                    onChange={(e) => {
                      setDescription(e.target.value)
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box>
                  <TextField
                    required
                    fullWidth
                    type="datetime-local"
                    value={startDateTime}
                    id="outlined-required"
                    label="開始於"
                    name="description"
                    onChange={(e) => {
                      setStartDateTime(e.target.value)
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box>
                  <TextField
                    required
                    fullWidth
                    type="datetime-local"
                    value={endDateTime}
                    id="outlined-required"
                    label="結束於"
                    name="description"
                    onChange={(e) => {
                      setEndDateTime(e.target.value)
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box>
                  <TextField
                    required
                    fullWidth
                    value={maxCapacity}
                    id="outlined-required"
                    label="人數上限"
                    name="maxCapacity"
                    onChange={(e) => {
                      setMaxCapacity(e.target.value)
                    }}
                  />
                </Box>
              </Grid>

              {courses.length > 0 ? (
                <Grid item xs={12}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <Autocomplete
                      filterOptions={(x) => x}
                      value={course}
                      id="combo-box-demo"
                      options={courses}
                      getOptionLabel={(option) => option.description}
                      onChange={(event, selectedOption) => {
                        setCourse(selectedOption)
                        setCourseId(selectedOption.id)
                      }}
                      sx={{ width: '100%' }}
                      renderInput={(params) => (
                        <TextField {...params} label="課程" />
                      )}
                    />
                  </FormControl>
                </Grid>
              ) : (
                <div></div>
              )}

              {classrooms.length > 0 ? (
                <Grid item xs={12}>
                <FormControl sx={{ minWidth: '100%' }}>
                  <Autocomplete
                    filterOptions={(x) => x}
                    id="combo-box-demo"
                    value={classroom}
                    options={classrooms}
                    getOptionLabel={(classroom) => classroom.description}
                    onChange={(event, selectedOption) => {
                      setClassroom(selectedOption)
                      setClassroomId(selectedOption.id)
                    }}
                    sx={{ width: '100%' }}
                    renderInput={(params) => (
                      <TextField {...params} label="課室" />
                    )}
                  />
                </FormControl>
              </Grid>
              ):(<div></div>)}
              

              <Grid item xs={12}>
                <Button
                  type="submit"
                  style={{ marginRight: '10px' }}
                  variant="contained"
                  color="primary"
                >
                  {classId === 0 ? '新增課堂' : '更新課堂'}
                </Button>
              </Grid>
            </Grid>

            {/* Form Box End*/}
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
