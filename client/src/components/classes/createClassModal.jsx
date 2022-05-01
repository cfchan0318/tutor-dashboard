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
  
  //Form
  const [startDateTime, setStartDateTime] = React.useState(getCurrentDateTime())
  const [endDateTime, setEndDateTime] = React.useState(getCurrentDateTime())
  const [maxCapacity, setMaxCapacity] = React.useState(0);
  const [courseId, setCourseId] = React.useState(0)
  const [classroomId, setClassroomId] = React.useState(0)

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
    const classToCreate = {
      fromDateTime: startDateTime+':00.000Z',
      toDateTime: endDateTime+':00.000Z',
      maxCapacity: maxCapacity,
      courseId: courseId,
      classroomId: classroomId,
    };

    axios
      .post('/api/classes', classToCreate, { headers: { Authorization: token } })
      .then((response) => {
        handleClose();
      })
  }

  const getClassById = (id) => { 
    if (id !== 0) { 
      axios.get('/api/classes/' + id, { headers: { Authorization: token } })
      .then(response => { 
        const resClass = response.data;
        setStartDateTime(resClass.startDateTime);
        setEndDateTime(resClass.endDateTime);
        setMaxCapacity(resClass.maxCapacity);
        setCourseId(resClass.courseId);
        setClassroomId(resClass.classroomId);
      })
    }
  }

  React.useEffect(() => {
    getClassById();
  }, [classId])

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
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
                  新增課堂 {classId}
                </Typography>
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

              <Grid item xs={12}>
                <FormControl sx={{ minWidth: '100%' }}>
                  <Autocomplete
                    filterOptions={(x) => x}
                    id="combo-box-demo"
                    options={courses}
                    getOptionLabel={(option) => option.description}
                    onChange={(event, selectedOption) => {
                      setCourseId(selectedOption.id)
                    }}
                    sx={{ width: '100%' }}
                    renderInput={(params) => (
                      <TextField {...params} label="課程" />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl sx={{ minWidth: '100%' }}>
                  <Autocomplete
                    filterOptions={(x) => x}
                    id="combo-box-demo"
                    options={classrooms}
                    getOptionLabel={(classroom) => classroom.description}
                    onChange={(event, selectedOption) => {
                      setClassroomId(selectedOption.id)
                    }}
                    sx={{ width: '100%' }}
                    renderInput={(params) => (
                      <TextField {...params} label="課室" />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  style={{ marginRight: '10px' }}
                  variant="contained"
                  color="primary"
                >
                  新增課堂
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
