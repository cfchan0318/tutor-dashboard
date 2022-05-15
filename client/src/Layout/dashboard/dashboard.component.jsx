import React from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar';
import Header from '../header/header.component'
import Sidebar from '../sidebar/sidebar.component'

export default function Dashboard(props) {
  const sidebarWidth = 240
  const title = "Miss Chan Education"

  const [open, setOpen] = React.useState(false);
  
  return (
    <Box sx={{ display: 'flex' }}>
      <Header
        title={title}
        handleOnClick={props.headerHandleOnClick}
        toggleDrawer={() => { setOpen(true)}}
      />

      <Sidebar
        width={sidebarWidth}
        open={open}
        toggleDrawer={() =>{setOpen(false)} } />
      
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  )
}
