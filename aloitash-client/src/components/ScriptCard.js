import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import SettingsIcon from '@material-ui/icons/Settings'
import NotesIcon from '@material-ui/icons/Notes'

import { execute, streamStdoutFrom } from '../api'

export default function ScriptCard(props) {
  const [isScriptRunning, setIsScriptRunning] = useState(props.script.runtime)

  const runScript = async () => {
    setIsScriptRunning(true)
    await execute(props.script.id)
    await streamStdoutFrom(props.script.id)
    setIsScriptRunning(false)
  }

  return (
    <Card style={{ padding: '25px'}}>
      <div style={{ height: '100px', width: '100%' }}>
        <img src={props.script.icon} title={props.script.id} style={{ margin: 'auto', width: '100px' }} />
      </div>
      <h4>{props.script.name}</h4>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {isScriptRunning ? (
            <Button 
              variant="contained"
              color="secondary"
              onClick={async () => {
                //await kill(props.script.id)
              }}
            >
              <StopIcon />
            </Button>
          ) : (
            <Button 
              variant="contained"
              onClick={runScript}
            >
              <PlayArrowIcon />
            </Button>
          )}
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained">
            <NotesIcon />
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained">
            <SettingsIcon />
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}
