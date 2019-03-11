import React, { Component } from "react";
import dragService from '../../services/dragAndDropService'
import "./DragableDiv.css";
class DragableDiv extends Component {
  componentDidMount() {
    dragService.makeDragableResizeable(this.props.text.id,0,0) 
  }
  componentWillUnmount(){
    dragService.removeListeners(this.props.text.id)
  }
  render() {
    var classes = this.props.text.isSelected ? " selected" : ""
    return (
      <div
        id={"drag" + this.props.text.id}
        className={"dragable" + classes}
        >
        <div className="resizer left-resizer bot-resizer" id={"tr" + this.props.text.id}></div>
        <div className="resizer left-resizer top-resizer" id={"tl" + this.props.text.id}></div>
        <div className="resizer right-resizer bot-resizer" id={"br" + this.props.text.id}></div>
        <div className="resizer right-resizer top-resizer" id={"bl" + this.props.text.id}></div>
      </div>
    );
  }
}
export default DragableDiv;
