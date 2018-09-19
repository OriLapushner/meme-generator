import React, { Component } from "react";
import dragService from '../../services/dragAndDropService'
import "./DragableDiv.css";
class DragableDiv extends Component {
  // constructor(props) {
  //   super(props);
  //   this.dragable = React.createRef();
  //   this.state = {
  //     pos1: 0,
  //     pos2: 0,
  //     pos3: 0,
  //     pos4: 0
  //   };
  // }
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
        // ref={this.dragable}
        // style={this.props.text.style}
        >
      </div>
    );
  }
}
export default DragableDiv;
