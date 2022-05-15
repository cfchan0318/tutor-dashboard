import * as React from 'react'
import Dashboard from '../Layout/dashboard/dashboard.component'
import UserModal from '../components/users/UserModal'
import { Typography, Button, Box, TextField, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

export default function Users(props) {
  const [id, setId] = React.useState(0)

  const [users, setUsers] = React.useState([])
  const token = localStorage.getItem('token')

  //CreateUserModal
  const [open, setOpen] = React.useState(false)

  function deleteOnClick(event, cellValues) {
    const userId = cellValues.row.id
    deletUser(userId).then(() => {
      getUsers()
    })
  }

  function updateOnClick(event, cellValues) {
    setId(cellValues.row.id);
    setOpen(true);
  }

  const columns = [
    { field: 'username', headerName: '用戶名稱', width: 130, flex: 1 },
    {
      field: 'action',
      headerName: '動作',
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

  React.useEffect(() => {
    getUsers()
  }, [])

  return (
    <Dashboard headerHandleOnClick={props.logoutOnClick}>
      <Box sx={{ mb: 1 }}>
        <Box display="flex" justifyContent="flex-start">
          <Typography variant="h4" sx={{ pr: '10px' }}>
            用戶
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setId(0);
              setOpen(true)
            }}
          >
            新增用戶
          </Button>
        </Box>
        <UserModal
          open={open}
          userId={id}
          handleClose={() => {
            setOpen(false);
            getUsers();
          }}
          token={token}
        />
      </Box>

      <div style={{ display: 'flex', height: '800px' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid getRowId={(row) => row.id} rows={users} columns={columns} />
        </div>
      </div>
    </Dashboard>
  )
}
