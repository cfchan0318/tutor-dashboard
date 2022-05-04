import * as React from 'react';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


export default function CourseList({courses,handleUpdateOnClick,handleDeleteOnClick}){
  

    const columns = [
        { field: 'description', headerName: '課程名稱', width: 130, flex: 1 },
        {
          field: 'createdAt',
          headerName: '新增於',
          type: 'dateTime',
          valueGetter: ({ value }) => value && new Date(value),
          flex: 1,
        },
        {
          field: 'updatedAt',
          headerName: '最後更新於',
          type: 'dateTime',
          valueGetter: ({ value }) => value && new Date(value),
          flex: 1,
        },
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
                  Update
                </Button>
    
                <Button
                  variant="contained"
                  color="error"
                  onClick={(event) => {
                    handleDeleteOnClick(event, cellValues)
                  }}
                >
                  Remove
                </Button>
              </div>
            )
          },
        },
  ]
  
    return(
        <div style={{ display: 'flex', height: '800px' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid getRowId={(courses) => courses.id} rows={courses} columns={columns} />
        </div>
      </div>
    )
}