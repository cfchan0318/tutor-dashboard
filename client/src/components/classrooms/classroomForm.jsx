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

export default function ClassroomForm({ classroom, schools, formOnSubmit }) {
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        formOnSubmit()
      }}
      noValidate
      sx={{ mb: 2 }}
    >
      <Typography variant="h5">Create/Update Classroom</Typography>
      <TextField
        disabled
        value={classroom.id}
        type="hidden"
        name="id"
        variant="standard"
      />
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="schoolId">School</InputLabel>
            <Select
              defaultValue={0}
              labelId="schoolId"
              id="schoolId"
              value={classroom.schoolId}
              onChange={(e) => {
                e.preventDefault()
                //schoolIdOnChange(e.target.value)
              }}
              label="School"
            >
              <MenuItem value={0}>Please select School</MenuItem>
              {schools.map((school) => (
                <MenuItem key={school.id} value={school.id}>
                  {school.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <Box>
            <TextField
              required
              fullWidth
              value={classroom.description}
              onChange={(e) => {
                //setDescription(e.target.value)
              }}
              id="outlined-required"
              label="Description"
              name="description"
            />
          </Box>
        </Grid>

        <Grid item xs>
          <Box>
            <Button
              type="submit"
              style={{ marginRight: '10px' }}
              variant="contained"
              color="primary"
            >
              {classroom.id == undefined
                ? 'Create classroom'
                : 'Update classroom'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
