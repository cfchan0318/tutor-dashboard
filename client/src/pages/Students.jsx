import * as React from 'react'
import Dashboard from '../Layout/dashboard/dashboard.component'
import { Box, Typography, Link } from '@mui/material'
import StudentList from '../components/students/studentsList'
import StudentForm from '../components/students/studentForm'

export default function Student(props) {
  //auth
  const token = localStorage.getItem('token')
  const [isFormDisplay, setIsFormDisplay] = React.useState(false)

  return (
    <Dashboard>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h4">學生</Typography>
        {isFormDisplay ? (
          <StudentForm token={token} />
        ) : (
          <Link
            href="#"
            underline="hover"
            onClick={() => setIsFormDisplay(true)}
          >
            +新增學生
          </Link>
        )}
      </Box>

      <StudentList students={[]} />
    </Dashboard>
  )
}
