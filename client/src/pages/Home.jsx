import * as React from 'react'
import Dashboard from '../Layout/dashboard/dashboard.component'
import { Typography } from '@mui/material'
import axios from 'axios'
import Scheduler from "react-mui-scheduler"

export default function Home(props) {
  const token = localStorage.getItem('token');

  const [state] = React.useState({
    options: {
      transitionMode: "zoom", // or fade
      startWeekOn: "mon",     // or sun
      defaultMode: "day",    // or week | day | timeline
      minWidth: '100%',
      maxWidth: '100%',
      minHeight: '80vh',
      maxHeight: '80vh'
    },
    toolbarProps: {
      showSwitchModeButtons: false,
      showDatePicker: false
    }
  })
  
  const events = [
    {
      id: "event-1",
      label: "Medical consultation",
      groupLabel: "Dr Shaun Murphy",
      user: "Dr Shaun Murphy",
      color: "",
      startHour: "04:00 AM",
      endHour: "05:00 AM",
      date: "2022-05-05",
      createdAt: new Date(),
      createdBy: "Kristina Mayer"
    },
    {
      id: "event-2",
      label: "Medical consultation",
      groupLabel: "Dr Claire Brown",
      user: "Dr Claire Brown",
      color: "#099ce5",
      startHour: "09:00 AM",
      endHour: "10:00 AM",
      date: "2022-05-09",
      createdAt: new Date(),
      createdBy: "Kristina Mayer"
    },
    {
      id: "event-3",
      label: "Medical consultation",
      groupLabel: "Dr Menlendez Hary",
      user: "Dr Menlendez Hary",
      color: "#263686",
      startHour: "13 PM",
      endHour: "14 PM",
      date: "2022-05-10",
      createdAt: new Date(),
      createdBy: "Kristina Mayer"
    },
    {
      id: "event-4",
      label: "Consultation prénatale",
      groupLabel: "Dr Shaun Murphy",
      user: "Dr Shaun Murphy",
      color: "#f28f6a",
      startHour: "08:00 AM",
      endHour: "09:00 AM",
      date: "2022-05-11",
      createdAt: new Date(),
      createdBy: "Kristina Mayer"
    }
  ]
  
  const handleCellClick = (event, row, day) => {
    // Do something...
  
  }
  
  const handleEventClick = (event, item) => {
    // Do something...
  }
  
  const handleEventsChange = (item) => {
    // Do something...
  }
  
  const handleAlertCloseButtonClicked = (item) => {
    // Do something...
  }
  React.useEffect(() => {
    
  },[])

  return (
    <Dashboard headerHandleOnClick={props.logoutOnClick}>
      <Typography variant="h3">Home</Typography>
      <Scheduler
      locale="en"
      events={events}
      legacyStyle={true}
      options={state?.options}
      
      toolbarProps={state?.toolbarProps}
      onEventsChange={handleEventsChange}
      onCellClick={handleCellClick}
      onTaskClick={handleEventClick}
      onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
    />
    </Dashboard>
  )
}
