import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import SettingsIcon from '@material-ui/icons/Settings'
import NotesIcon from '@material-ui/icons/Notes'

import { execute } from '../api'

export default function ScriptCard(props) {
  return (
    <Card style={{ padding: '25px'}}>
      <div style={{ height: '100px', width: '100%' }}>
        <img src={props.script.icon} title={props.script.id} style={{ margin: 'auto', width: '100px' }} />
      </div>
      <h4>{props.script.name}</h4>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button 
            variant="contained"
            onClick={async () => {
              await execute(props.script.id)
            }}
          >
            <PlayArrowIcon />
          </Button>
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
