import axios from 'axios'
import * as React from 'react'
import Dashboard from '../Layout/dashboard/dashboard.component'
import ClassList from '../components/classes/classList'
import CreateClassModal from '../components/classes/createClassModal'
import { Box, Button, Typography } from '@mui/material'

export default function Class(props) {
  //auth
  const token = localStorage.getItem('token');

  //Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createClasssOnClick = () => {
    handleOpen();
  }

  return (
    <Dashboard>
      <Typography variant="h4" gutterBottom>
        課堂管理
      </Typography>
      <Box>
        <Button
          type="submit"
          style={{ marginRight: '10px' }}
          variant="contained"
          color="primary"
          onClick={createClasssOnClick}
        >
          新增課堂
        </Button>
      </Box>
      <CreateClassModal open={open} handleOpen={handleOpen} handleClose={handleClose} keepMounted/>
      <ClassList classes={[]}/>
    </Dashboard>
  )
}
