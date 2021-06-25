import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { getUiWireframe } from './api'
import TabPage from './components/TabPage'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: 0
    }
  }

  async componentDidMount() {
    this.setState({ uiWireframe: await getUiWireframe() })
  }

  render() {
    console.log(this.state)
    if (this.state.uiWireframe) {
      return (
        <div className="App">
          <AppBar position="static">
            <Tabs 
              value={this.state.currentTab} 
              onChange={(event, newValue) => {
                this.setState({ currentTab: newValue })
              }}
            >
              {Object.keys(this.state.uiWireframe).map(tab => (
                <Tab key={tab} label={tab} />
              ))}
            </Tabs>
          </AppBar>
          {Object.keys(this.state.uiWireframe).map((tab, index) => (
            <TabPanel value={this.state.currentTab} index={index}>
              <TabPage
                sections={this.state.uiWireframe[tab]}
              />
            </TabPanel>
          ))}
        </div>
      )
    } else {
      return (
        <div className="App">
          <CircularProgress />
        </div>
      )
    }
  }
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

export default App;
