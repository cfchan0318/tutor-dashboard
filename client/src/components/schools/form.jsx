import * as React from 'react'
import { Box, Typography, TextField, Grid, Button } from '@mui/material'

export default function SchoolForm({id,description,setDescription,onSubmit}) {
  React.useEffect(() => {
    console.log("id: "+id + ' desc:' + description)
  }, [id])

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(id, description)
      }}
      noValidate
      sx={{ mb: 2 }}
    >
      <Typography variant="h5">Create/Update School</Typography>
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
              onChange={(e) => {
                setDescription(e.target.value)
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
              {id == undefined ? 'Create school' : 'Update school'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
