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
    this.canvasContainer = React.createRef();
    this.state = {
      imgSrc: null
    };
  }
  componentDidMount() {
    this.props.getRef(this);
    dragAndDropService.setTextBoxesContainer(this.canvas.current);
    dragAndDropService.setTextChangeHandler(() => {
      this.clearCanvas(this.drawingCanvas.current);
      this.drawTexts(this.drawingCanvas.current, this.props.texts);
    });
    canvasService.setMainCanvas(this.canvas.current);
    canvasService.setDrawingCanvas(this.drawingCanvas.current);
    canvasService.setCanvasContaier(this.canvasContainer.current);
    canvasService.setdrawImgHandler(this.props.initDragableDivs);
    this.drawDefaultImg();
    this.props.initDragableDivs();

  }
  componentWillUnmount() {
    this.props.getRef(null);
  }
  clearCanvas = (canvas) => {
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
  drawFirstImg = () =>{
    var idx = 0;
    canvasService.drawImgToCanvasBySelector('#imgPicker' + idx)
    var img = document.querySelector("#imgPicker" + idx)
    img.removeEventListener("load",this.drawFirstImg)
  }
  drawDefaultImg(){
    var idx = 0;
    var img = document.querySelector("#imgPicker" + idx)
    img.addEventListener("load",this.drawFirstImg)
    }
    

  render() {
    return (
      <div className="canvas-container" ref={this.canvasContainer}>
        <img
          className="canvas-img hidden"
          src={this.state.imgSrc}
          ref={this.img}
          alt=""
        />
        <canvas className="canvas drawing-canvas" ref={this.drawingCanvas} />
        <DragableDivs
          texts={this.props.texts}
          canvasSize={this.state.sizes}
          updateTextBoxStyle={this.props.updateTextBoxStyle}
        />
        <canvas className="canvas main-canvas" ref={this.canvas} />
        <input
          hidden
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
