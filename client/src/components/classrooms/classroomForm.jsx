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

export default function ClassroomForm({
  id,
  schoolId,
  description,
  schools,
  handleSchoolIdOnChange,
  handleDescriptionOnChange,
  handleOnSubmit,
}) {

  const handleSchoolOnChange = (e) => {
  }

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        handleOnSubmit();
      }}
      noValidate
      sx={{ mb: 2 }}
    >
      <Typography variant="h5">Create/Update Classroom</Typography>
      <TextField
        disabled
        value={id}
        type="hidden"
        name="id"
        variant="standard"
      />
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="schoolId">School</InputLabel>
            <Select
              
              labelId="schoolId"
              id="schoolId"
              value={schoolId}
              label="School"
              onChange={e=>{handleSchoolIdOnChange(e.target.value)}}
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
              value={description}
              id="outlined-required"
              label="Description"
              name="description"
              onChange={e=>{handleDescriptionOnChange(e.target.value)}}
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
              {id == '' ? 'Create classroom' : 'Update classroom'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
