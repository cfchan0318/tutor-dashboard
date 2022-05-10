import * as React from 'react'
import Dashboard from '../Layout/dashboard/dashboard.component'
import { Typography } from '@mui/material'
import axios from 'axios'

export default function Home(props) {
  const [data, setData] = React.useState('asd');
  const token = localStorage.getItem('token')

  React.useEffect(() => {
    
  },[])

  return (
    <Dashboard headerHandleOnClick={props.logoutOnClick}>
      <Typography variant="h3">Home</Typography>
      <Typography>{data}</Typography>
    </Dashboard>
  )
}
