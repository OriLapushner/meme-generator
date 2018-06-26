import React, { Component } from "react";
import ControlPanel from "./components/ControlPanel/ControlPanel.jsx";
import CanvasContainer from "./components/CanvasContainer/CanvasContainer";
import "./App.css";
import "bulma/css/bulma.css";

function generateId() {
  return Math.floor(Math.random() * 1000000);
}
const textTemplate = {
  id: generateId(),
  font: null,
  color: "white",
  body: null,
  placeholder: "new text",
  style: {
    width: 0,
    height: 50
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasHeight: 0,
      texts: [
        {
          id: generateId(),
          font: null,
          color: "white",
          body: null,
          placeholder: "text 1",
          style: {
            width: 0,
            height: 50
          }
        },
        {
          id: generateId(),
          font: null,
          color: "white",
          body: null,
          placeholder: "text 2",
          style: {
            width: 0,
            height: 50,
            top: 350
          }
        }
      ]
    };
  }
  updateTextBody = (e,id) => {
    var val = e.target.value
    this.setState(state => {
      var idx = state.texts.findIndex((text) => id === text.id)
      var newTexts = [...state.texts]
      newTexts[idx].body = val
      return {
        ...state,
        texts:[...newTexts],
      }
    })
  }
  addTextHandler = () => {
    this.setState(state => {
      var newTexts = [...state.texts, textTemplate];
      return { texts: newTexts };
    });
  };
  updateTextBoxStyle = (id, stylesToUpdate) => {
    this.setState(state => {
      var idxToUpdate = state.texts.findIndex(text => id === text.id);
      var newStyle = { ...state.texts[idxToUpdate].style };
      for (var style in stylesToUpdate) {
        newStyle[style] = stylesToUpdate[style];
      }
      console.log(newStyle);
      var newTexts = [...state.texts];
      newTexts[idxToUpdate].style = newStyle
      return {...state,
      texts:newTexts};
    });
  };
  updateAllTextBoxStyle = stylesToUpdate => {
    this.setState(state => {
      var newTexts = state.texts.map(text => {
        var newStyle = { ...text.style };
        for (var style in stylesToUpdate) {
          newStyle[style] = stylesToUpdate[style];
        }
        text.style = newStyle;
        console.log(newStyle);
        return text;
      });
      return { texts: newTexts };
    });
  };
  render() {
    return (
      <div className="App">
        <CanvasContainer
          uploadImgHandler={this.uploadImgHandler}
          texts={this.state.texts}
          updateAllTextBoxStyle={this.updateAllTextBoxStyle}
          updateTextBoxStyle={this.updateTextBoxStyle}
        />
        <ControlPanel
          updateTextBody={this.updateTextBody}
          texts={this.state.texts}
          addTextHandler={this.addTextHandler}
        />
      </div>
    );
  }
}

export default App;
