import * as React from 'react'
import Dashboard from '../Layout/dashboard/dashboard.component'
import { Typography, Button, Box, TextField, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

export default function Users(props) {
  const [id, setId] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [users, setUsers] = React.useState([])
  const token = localStorage.getItem('token')

  function deleteOnClick(event,cellValues) {

   const userId = cellValues.row.id
    deletUser(userId).then(() => {
      alert('user')
      getUsers()
    })
  }

  function updateOnClick(event, cellValues) {
    setId(cellValues.row.id)
    setUsername(cellValues.row.username)
  }

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
                updateOnClick(event, cellValues)
              }}
            >
              Update
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={(event) => {
                deleteOnClick(event, cellValues)
              }}
            >
              Remove
            </Button>
          </div>
        )
      },
    },
  ]

  function getUsers() {
    fetch('/api/users', { headers: { Authorization: token } })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
      })
  }

  async function createUser(username, password) {
    const user = {
      username: username,
      password: password,
    }
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(user),
    }).then(() => {
      return
    })
  }

  async function updateUser(id, username, password) {
    const user = {
      id: id,
      username: username,
      password: password,
    }

    fetch('/api/users/' + user.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(user),
    }).then(() => {
      return
    })
  }

  async function deletUser(id) {
    fetch('/api/users/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then(() => {
      return
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const user = {
      id: id,
      username: data.get('username'),
      password: data.get('password'),
    }

    if (user.id !== '') {
      updateUser(user.id, user.username, user.password).then(() => {
        console.log('user updated')
      })
    } else {
      createUser(user.username, user.password).then(() => {
        getUsers()
      })
    }
  }

  React.useEffect(() => {
    getUsers()
  }, [])

  return (
    <Dashboard headerHandleOnClick={props.logoutOnClick}>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h4">Users</Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mb: 2 }}>
        <Typography variant="h5">Create User</Typography>
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
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
                id="outlined-required"
                label="Username"
                name="username"
              />
            </Box>
          </Grid>
          <Grid item xs>
            <Box>
              <TextField
                required
                fullWidth
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                id="outlined-required"
                label="Password"
                name="password"
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
                {id == '' ? 'Create user' : 'Update User'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <div style={{ display: 'flex', height: '800px' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid getRowId={(row) => row.id} rows={users} columns={columns} />
        </div>
      </div>
    </Dashboard>
  )
}
