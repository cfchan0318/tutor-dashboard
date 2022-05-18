import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import SchoolIcon from '@mui/icons-material/School'
import RoomIcon from '@mui/icons-material/Room'

import { useNavigate } from 'react-router-dom'

export default function Sidebar({open, toggleDrawer}) {
  let navigate = useNavigate()
  const drawerWidth = 240

  return (
    <Drawer
      
      anchor={'left'}
      open={open}
      onClose={toggleDrawer}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        <ListItem onClick={() => navigate('/')} button key="Home">
          
          <ListItemText primary="主頁" />
        </ListItem>
      </List>
      <Divider />
      

      

      <ListItem onClick={() => navigate('/courses')} button key="Courses">
       
        <ListItemText primary="課程" />
      </ListItem>

      <ListItem onClick={() => navigate('/classes')} button key="Classes">
        
        <ListItemText primary="課堂" />
      </ListItem>

      <Divider />
     
      <ListItem onClick={() => navigate('/schools')} button key="Schools">
        
        <ListItemText primary="學校" />
      </ListItem>

      <ListItem onClick={() => navigate('/classrooms')} button key="Classrooms">
       
        <ListItemText primary="課室" />
      </ListItem>

      <ListItem onClick={() => navigate('/subjects')} button key="Subjects">
        
        <ListItemText primary="科目" />
      </ListItem>
      
      <ListItem onClick={() => navigate('/students')} button key="Students">
        
        <ListItemText primary="學生" />
      </ListItem>
      
      <Divider />
      
      <ListItem onClick={() => navigate('/users')} button key="Users">
        
        <ListItemText primary="用戶" />
      </ListItem>
    </Drawer>
  )
}
