import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { useNavigate } from 'react-router-dom'

const theme = createTheme()

export default function SignIn() {
  const navigate = useNavigate()

  async function setlocalStorage(token, IsLoggedIn) {
    localStorage.setItem('token', 'Bearer ' + token)
    localStorage.setItem('IsLoggedIn', IsLoggedIn)
  }

  async function login(username, password) {
    const authDetails = {
      username: username,
      password: password,
    }

    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authDetails),
    })
      .then((response) => {
        if (response.status === 401) {
          console.log(response.json().message)
        }
        return response.json()
      })
      .then((data) => {
        //console.log(data.token);

        setlocalStorage(data.token, true).then(() => navigate('/'))
      })
      .catch((err) => console.log(err))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    login(data.get('username'), data.get('password'))
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            Miss Chan Education
          </Typography>

          <Typography component="h2" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
