import React from "react";
import TextControlers from "../TextControlers/TextControlers";
import Button from '../Button/Button'
import "./ControlPanel.css";
const controlPanel = props => {
  return (
    <div className="control-panel">
        <Button clicked={props.addTextHandler}>+</Button>
      <TextControlers texts={props.texts}
      updateTextBody={props.updateTextBody}
      updateTextProps={props.updateTextProps}
      colorPickerClickedHandler={props.colorPickerClickedHandler}
      colorChangedHandler={props.colorChangedHandler} />
    <Button clicked={props.saveImg}>Download Image</Button>
    </div>
  );
};

export default controlPanel;
