import React from 'react'
import TextControler from '../TextControler/TextControler'
import './TextControlers.css'
const TextControlers = (props) => {
return <div className='text-controlers'>{props.texts.map(textInfo => {
    return <TextControler textInfo={textInfo}
    fontChangedHandler={props.fontChangedHandler}
    updateSelected={props.updateSelected}
    fontList={props.fontList}
    deleteText={props.deleteText}
    updateTextBody={props.updateTextBody}
    key={textInfo.id}
    colorPickerClickedHandler={props.colorPickerClickedHandler}
    colorChangedHandler={props.colorChangedHandler}
    fontSizeChangedHandler={props.fontSizeChangedHandler}
    updateTextProps={props.updateTextProps}/>
})}</div>
}
export default TextControlers