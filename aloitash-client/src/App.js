import React from 'react'

import MainAppTabs from './components/MainAppTabs'

import { getScriptIndex } from './api'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  async componentDidMount() {
    this.setState({ scriptArray: await getScriptIndex() })
  }

  render() {
    if (this.state.scriptArray) {
      return (
        <MainAppTabs 
          scriptArray={this.state.scriptArray}
        />
      )
    } else {
      return (
        <p>loading...</p>
      )
    }
  }
}

export default App;
