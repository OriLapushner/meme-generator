import React from "react";
import Button from "../Button/Button";
import './TextControler.css'
const TextControl = props => {
  return (
    <div className="text-controler">
      <textarea class="textarea is-small" placeholder={props.placeholder} rows='2'/>
      <div class="select">
  <select>
    <option>font 1</option>
    <option>font 2</option>
  </select>
</div>
      <input type="color"/>
      <Button>advanced</Button>
    </div>
  );
};
export default TextControl;
