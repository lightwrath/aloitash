import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import ScriptCard from './ScriptCard'

export default function TabPage(props) {
  return (
    <div> 
      {Object.keys(props.sections).map(section => (
        <Paper style={paperStyle}>
          <h3>{section}</h3>
          <Grid container spacing={3}>
            {props.sections[section].map(id => (
              <Grid item xs={12} sm={4}>
                <ScriptCard
                  scriptId={id}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}
    </div>
  )
}

const paperStyle = {
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingBottom: '10px',
  marginBottom: '25px'
}
