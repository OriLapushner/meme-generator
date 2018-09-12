import React from "react";
import Button from "../Button/Button";
import ColorPicker from '../ColorPicker/ColorPicker'
import "./TextControler.css";
const TextControler = props => {
  return (
    <div className="text-controler">
      <textarea
        className="textarea is-small"
        placeholder={props.textInfo.placeholder}
        rows="2"
        onKeyUp={(event) => props.updateTextBody(event,props.textInfo.id)}
      />
      <div className="buttons-container">
      <div className="select">
        <select>
          <option>font 1</option>
          <option>font 2</option>
        </select>
      </div>
      <div className="txt-color-button rounded" style={{background:props.textInfo.color}}
      title="change text color"
      onClick={() => props.colorPickerClickedHandler(props.textInfo.id)}/>
      
      <ColorPicker textInfo={props.textInfo}
      colorChangedHandler={props.colorChangedHandler}/>
      <Button>advanced</Button>
      </div>
    </div>
  );
};
export default TextControler;
