import React, { useState, useEffect, useRef, fragment } from 'react'
import Modal from '@material-ui/core/Modal'
import Toolbar from '@material-ui/core/Toolbar'
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import NotesIcon from '@material-ui/icons/Notes'

export default function RunButton(props) {
  const [open, setOpen] = useState(false)

  const logEndRef = useRef(null)

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [props])

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
        <Card
          style={{
            margin: '5%',
            width: '90%',
            height: '90%',
            display: 'flex',
            flexFlow: 'column'
          }}
        >
          <Toolbar>
            <Button
              onClick={() => {
                setOpen(false)
              }}
            >
              Close
            </Button>
          </Toolbar>
          <Paper
            style={{
              whiteSpace: 'pre-wrap',
              overflowY: 'auto',
            }}
          >
            {props.logStream}
            <div 
              ref={logEndRef}
            >
            </div>
          </Paper>
        </Card>
      </Modal>
    </>
  )
}
