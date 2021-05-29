import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ScriptPage from './ScriptPage'

export default function MainAppTabs(props) {
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => setValue(newValue)

  const uniqueTabs = [...new Set(props.scriptArray.map(script => script.tab))]
  return (
    <div className="App">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          {uniqueTabs.map(tab => (
            <Tab key={tab} label={tab} />
          ))}
        </Tabs>
      </AppBar>
      {uniqueTabs.map((tab, index) => (
        <TabPanel value={value} index={index}>
          <ScriptPage
            scriptArray={props.scriptArray.filter(script => script.tab === tab)}
          />
        </TabPanel>
      ))}
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
