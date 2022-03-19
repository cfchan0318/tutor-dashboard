import * as React from 'react';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function SchoolList({schools,updateOnClick,deleteOnClick}){
   
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
    return(
        <div style={{ display: 'flex', height: '800px' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid getRowId={(schools) => schools.id} rows={schools} columns={columns} />
        </div>
      </div>
    )
}