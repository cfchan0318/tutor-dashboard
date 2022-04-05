import * as React from 'react'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

export default function studentList({ updateOnClick, deleteOnClick, students }) {
  
  const columns = [
    { field: 'studentNumber', headerName: '學生編號', width: 130, flex: 1 },
    { field: 'name', headerName: '英文名稱', width: 130, flex: 1 },
    { field: 'chineseName', headerName: '中文名稱', width: 130, flex: 1 },
    {
      field: 'createdAt',
      headerName: '建立於',
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value),
      flex: 1,
    },
    {
      field: 'updatedAt',
      headerName: '最後更新',
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value),
      flex: 1,
    },
    {
      field: 'action',
      headerName: '',
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <div>
            <Button
              style={{ marginRight: '10px' }}
              variant="contained"
              color="primary"
              onClick={(event) => {
                updateOnClick(event, cellValues)
              }}
            >
              Update
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={(event) => {
                deleteOnClick(event, cellValues)
              }}
            >
              Remove
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div style={{ display: 'flex', height: '800px' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          getRowId={(students) => students.id}
          rows={students}
          columns={columns}
        />
      </div>
    </div>
  )
}
