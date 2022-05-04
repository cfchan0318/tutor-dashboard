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

export default function SubjectForm({
  subjectId,
  subjectDesc,
  handleOnSubmit,
}) {
  const [id, setId] = React.useState(subjectId)
  const [description, setDescription] = React.useState(subjectDesc)

  React.useEffect(() => {
    setId(subjectId);
    setDescription(subjectDesc);
  }, [subjectId, subjectDesc]);


  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        handleOnSubmit(id, description)
      }}
      noValidate
      sx={{ mb: 2 }}
    >
      <Typography variant="h5">Create/Update Subject</Typography>
      <TextField
        disabled
        value={id}
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
              value={description}
              id="outlined-required"
              label="Description"
              name="description"
              onChange={(e) => {
                setDescription(e.target.value)
              }}
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
              {id === 0 ? 'Create Subject' : 'Update Subject'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
