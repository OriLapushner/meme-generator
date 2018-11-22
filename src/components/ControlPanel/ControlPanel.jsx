import React from "react";
import TextControlers from "../TextControlers/TextControlers";
import ImgsPicker from '../ImgPicker/ImgPicker'
import "./ControlPanel.css";
const controlPanel = props => {
  return (
    <div className="control-panel">
        <button className="button-default add-text-button" onClick={props.addTextHandler}>Add Text</button>
        <ImgsPicker imgs={props.imgsSrcs}/>
      <TextControlers texts={props.texts}
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
