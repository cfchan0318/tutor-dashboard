import React from 'react'
import { Modal, Box, TextField, Grid, Button, Typography } from '@mui/material'
import axios from 'axios'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 300,
  bgcolor: 'background.paper',
  p: 4,
}

const UserModal = ({ open, handleClose, userId, token }) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  async function getUserById(id) { 
    let response = await axios.get('/api/users/' + parseInt(id), { headers: { Authorization: token } })
    return response.data;
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const user = {
      id: userId,
      username: data.get('username'),
      password: data.get('password'),
    }

    if (user.id !== 0) {
      user.username = username;
      updateUser(user.id, user.username, user.password).then(() => {
        handleClose()
      })
    } else {
      createUser(user.username, user.password).then(() => {
        handleClose()
      })
    }
  }

  React.useEffect(() => {
    if (userId !== 0) { 
      getUserById(userId)
        .then(user => {
          console.log(user);
          setUsername(user.username);
        });
    } else {
      setUsername('');
      setPassword('')
    }
  },[userId])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ mb: 2 }}>
          <Typography variant='h4'>
            {userId === 0 ? '新增用戶' : '更新用戶'}
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mb: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box>
                { userId === 0? <TextField
                  required
                  fullWidth
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                  id="outlined-required"
                  label="用戶名稱"
                  name="username"
                /> :
                <Typography variant='body1'>
                  用戶名稱: {username}
                </Typography>
                }
                
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <TextField
                  required
                  fullWidth
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  id="outlined-required"
                  label="密碼"
                  name="password"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Button
                  type="submit"
                  style={{ marginRight: '10px' }}
                  variant="contained"
                  color="primary"
                >
                  {userId === 0 ? '新增用戶' : '更新用戶'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  )
}

export default UserModal
