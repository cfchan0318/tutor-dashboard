import * as React from 'react'
import { Box,  TextField, Grid, Button } from '@mui/material'

export default function SchoolForm({id,schoolDesc,onSubmit}) {
  const [description, setDescription] = React.useState('')

  React.useEffect(() => {
    id === 0 ? setDescription('') : setDescription(schoolDesc);
  }, [id])

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        setDescription('');
        onSubmit(id, description)
      }}
      noValidate
      sx={{ mb: 2 }}
    >
      
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
              {id === 0 ? '建立學校' : '更新學校'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
