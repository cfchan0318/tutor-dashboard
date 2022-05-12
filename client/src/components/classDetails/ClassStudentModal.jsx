import React from 'react'
import {
  Button,
  Box,
  Typography,
  Modal,
  TextField,
  Grid,
  FormControl,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import axios from 'axios'

const ClassStudentModal = ({
  token,
  open,
  handleClose,
  classId,
  studentId,
}) => {
  const [students, setStudents] = React.useState([])
  const [student, setStudent] = React.useState(students[0])
  const [hasPayment, setHasPayment] = React.useState(false)
  const [paymentRef, setPaymentRef] = React.useState('')

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',

    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

  const getStudents = async () => {
    axios
      .get('/api/students', { headers: { Authorization: token } })
      .then((response) => {
        setStudents(response.data)
      })
  }

  const handleSubmitOnClick = () => {
    let classStudent = {
      class_id: classId,
      student_id: student.id,
      hasPayment: hasPayment,
      paymentRef: paymentRef,
    }
    axios.post('/api/classStudents', classStudent, { headers: { Authorization: token } })
      .then(response => {
        handleClose();
      })
      .catch(err => {
        console.log(err);
      })
  }

  React.useEffect(() => {
    getStudents()
  }, [])

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          handleClose()
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmitOnClick()
          }}
          noValidate
          sx={{ mb: 2 }}
        >
          <Box sx={style}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {studentId === 0 ? '新增學生至課堂' : '更新學生課堂資料'}
                </Typography>
              </Grid>

              {students.length > 0 ? (
                <Grid item xs={12}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <Autocomplete
                      filterOptions={(x) => x}
                      value={student || null}
                      id="combo-box-demo"
                      options={students}
                      isOptionEqualToValue={(option, value) => option === value}
                      getOptionLabel={(option) => option.name || ''}
                      onChange={(event, selectedOption) => {
                        setStudent(selectedOption)
                      }}
                      sx={{ width: '100%' }}
                      renderInput={(params) => (
                        <TextField {...params} label="學生" />
                      )}
                    />
                  </FormControl>
                </Grid>
              ) : (
                <div></div>
              )}

              <Grid item xs={4}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={hasPayment}
                        onClick={() => {
                          setHasPayment(!hasPayment)
                        }}
                      />
                    }
                    label="已付款?"
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={8}>
                <Box>
                  <TextField
                    required
                    fullWidth
                    type="text"
                    value={paymentRef}
                    id="outlined-required"
                    label="付款紀錄"
                    name="description"
                    onChange={(e) => {
                      setPaymentRef(e.target.value)
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  style={{ marginRight: '10px' }}
                  variant="contained"
                  color="primary"
                >
                  {studentId === 0 ? '新增學生至課堂' : '更新學生課堂資料'}
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

export default ClassStudentModal
