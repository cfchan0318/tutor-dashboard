import * as React from 'react'
import Dashboard from '../Layout/dashboard/dashboard.component'
import { Typography } from '@mui/material';

export default function Users(props){
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message))
  }, [])

  return (
    <Dashboard>
      <Typography variant='h3'>Users</Typography>
        <Typography>{data}</Typography>
    </Dashboard>
  )
}