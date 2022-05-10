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

const ClassStudentModal = ({ students, open, handleClose, handleSubmmit }) => {
  const [studentId, setStudentId] = React.useState(0)
  const [hasPayment, setHasPayment] = React.useState(false)
  const [paymentRef, setPaymentRef] = React.useState('')

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
            handleSubmmit()
          }}
          noValidate
          sx={{ mb: 2 }}
        >
          <Box sx={style}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {studentId === 0 ? '新增學生課堂資料' : '更新學生課堂資料'}
                </Typography>
              </Grid>

              {students.length > 0 ? (
                <Grid item xs={12}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <Autocomplete
                      filterOptions={(x) => x}
                      value={studentId}
                      id="combo-box-demo"
                      options={students}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, selectedOption) => {
                        setStudentId(selectedOption.id)
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
                    control={<Checkbox onClick={console.log('123')} />}
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
                  {studentId === 0 ? '新增學生課堂資料' : '更新學生課堂資料'}
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
