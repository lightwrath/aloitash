import React, { useState, fragment } from 'react'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import NotesIcon from '@material-ui/icons/Notes'

export default function RunButton(props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button 
        variant="contained"
        onClick={() => {
          setOpen(true)
        }}
      >
        <NotesIcon />
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <Paper
          style={{
            margin: '5%',
            width: '90%',
            height: '90%',
            whiteSpace: 'pre-wrap',
            overflow: 'scroll'
          }}
        >
          <Button
            onClick={() => {
              setOpen(false)
            }}
          >
            Close
          </Button>
          {props.logStream}
        </Paper>
      </Modal>
    </>
  )
}
