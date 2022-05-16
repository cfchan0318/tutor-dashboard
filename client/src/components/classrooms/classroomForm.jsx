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

  
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        handleOnSubmit();
      }}
      noValidate
      sx={{ mb: 3 }}
    >
      
      <TextField
        disabled
        value={id}
        type="hidden"
        name="id"
        variant="standard"
      />
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={12} md={3}>
          <FormControl >
            <InputLabel id="schoolId">School</InputLabel>
            <Select
              
              labelId="schoolId"
              id="schoolId"
              value={schoolId}
              label="School"
              onChange={e=>{handleSchoolIdOnChange(e.target.value)}}
            >
              <MenuItem value={0}>請選擇學校</MenuItem>
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
              label="課室"
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
              {id === 0 ? '新增課室' : '更新課室'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
