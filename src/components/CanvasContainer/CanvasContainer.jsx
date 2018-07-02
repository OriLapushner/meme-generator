import React, { Component } from "react";
import DragableDivs from "../DragableDivs/DragableDivs";
import "./CanvasContainer.css";

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
  clearCanvas(canvas){
    canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height)
  }
  drawText = (canvas, text, val) => {
    var textToDraw = val ? val : text.body
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    // ctx.textBaseline = 'top';
    // console.log(ctx.measureText(text));
    var drawCoordX = text.style.left + text.style.width/2
    var drawCoordY = text.style.top + text.style.height/2
    ctx.fillText(textToDraw, drawCoordX, drawCoordY);
  }
  drawTexts = (canvas,texts) => {
    texts.forEach(text => {
      this.drawText(canvas,text)
    })
  }
  getImgHandler = e => {
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.img.current.src = reader.result;
      },
      false
    );
    var file = this.fileInput.current.files[0];
    if (file) {
      reader.readAsDataURL(file);
      this.img.current.onload = this.drawImgToCanvas;
    }
    // console.log(this.fileInput.current.files[0]
  };
  drawImgToCanvas = () => {
    var ctx = this.canvas.current.getContext("2d");
    var sizes = this.getScaledImgSize(
      this.img.current.width,
      this.img.current.height,
      400,
      400
    );
    this.canvas.current.height = sizes.height;
    this.canvas.current.width = sizes.width;
    this.drawingCanvas.current.height = sizes.height
    this.drawingCanvas.current.width = sizes.width
    // console.log(sizes)
    this.setState(state => {
      return {
        ...state,
        sizes
      };
    });
    var textBoxTop = sizes.height - 50;

    this.props.updateTextBoxStyle(this.props.texts[0].id, { top: 0, left: 0 ,width:sizes.width/2,height:50});
    this.props.updateTextBoxStyle(this.props.texts[1].id, {
      top: textBoxTop,
      left: 0,
      width:sizes.width/2,
      height:50
    });
    ctx.drawImage(this.img.current, 0, 0, sizes.width, sizes.height);
  };
  getScaledImgSize = (width, height, maxHeight, maxWidth) => {
    var scaledWidth, scaledHeight, higherValue;
    higherValue = width > height ? "width" : "height";
    if (higherValue === "width") {
      if (width > maxWidth) {
        scaledWidth = maxWidth;
        scaledHeight = height / (width / maxWidth);
      }
    } else if (height > maxHeight) {
      scaledHeight = maxHeight;
      scaledWidth = width / (height / maxHeight);
    } else {
      scaledHeight = height;
      scaledWidth = width;
    }
    console.log(
      "original relation:",
      width / height,
      "scaled relation:",
      scaledWidth / scaledHeight
    );
    return { width: scaledWidth, height: scaledHeight };
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
        <DragableDivs texts={this.props.texts} canvasSize={this.state.sizes} 
        updateTextBoxStyle={this.props.updateTextBoxStyle}/>
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
