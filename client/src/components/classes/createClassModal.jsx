import axios from 'axios'
import * as React from 'react'
import { Button, Box, Typography, Modal } from '@mui/material'

export default function CreateClassModal({
  token,
  open,
  handleOpen,
  handleClose,
}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            新增課堂
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault()
              console.log('submitted')
            }}
            noValidate
            sx={{ mb: 2 }}
          >

            <Box>
              <Button
                type="submit"
                style={{ marginRight: '10px' }}
                variant="contained"
                color="primary"
              >
                新增課堂
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
