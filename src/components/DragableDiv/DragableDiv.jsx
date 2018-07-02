import React, { Component } from "react";
import "./DragableDiv.css";
class DragableDiv extends Component {
  constructor(props) {
    super(props);
    this.dragable = React.createRef();
    this.state = {
      pos1: 0,
      pos2: 0,
      pos3: 0,
      pos4: 0
    };
  }
  componentDidMount() {
    this.dragable.current.onmousedown = this.mouseDownHandler;
  }
  mouseUpHandler = e => {
    document.onmouseup = null;
    document.onmousemove = null;
  };
  mouseDownHandler = e => {
    this.setState(state => {
      return { ...state, pos3: e.clientX, pos4: e.clientY };
    });
    document.onmouseup = this.mouseUpHandler;
    document.onmousemove = this.mouseMoveHandler;
  };
  mouseMoveHandler = e => {
    var dragable = this.dragable.current
    this.setState(state => {
      return {
        ...state,
        pos1: state.pos3 - e.clientX,
        pos2: state.pos4 - e.clientY,
        pos3: e.clientX,
        pos4: e.clientY
      };
    });
    var leftToUpdate = dragable.offsetLeft - this.state.pos1
    var topToUpdate = dragable.offsetTop - this.state.pos2
    var yCoordMax = this.props.canvasSize.height - dragable.offsetHeight
    var xCoordMax = this.props.canvasSize.width - dragable.offsetWidth
    if (topToUpdate > yCoordMax) topToUpdate = yCoordMax
    else if(topToUpdate < 0) topToUpdate = 0
    this.props.updateTextBoxStyle(this.props.text.id,{top:topToUpdate})
      //  dragable.style.top = topToUpdate + "px"
  
    if(leftToUpdate > xCoordMax) leftToUpdate = xCoordMax
    else if(leftToUpdate < 0) leftToUpdate = 0
    this.props.updateTextBoxStyle(this.props.text.id,{left:leftToUpdate})
      //  dragable.style.left = leftToUpdate + "px";
  };
  render() {
    return (
      <div
        className="dragable"
        ref={this.dragable}
        style={this.props.text.style}>
      </div>
    );
  }
}
export default DragableDiv;
