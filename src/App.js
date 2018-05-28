import React, {Component} from 'react';
import ControlPanel from './components/ControlPanel/ControlPanel.jsx'
import 'bulma/css/bulma.css';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      texts: [{
        font: null,
        color: 'white',
        body: null
      }, {
        font: null,
        color: 'white',
        body: null
      }]
    }
  }

  render() {
    return ( < div className = "App" >
      app <ControlPanel texts = {this.state.texts }/>
       </div>
    );
  }
}

export default App;