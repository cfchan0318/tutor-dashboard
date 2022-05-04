import * as React from 'react';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function SubjectList({subjects,handleUpdateOnClick,handleDeleteOnClick}){

    //handleUpdateOnClick(event, cellValues)
    //handleDeleteOnClick(event, cellValues)
    const columns = [
        { field: 'description', headerName: 'Description', width: 130, flex: 1 },
        {
          field: 'createdAt',
          headerName: 'Created At',
          type: 'dateTime',
          valueGetter: ({ value }) => value && new Date(value),
          flex: 1,
        },
        {
          field: 'updatedAt',
          headerName: 'Updated At',
          type: 'dateTime',
          valueGetter: ({ value }) => value && new Date(value),
          flex: 1,
        },
        {
          field: 'action',
          headerName: 'Action',
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
          <DataGrid getRowId={(subjects) => subjects.id} rows={subjects} columns={columns} />
        </div>
      </div>
    )
}