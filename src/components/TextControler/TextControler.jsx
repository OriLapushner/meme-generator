import React from "react";
import ColorPicker from '../ColorPicker/ColorPicker'
import "./TextControler.css";
const TextControler = props => {

 var options = props.fontList.map( font => (
    <option key={font} style={{fontFamily:font}}>{font}</option>
  ))

  return (
    <div className="text-controler">
      <textarea
        onBlur={() => props.updateSelected(props.textInfo.id,false)}
        onFocus={() => props.updateSelected(props.textInfo.id,true)}
        className="controler-text-area"
        placeholder={props.textInfo.placeholder}
        rows="2"
        onKeyUp={(e) => props.updateTextBody(props.textInfo.id,e)}
      />
      <div className="buttons-container">
      <div>
        <div className="font-type-container">
        <span>font-type:</span>
        <select onChange={(e) => props.fontChangedHandler(props.textInfo.id,e.target.value)} className="font-selector">
          {options}
        </select>
        </div>
      </div>
    <div className="font-size-container">
      <span>font-size:</span>
      <input className="font-size-txt-input" type="number" value={props.textInfo.fontSize}
         onChange={(event) => props.fontSizeChangedHandler(event.target.value,props.textInfo.id)}>
         </input>
         </div>
      <div className="txt-color-button rounded" style={{background:props.textInfo.color}}
      title="change text color"
      onClick={() => props.colorPickerClickedHandler(props.textInfo.id)}/>
      
      <ColorPicker textInfo={props.textInfo}
      colorChangedHandler={props.colorChangedHandler}/>
        <i title="delete text" className="far fa-trash-alt fa-lg trash-icon" onClick={() => props.deleteText(props.textInfo.id)}></i>
      </div>
    </div>
  );
};
export default TextControler;
