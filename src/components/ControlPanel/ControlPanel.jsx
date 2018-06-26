import React from "react";
import TextControlers from "../TextControlers/TextControlers";
import Button from '../Button/Button'
import "./ControlPanel.css";
const controlPanel = props => {
  return (
    <div className="control-panel">
        <Button clicked={props.addTextHandler}>+</Button>
      <TextControlers texts={props.texts}
      updateTextBody={props.updateTextBody} />

    </div>
  );
};

export default controlPanel;
