import React, { fragment } from 'react'
import Button from '@material-ui/core/Button'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'

export default function RunButton(props) {
  return (
    <Button 
      variant="contained"
      color={props.isRunning ? "secondary" : "default"}
      onClick={props.onClick}
    >
      {props.isRunning ? (
        <StopIcon />
      ) : (
        <PlayArrowIcon />
      )}
    </Button>
  )
}
