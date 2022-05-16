import * as React from 'react';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function ClassroomList({classrooms,handleUpdateOnClick,handleDeleteOnClick}){
   
    const columns = [
        { field: 'description', headerName: '課室', flex: 1 },
        { field: 'school', headerName: '學校', flex: 1 },
        
        {
          field: 'action',
          headerName: '動作',
          flex: 2,
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
      ]
    return(
        <div style={{ display: 'flex', height: '800px' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid getRowId={(classrooms) => classrooms.id} rows={classrooms} columns={columns} />
        </div>
      </div>
    )
}