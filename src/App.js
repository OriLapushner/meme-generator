import React, { Component } from "react";
import ControlPanel from "./components/ControlPanel/ControlPanel.jsx";
import CanvasContainer from "./components/CanvasContainer/CanvasContainer";
import "./App.css";
import "bulma/css/bulma.css";

function generateId() {
  return Math.floor(Math.random() * 1000000);
}

function Text(placeholder){
  this.id = generateId()
  this.font = null,
  this.color = "black",
  this.body = "",
  this.placeholder = placeholder || "new text" ,
  this.colorPickerDisplayed = false,
  this.style = {
    width: 0,
    height: 50,
    top:0,
    left:0
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasHeight: 0,
      texts: [
        new Text("text 1"),
        new Text("text 2")
      ]
    };
  }
  colorChangedHandler = (color,id) => {
    this.updateTextProps(id,{color})
    this.canvasRef.drawTexts(this.canvasRef.drawingCanvas.current,this.state.texts)
  }
  colorPickerClickedHandler = (id) => {
    var isColorPickerDisplayed = this.state.texts.find( text => text.id === id).colorPickerDisplayed
    if(isColorPickerDisplayed){
      this.updateTextProps(id,{colorPickerDisplayed:false})
      return
    } else {
      this.updateTextProps(id,{colorPickerDisplayed:true})
      document.onmousedown = (e) => {
        // console.log(e)
        // console.log(this.updateTextProps)
        var colorPickerPathed =  e.path.findIndex(element =>{
          if(element.classList){
            // console.log(element.classList[0] === "color-picker-container")
            return element.classList[0] === "color-picker-container" ||
             element.classList[0] === "txt-color-button"
          } else return false
        }) 
        if(colorPickerPathed !== -1){
          return;
        }
         else {
           document.onmousedown = null
            this.updateTextProps(id,{colorPickerDisplayed:false})
         }
      }
    }
    // this.updateTextProps(id,{colorPickerDisplayed:!this.state.colorPickerDisplayed})
  }
  updateTextProps = (id,newTextProps) => {
    // console.log('update text')
    this.setState(state => {
      var idx = state.texts.findIndex( text => text.id === id)
    var newTexts = [...state.texts]
    for(var prop in newTextProps){
      newTexts[idx][prop] = newTextProps[prop]
    }
    return {
      ...state,
      texts:newTexts
    }
  })  
  }
  updateTextBody = (e,id) => {
    var val = e.target.value
    this.setState(state => {
      var idx = state.texts.findIndex(text => id === text.id)
      var newTexts = [...state.texts]
      newTexts[idx].body = val
      return {
        ...state,
        texts:[...newTexts],
      }
    })
    var textToUpdate = this.state.texts.find( text => text.id === id)
    var textsToUpdate = this.state.texts.filter(text => text.id !== id)
    this.canvasRef.clearCanvas(this.canvasRef.drawingCanvas.current)
    this.canvasRef.drawTexts(this.canvasRef.drawingCanvas.current,textsToUpdate)
    this.canvasRef.drawText(this.canvasRef.drawingCanvas.current,textToUpdate,val)
  }
  addTextHandler = () => {
    this.setState(state => {
      var newTexts = [...state.texts, new Text()];
      return { texts: newTexts };
    });
  };
  updateTextBoxStyle = (id, stylesToUpdate) => {
    // var newText = {...this.state.texts[idx].style}
    // var newTexts = [...this.state.text]
    // newText[idx] = newText
    // this.setState({texts:newTexts})

    this.setState(state => {
      var idxToUpdate = state.texts.findIndex(text => id === text.id);
      var newStyle = { ...state.texts[idxToUpdate].style };
      for (var style in stylesToUpdate) {
        newStyle[style] = stylesToUpdate[style];
      }
      // console.log(newStyle);
      var newTexts = [...state.texts];
      newTexts[idxToUpdate].style = newStyle
      return {...state,
      texts:newTexts};
    });
    this.canvasRef.clearCanvas(this.canvasRef.drawingCanvas.current)
    this.canvasRef.drawTexts(this.canvasRef.drawingCanvas.current,this.state.texts)
  }
  saveImg = () => {
    this.canvasRef.drawTexts(this.canvasRef.canvas.current,this.state.texts)
    var dataURL = this.canvasRef.canvas.current.toDataURL('image/jpeg',1)
    var link = document.createElement('a');
    link.setAttribute('href', dataURL);
    link.setAttribute('download', 'meme.jpeg');
    link.setAttribute('target', '_blank');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  onDragHandler = (e) => {
    //prevents default browser drag file behaviour
    e.preventDefault()
  }
  onDropHandler = (e) => {
    //prevents default browser drag file behaviour and handles file upload
    var file = e.dataTransfer.items[0].getAsFile()
      this.canvasRef.getImgHandler(null,file)
    e.preventDefault()
  }
  render() {
    return (
      <div className="App" onDragOver={this.onDragHandler} onDrop={this.onDropHandler}>
        <CanvasContainer
          texts={this.state.texts}
          updateTextBoxStyle={this.updateTextBoxStyle}
          getRef={ref => this.canvasRef = ref}
        />
        <ControlPanel
          colorChangedHandler={this.colorChangedHandler}
          updateTextProps={this.updateTextProps}        
          updateTextBody={this.updateTextBody}
          texts={this.state.texts}
          addTextHandler={this.addTextHandler}
          saveImg={this.saveImg}
          colorPickerClickedHandler={this.colorPickerClickedHandler}
        />
      </div>
    );
  }
}

export default App;
