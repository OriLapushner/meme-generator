import React, { Component } from "react";
import DragableDivs from "../DragableDivs/DragableDivs";
import "./CanvasContainer.css";

import canvasService from '../../services/canvasService'

class CanvasContainer extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.img = React.createRef();
    this.canvas = React.createRef();
    this.drawingCanvas = React.createRef();
    this.state = {
      imgSrc: null,
      sizes: {
        width: 0,
        height: 0
      }
    };
  }
  componentDidMount() {
    this.props.getRef(this);
  }
  componentWillUnmount() {
    this.props.ref(null);
  }
  clearCanvas(canvas) {
    canvasService.clearCanvas(canvas)
  }
  drawText = (canvas, text, val) => {
    var textToDraw = val ? val : text.body;
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillStyle = text.color;
    ctx.textAlign = "center";
    // ctx.textBaseline = 'top';
    // console.log(ctx.measureText(text));
    var drawCoordX = text.style.left + text.style.width / 2;
    var drawCoordY = text.style.top + text.style.height / 2;
    ctx.fillText(textToDraw, drawCoordX, drawCoordY);
  };
  drawTexts = (canvas, texts) => {
    canvasService.drawTexts(canvas, texts)
  };
  getImgHandler = (e, fileToUpload) => {
    canvasService.getImgHandler(fileToUpload,this.img.current,
      this.canvas.current,this.drawingCanvas.current,this.fileInput.current)
  //   var reader = new FileReader();
  //   reader.addEventListener(
  //     "load",
  //     () => {
  //       this.img.current.src = reader.result;
  //     },
  //     false
  //   );
  //   var file = fileToUpload || this.fileInput.current.files[0];
  //   if (file) {
  //     reader.readAsDataURL(file);
  //     this.img.current.onload = this.drawImgToCanvas;
  //   }
  //   // console.log(this.fileInput.current.files[0]
  };
  drawImgToCanvas = () => {
    canvasService.drawImgToCanvas(this.canvas.current,this.drawingCanvas.current,this.img.current,this.drawingCanvas.current)
  };
 
  render() {
    return (
      <div className="canvas-container">
        <img
          ref="img"
          className="hidden"
          src={this.state.imgSrc}
          ref={this.img}
        />
        <canvas className="canvas drawing-canvas" ref={this.drawingCanvas} />
        <DragableDivs
          texts={this.props.texts}
          canvasSize={this.state.sizes}
          updateTextBoxStyle={this.props.updateTextBoxStyle}
        />
        <canvas className="canvas" ref={this.canvas} />
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
