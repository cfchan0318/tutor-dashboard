import axios from 'axios'
import * as React from 'react'
import Dashboard from '../Layout/dashboard/dashboard.component'
import { Typography } from '@mui/material'
import StudentList from '../components/students/studentsList'
import StudentForm from '../components/students/studentForm'

export default function Subject(props) {
  //auth
  const token = localStorage.getItem('token')

  return (
    <Dashboard>
      <Typography variant="h4">Students</Typography>
      <Typography variant="h5">Create / Edit Student</Typography>
      <StudentForm />
      <StudentList />
    </Dashboard>
  )
}
