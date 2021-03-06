import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import SettingsIcon from '@material-ui/icons/Settings'

import CardHeader from './CardHeader'
import RunButton from './RunButton'
import LogButton from './LogButton'
import { getScriptById, execute, getLogStream } from '../api'

export default function ScriptCard(props) {
  const [script, setScript] = useState()
  const [logs, setLogs] = useState("")

  useEffect(async () => {
    await initialiseScriptState()
  }, [])

  async function initialiseScriptState() {
    const scriptData = await getScriptById(props.scriptId)
    setScript(scriptData)
    if (scriptData.isRunning) {
      await getLogStream(scriptData.id, (latestLog) => {
        setLogs(logs => logs + latestLog)
      })
      setScript(prevState => ({ ...prevState, isRunning: !prevState.isRunning }))
    }
  }

  const handleRun = async () => {
    setScript(prevState => ({ ...prevState, isRunning: !prevState.isRunning }))
    await execute(script.id)
    await getLogStream(script.id, (latestLog) => {
      setLogs(logs => logs + latestLog)
    })
    setScript(prevState => ({ ...prevState, isRunning: !prevState.isRunning }))
  }

  if (script) {
    return (
      <Card style={{ padding: '25px'}}>
        <CardHeader
          icon={script.icon}
          text={script.name}
          hoverText={script.id}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <RunButton
              isRunning={script.isRunning}
              onClick={handleRun}
            />
          </Grid>
          <Grid item xs={4}>
            <LogButton
              logStream={logs}
            />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained">
              <SettingsIcon />
            </Button>
          </Grid>
        </Grid>
      </Card>
    )
  } else {
    return (
      <CircularProgress />
    )
  }
}
