import React from "react";
import ColorPicker from '../ColorPicker/ColorPicker'
import "./TextControler.css";
import trashIcon from '../../media/trash icon.png'
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
          <option>Arial</option>
        </select>
      </div>
      <span>font-size:</span>
      <input className="font-size-txt-input" type="number" value={props.textInfo.fontSize}
         onChange={(event) => props.fontSizeChangedHandler(event.target.value,props.textInfo.id)}>
         </input>
      <div className="txt-color-button rounded" style={{background:props.textInfo.color}}
      title="change text color"
      onClick={() => props.colorPickerClickedHandler(props.textInfo.id)}/>
      
      <ColorPicker textInfo={props.textInfo}
      colorChangedHandler={props.colorChangedHandler}/>
      {/* <button onClick={() => props.deleteText(props.textInfo.id)} className="button-default">Delete</button> */}
      <img onClick={() => props.deleteText(props.textInfo.id)}
       className="trash-icon" src={trashIcon} title="delete text"></img>
      </div>
    </div>
  );
};
export default TextControler;
