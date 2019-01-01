import React from "react";
import TextControlers from "../TextControlers/TextControlers";
import "./ControlPanel.css";
const controlPanel = props => {
  return (
    <div className="control-panel">
        <button className="button-default add-text-button" onClick={props.addTextHandler}>Add Text</button>
        <button className="button-default upload-img-button" onClick={props.fireInputClickEvent}>Upload Image</button>
      <TextControlers texts={props.texts}
      deleteText={props.deleteText}
      fontSizeChangedHandler={props.fontSizeChangedHandler}
      updateTextBody={props.updateTextBody}
      updateTextProps={props.updateTextProps}
      colorPickerClickedHandler={props.colorPickerClickedHandler}
      colorChangedHandler={props.colorChangedHandler} />
    <button onClick={props.saveImg} className="button-default download-btn">Download Image</button>
    </div>
  );
};

export default controlPanel;
