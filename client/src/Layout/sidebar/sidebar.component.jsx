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

import { useParams, useNavigate, useLocation } from 'react-router-dom'

export default function Sidebar(props) {
  let navigate = useNavigate()
  const drawerWidth = 240

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        <ListItem onClick={() => navigate('/')} button key="Home">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="主頁" />
        </ListItem>
      </List>
      <Divider />
      <ListItem>
        <Typography variant="subtitle2">課程管理</Typography>
      </ListItem>
      <ListItem onClick={() => navigate('/subjects')} button key="Subjects">
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="科目" />
      </ListItem>
      <Divider />
      <ListItem>
        <Typography variant="subtitle2">學校管理</Typography>
      </ListItem>
      <ListItem onClick={() => navigate('/schools')} button key="Schools">
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="學校" />
      </ListItem>

      <ListItem onClick={() => navigate('/classrooms')} button key="Classrooms">
        <ListItemIcon>
          <RoomIcon />
        </ListItemIcon>
        <ListItemText primary="課室" />
      </ListItem>

      <ListItem onClick={() => navigate('/students')} button key="Students">
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="學生" />
      </ListItem>
      
      <Divider />
      <ListItem>
        <Typography variant="subtitle2">系統管理</Typography>
      </ListItem>
      <ListItem onClick={() => navigate('/users')} button key="Users">
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="用戶" />
      </ListItem>
    </Drawer>
  )
}
