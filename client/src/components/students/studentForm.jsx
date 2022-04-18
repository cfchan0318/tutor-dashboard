import * as React from 'react'
import axios from 'axios'

import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'

export default function StudentForm(props) {
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

  const [student, setStudent] = React.useState(newStudent);
 
  React.useEffect(() => {
    setStudent(props.student);
  },[props.student])
  
  function submitOnClick(student) {
    if (student.id) {
      //Update Student
      axios
        .put('/api/students/' + student.id, student, {
          headers: { Authorization: props.token },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    } else {
      //Create Student
      axios
        .post('/api/students', student, {
          headers: { Authorization: props.token },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
    props.submitStudent()
  }

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        submitOnClick(student)
      }}
      noValidate
      sx={{ mb: 2 }}
    >
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={6} sm={4} md={4}>
          <TextField
            required
            fullWidth
            value={student.name}
            id="outlined-required"
            label="英文姓名"
            name="name"
            onChange={(e) => {
              setStudent((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <TextField
            fullWidth
            value={student.chineseName}
            id="outlined-required"
            label="中文姓名"
            name="chineseName"
            onChange={(e) => {
              setStudent((prevState) => ({
                ...prevState,
                chineseName: e.target.value,
              }))
            }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <TextField
            fullWidth
            value={student.hkid}
            id="outlined-required"
            label="身份證號碼"
            name="hkid"
            onChange={(e) => {
              setStudent((prevState) => ({
                ...prevState,
                hkid: e.target.value,
              }))
            }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <FormControl>
            <FormLabel>性別</FormLabel>
            <RadioGroup
              row
              value={student.sex}
              onChange={(e) => {
                setStudent((prevState) => ({
                  ...prevState,
                  sex: e.target.value,
                }))
              }}
            >
              <FormControlLabel value="M" control={<Radio />} label="男" />
              <FormControlLabel value="F" control={<Radio />} label="女" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <TextField
            fullWidth
            id="date"
            label="出生日期"
            type="date"
            value={student.birthday}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setStudent((prevState) => ({
                ...prevState,
                birthday: e.target.value,
              }))
            }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <TextField
            fullWidth
            id="date"
            label="加入日期"
            type="date"
            value={student.joinDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setStudent((prevState) => ({
                ...prevState,
                joinDate: e.target.value,
              }))
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={student.address}
            id="outlined-required"
            label="地址"
            name="address"
            onChange={(e) => {
              setStudent((prevState) => ({
                ...prevState,
                address: e.target.value,
              }))
            }}
          />
        </Grid>
        <Grid item>
          <Box>
            <Button
              type="submit"
              style={{ marginRight: '10px' }}
              variant="contained"
              color="primary"
            >
              {student.id ? '更新學生' : '新增學生'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
