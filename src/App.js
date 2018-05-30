import React, {Component} from 'react';
import ControlPanel from './components/ControlPanel/ControlPanel.jsx'
import CanvasContainer from './components/CanvasContainer/CanvasContainer'
import './App.css'
import 'bulma/css/bulma.css';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      texts: [{
        font: null,
        color: 'white',
        body: null,
        placeholder: 'top text'
      }, {
        font: null,
        color: 'white',
        body: null,
        placeholder: 'bottom text'
      }]
    }
  }
  addTextHandler = () => {
    this.setState( state => {
     var newTexts = [...state.texts,
       { font:null,
        color:'white',
        body:null,
        placeholder: 'new text'}]
       
      return {texts:newTexts}
    })
  }
  render() {
    return ( < div className = "App" >
    <CanvasContainer uploadImgHandler={this.uploadImgHandler}/>
      app <ControlPanel texts = {this.state.texts }
       addTextHandler={this.addTextHandler}/>
       </div>
    );
  }
}

export default App;