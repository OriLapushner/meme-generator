import React from "react";
import ColorPicker from '../ColorPicker/ColorPicker'
import "./TextControler.css";
const TextControler = props => {
  return (
    <div className="text-controler">
      <textarea
        className="controler-text-area"
        placeholder={props.textInfo.placeholder}
        rows="2"
        onKeyUp={(event) => props.updateTextBody(event,props.textInfo.id)}
      />
      <div className="buttons-container">
      <div>
        <select>
          <option>font 1</option>
          <option>font 2</option>
        </select>
      </div>
      font-size:
      <input className="font-size-txt-input" type="number" value={props.textInfo.fontSize}
      className="font-size-txt-input"
         onChange={(event) => props.fontSizeChangedHandler(event.target.value,props.textInfo.id)}>
         </input>
      <div className="txt-color-button rounded" style={{background:props.textInfo.color}}
      title="change text color"
      onClick={() => props.colorPickerClickedHandler(props.textInfo.id)}/>
      
      <ColorPicker textInfo={props.textInfo}
      colorChangedHandler={props.colorChangedHandler}/>
      <button>advanced</button>
      </div>
    </div>
  );
};
export default TextControler;
