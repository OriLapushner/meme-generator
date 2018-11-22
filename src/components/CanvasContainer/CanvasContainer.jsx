import React, { Component } from "react";
import DragableDivs from "../DragableDivs/DragableDivs";
import "./CanvasContainer.css";

import canvasService from "../../services/canvasService";
import dragAndDropService from "../../services/dragAndDropService";

class CanvasContainer extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.img = React.createRef();
    this.canvas = React.createRef();
    this.drawingCanvas = React.createRef();
    this.state = {
      imgSrc: null
    };
  }
  componentDidMount() {
    this.props.getRef(this);
    dragAndDropService.setTextChangeHandler(() => {
      this.clearCanvas(this.drawingCanvas.current);
      this.drawTexts(this.drawingCanvas.current,this.props.texts)
    });
    canvasService.setMainCanvas(this.canvas.current);
    canvasService.setDrawingCanvas(this.drawingCanvas.current);
    canvasService.setdrawImgHandler(this.initDivs)
  }
  initDivs = () => {
    //sets text divs dragables at center bottom and top
    var textBox1 = document.querySelector("#drag" + this.props.texts[0].id)
    var textBox2 = document.querySelector("#drag" + this.props.texts[1].id)
    textBox1.style.width = this.drawingCanvas.current.width / 2 + "px"
    textBox2.style.width = this.drawingCanvas.current.width / 2 + "px"
    var xpos = this.drawingCanvas.current.width/2 - textBox1.offsetWidth/2 
    var ypos = this.drawingCanvas.current.height - textBox1.offsetHeight
    
    dragAndDropService.setTextPosition(this.props.texts[0].id,xpos,0)
    dragAndDropService.setTextPosition(this.props.texts[1].id,xpos,ypos)
    // console.log(this.drawingCanvas.current.width)
    // dragAndDropService.setTextPosition(id2,30,30)
    
  }
  componentWillUnmount() {
    this.props.ref(null);
  }
  clearCanvas(canvas) {
    canvasService.clearCanvas(canvas);
  }
  drawTexts = (canvas, texts) => {
    canvasService.drawTexts(canvas, texts);
  };
  getImgHandler = (e, fileToUpload) => {
    canvasService.getImgHandler(
      fileToUpload,
      this.img.current,
      this.fileInput.current
    );
  };
  drawImgToCanvas = (img = this.img.current) => {
    canvasService.drawImgToCanvas(img);
  };

  render() {
    return (
      <div className="canvas-container">
        <img
          ref="img"
          className="canvas-img hidden"
          src={this.state.imgSrc}
          ref={this.img}
        />
        <canvas className="canvas drawing-canvas" ref={this.drawingCanvas} />
        <DragableDivs
          texts={this.props.texts}
          canvasSize={this.state.sizes}
          updateTextBoxStyle={this.props.updateTextBoxStyle}
        />
        <canvas className="canvas main-canvas" ref={this.canvas} />
        <input
          type="file"
          accept="image/*"
          onChange={this.getImgHandler}
          ref={this.fileInput}
        />
      </div>
    );
  }
}
export default CanvasContainer;
