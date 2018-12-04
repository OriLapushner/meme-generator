import React, { Component } from "react";
import ControlPanel from "./components/ControlPanel/ControlPanel.jsx";
import CanvasContainer from "./components/CanvasContainer/CanvasContainer";
import imgsSrcList from './services/imgsService'
import "./App.css";

// google key to web fonts: AIzaSyAERA7bb7EV8f4WUekp3-jaA4CrccIz6VY
function generateId() {
  return Math.floor(Math.random() * 1000000);
}

function Text(placeholder,font){
  //text constructor
  this.id = generateId()
  this.font = "Arial",
  this.fontSize = "30"
  this.color = "black",
  this.body = "",
  this.placeholder = placeholder || "new text" ,
  this.colorPickerDisplayed = false
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasHeight: 0,
      texts: [
        new Text("text 1"),
        new Text("text 2")
      ],
      imgsSrcs: imgsSrcList
    };
  }
  colorChangedHandler = (color,id) => {
    this.updateTextProps(id,{color})
    this.canvasRef.clearCanvas(this.canvasRef.drawingCanvas.current,this.state.texts)
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
        var colorPickerPathed =  e.path.findIndex(element =>{
          if(element.classList){
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
  }
  fontSizeChangedHandler = (val,id) => {
    this.setState(state => {
      var newTexts = [...state.texts]
      var textToUpdate = newTexts.find(text => text.id === id)
      textToUpdate.fontSize = val
      this.canvasRef.clearCanvas(this.canvasRef.drawingCanvas.current)
      this.canvasRef.drawTexts(this.canvasRef.drawingCanvas.current,newTexts)
      return {...state,newTexts}
    })
  }
  updateTextProps = (id,newTextProps) => {
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
      this.canvasRef.clearCanvas(this.canvasRef.drawingCanvas.current)
      this.canvasRef.drawTexts(this.canvasRef.drawingCanvas.current,newTexts)
      return {
        ...state,
        texts:[...newTexts],
      }
    })
  }
  addTextHandler = () => {
    this.setState(state => {
      var newTexts = [...state.texts, new Text()];
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
      <h3 className="instruction-text">you can upload an image by dragging it to the screen</h3>
        <CanvasContainer
          texts={this.state.texts}
          updateTextBoxStyle={this.updateTextBoxStyle}
          getRef={ref => this.canvasRef = ref}
        />
        <ControlPanel
          imgsSrcs={this.state.imgsSrcs}
          colorChangedHandler={this.colorChangedHandler}
          updateTextProps={this.updateTextProps}        
          updateTextBody={this.updateTextBody}
          fontSizeChangedHandler={this.fontSizeChangedHandler}
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
