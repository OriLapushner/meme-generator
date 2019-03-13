import React, { Component } from "react";
import ControlPanel from "./components/ControlPanel/ControlPanel.jsx";
import CanvasContainer from "./components/CanvasContainer/CanvasContainer";
import ToolTip from './components/ToolTip/ToolTip'
import fontList from './services/fontService'

import imgsSrcList from './services/imgsService'
import dragAndDropService from "./services/dragAndDropService"
import "./App.css";

function generateId() {
  return Math.floor(Math.random() * 1000000);
}

function Text(placeholder,font){
  //text constructor
  this.id = generateId()
  this.font = "Arial"
  this.fontSize = "30"
  this.color = "black"
  this.body = ""
  this.placeholder = placeholder || "new text" 
  this.colorPickerDisplayed = false
  this.isSelected = false;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texts: [
        new Text("text 1"),
        new Text("text 2")
      ],
      imgsSrcs: imgsSrcList,
      imgsToDisplay: [imgsSrcList[0],imgsSrcList[1],imgsSrcList[2]], 
      imgsToDisplayIdxs: [0,1,2]
    };
  }
  fontChangedHandler = (id, val) => {
    this.setState((state) => {
      var newTexts = [...state.texts]
      var textToUpdate = newTexts.find(text => text.id === id)
      textToUpdate.font = val
      this.canvasRef.clearCanvas(this.canvasRef.drawingCanvas.current)
      this.canvasRef.drawTexts(this.canvasRef.drawingCanvas.current,newTexts)
      return {newTexts}     
    })    
  }
  updateDisplayedImgs = val => {
    this.setState(state => {
      var imgsToDisplay = []
      var imgsToDisplayIdxs = []
      state.imgsToDisplayIdxs.forEach(idx => {
        var newIdx = idx + val
        newIdx = newIdx > state.imgsSrcs.length - 1 ? 0  : newIdx
        newIdx = newIdx < 0 ? state.imgsSrcs.length + val : newIdx
        imgsToDisplayIdxs.push(newIdx)
        imgsToDisplay.push(state.imgsSrcs[newIdx])
      })
      return {
        imgsToDisplay,
        imgsToDisplayIdxs
      }
    })     
  }
  updateSelected = (id,val) => {
    this.setState(state => {
      var newTexts = [...state.texts]
      var textToUpdate = newTexts.find(text => text.id === id)
      textToUpdate
      this.canvasRef.clearCanvas(this.canvasRef.drawingCanvas.current)
      this.canvasRef.drawTexts(this.canvasRef.drawingCanvas.current,newTexts)
    })
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
      return {newTexts}
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
      texts:newTexts
    }
  })  
  }
  updateTextBody = (id,e) => {
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
    var newText = new Text()
    this.setState(state => {
      var newTexts = [...state.texts, newText];
      return {...state, texts: newTexts };
    },dragAndDropService.addTextPosition(newText.id,0,0));
  };
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
  fireInputClickEvent = () => {
    this.canvasRef.fileInput.current.click();
  }
  deleteText = (id) => {
    this.setState(state => {
      var newTexts = state.texts.slice()
      var idx = state.texts.findIndex(text => id === text.id)
      newTexts.splice(idx,1)
      return {texts:newTexts}
    },function(){
      dragAndDropService.deleteTextPosition(id)
    })
  }
  initDragableDivs = () => {
    this.setState(state => {
      return {...state,texts:[new Text("top text"),new Text("bottom text")]}
    },function(){
      dragAndDropService.deleteAllTextPositions()
      var textBox1 = document.querySelector("#drag" + this.state.texts[0].id);
      var textBox2 = document.querySelector("#drag" + this.state.texts[1].id);
      textBox1.style.width = this.canvasRef.drawingCanvas.current.width / 2 + "px";
      textBox2.style.width = this.canvasRef.drawingCanvas.current.width / 2 + "px";
      var xpos = this.canvasRef.drawingCanvas.current.width / 2 - textBox1.offsetWidth / 2;
      var ypos = this.canvasRef.drawingCanvas.current.height - textBox1.offsetHeight;
      dragAndDropService.addTextPosition(this.state.texts[0].id, xpos, 0)
      dragAndDropService.addTextPosition(this.state.texts[1].id, xpos, ypos)
      dragAndDropService.setTextPosition(this.state.texts[0].id, xpos, 0);
      dragAndDropService.setTextPosition(this.state.texts[1].id, xpos, ypos);
    })
    //sets 2 text divs dragables at center bottom and top

  };
  render() {
    return (
      <div className="App" onDragOver={this.onDragHandler} onDrop={this.onDropHandler}>
          <ToolTip/>
          <CanvasContainer
          updateSelected={this.updateSelected}
          initDragableDivs={this.initDragableDivs}
          texts={this.state.texts}
          getRef={ref => this.canvasRef = ref}
        />
        <ControlPanel
          fontChangedHandler={this.fontChangedHandler}
          updateDisplayedImgs={this.updateDisplayedImgs}
          imgs={this.state.imgsToDisplay}
          updateSelected={this.updateSelected}
          fontList={fontList}
          deleteText={this.deleteText}
          fireInputClickEvent={this.fireInputClickEvent}
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
