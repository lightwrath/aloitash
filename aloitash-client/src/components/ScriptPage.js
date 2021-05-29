import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import ScriptCard from './ScriptCard'

export default function ScriptPage(props) {
  const uniqueSections = [...new Set(props.scriptArray.map(script => script.section))]
  return (
    <div> 
      {uniqueSections.map(section => (
        <Paper style={paperStyle}>
          <h3>{section}</h3>
          <Grid container spacing={3}>
            {props.scriptArray.map(script => (
              script.section === section &&
                <Grid item xs={12} sm={4}>
                  <ScriptCard
                    script={script}
                  />
                </Grid>
            ))}
          </Grid>
        </Paper>
      ))}
    </div>
  );
}

const paperStyle = {
  marginBottom: '25px'
}
