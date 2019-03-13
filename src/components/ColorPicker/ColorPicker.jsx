import React from "react";
import { SketchPicker } from "react-color";
import "./ColorPicker.css";
const ColorPicker = props => {
  var colorPickerDisplay = props.textInfo.colorPickerDisplayed ? "" : " not-visible";
  return (
    <div className={"color-picker-container" + colorPickerDisplay}>
      <div className="color-picker-wrapper">
        <SketchPicker disableAlpha={true} 
        onChangeComplete={(obj) => props.colorChangedHandler(obj.hex,props.textInfo.id)}
        color={props.textInfo.color}/>
      </div>
    </div>
  );
};

export default ColorPicker;
