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
    return (
      <div
        id={"drag" + this.props.text.id}
        className="dragable"
        >
      </div>
    );
  }
}
export default DragableDiv;
