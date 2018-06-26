import React from "react";
import Button from "../Button/Button";
import "./TextControler.css";
const TextControl = props => {
  return (
    <div className="text-controler">
      <textarea
        className="textarea is-small"
        placeholder={props.textInfo.placeholder}
        rows="2"
        onKeyUp={(event) => props.updateTextBody(event,props.textInfo.id)}
      />
      <div className="select">
        <select>
          <option>font 1</option>
          <option>font 2</option>
        </select>
      </div>
      <input className="input-color" type="color" />
      <Button>advanced</Button>
    </div>
  );
};
export default TextControl;
