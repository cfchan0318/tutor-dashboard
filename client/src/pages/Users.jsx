import * as React from 'react'
import Dashboard from '../Layout/dashboard/dashboard.component'
import { Typography, Button, Box, TextField, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

export default function Users(props) {
  function handleClick() {}

  const [users, setUsers] = React.useState([])
  const token = localStorage.getItem('token')

  const columns = [
    { field: 'username', headerName: 'Username', width: 130, flex: 1 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value),
      flex: 1,
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value),
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <div>
            <Button
              style={{ marginRight: '10px' }}
              variant="contained"
              color="primary"
              onClick={(event) => {
                handleClick(event, cellValues)
              }}
            >
              Update
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={(event) => {
                handleClick(event, cellValues)
              }}
            >
              Remove
            </Button>
          </div>
        )
      },
    },
  ]

  React.useEffect(() => {
    fetch('/api/users', { headers: { Authorization: token } })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
      })
  }, [])

  return (
    <Dashboard headerHandleOnClick={props.loginOnClick}>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h4">Users</Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">Create User</Typography>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs>
            <Box>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Username"
              />
            </Box>
          </Grid>
          <Grid item xs>
            <Box>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Password"
              />
            </Box>
          </Grid>
          <Grid item xs>
            <Box>
              <Button
                style={{ marginRight: '10px' }}
                variant="contained"
                color="primary"
                onClick={(event) => {
                  handleClick(event)
                }}
              >
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      

      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid getRowId={(row) => row.id} rows={users} columns={columns} />
        </div>
      </div>
    </Dashboard>
  )
}
