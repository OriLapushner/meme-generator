import React from "react";
import TextControlers from "../TextControlers/TextControlers";
import ImgPicker from "../ImgPicker/ImgPicker"
import "./ControlPanel.css";
const controlPanel = props => {
  return (
    <div className="control-panel">
        <button className="button-default add-text-button" onClick={props.addTextHandler}>Add Text</button>
        <button className="button-default upload-img-button" onClick={props.fireInputClickEvent}>Upload Image</button>
      <TextControlers texts={props.texts}
      fontChangedHandler={props.fontChangedHandler}
      updateSelected={props.updateSelected}
      fontList={props.fontList}
      deleteText={props.deleteText}
      fontSizeChangedHandler={props.fontSizeChangedHandler}
      updateTextBody={props.updateTextBody}
      updateTextProps={props.updateTextProps}
      colorPickerClickedHandler={props.colorPickerClickedHandler}
      colorChangedHandler={props.colorChangedHandler} />
    <button onClick={props.saveImg} className="button-default download-btn">Download Image</button>
    <ImgPicker imgs={props.imgs}
     updateDisplayedImgs={props.updateDisplayedImgs}
     />
    </div>
  );
};

export default controlPanel;
