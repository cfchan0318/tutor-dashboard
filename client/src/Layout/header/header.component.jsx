import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

export default function Header(props) {
  const title = props.title;

  return (
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
      <IconButton
            size="large"
            edge="start"
            color="inherit"
          aria-label="menu"
          onClick={props.toggleDrawer}
            sx={{ mr: 2 }}
        >
        
        <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {title}  
          </Typography>
          <Button color="inherit" onClick={props.handleOnClick}>Logout</Button>
        </Toolbar>
      </AppBar>
  )
}
