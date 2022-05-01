import * as React from 'react'
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

export default function ClassList({
  classes,
  courses,
  classrooms,
  handleUpdateOnClick,
  handleDeleteOnClick,
}) {
  const columns = [
    { field: 'course', headerName: '課程', flex: 1 },
    { field: 'classroom', headerName: '班房', flex: 1 },
    { field: 'fromDateTime', headerName: '開始於', flex: 1 },
    { field: 'toDateTime', headerName: '結束於', flex: 1 },
    { field: 'maxCapacity', headerName: '人數', flex: 1 },
    {
      field: 'action',
      headerName: '動作',
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <div>
            <Button
              style={{ marginRight: '10px' }}
              variant="contained"
              color="primary"
              onClick={(event) => {
                handleUpdateOnClick(event, cellValues)
              }}
            >
              更新
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={(event) => {
                handleDeleteOnClick(event, cellValues)
              }}
            >
              移除
            </Button>
          </div>
        )
      },
    },
  ];

  const setUpClassList = () => { 
    if (courses.length > 0 && classrooms.length>0) {
      classes.forEach(Class => {
        Class.course = courses.filter(course => course.id === Class.courseId)[0].description;
        Class.classroom = classrooms.filter(classroom => classroom.id === Class.classroomId)[0].description;
      });
    }
    console.log(classes);
  }
  React.useEffect(() => { 
    setUpClassList()
  },[courses,classrooms,classes]);

  return (
    <div style={{ display: 'flex', height: '800px' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          getRowId={(classes) => classes.id}
          rows={classes}
          columns={columns}
        />
      </div>
    </div>
  )
}
