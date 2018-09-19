import React from 'react'
import DragableDiv from '../DragableDiv/DragableDiv'
const DragableDivs = (props) => {
return props.texts.map((text,index) => {
    return <DragableDiv text={text}
    updateTextBoxStyle={props.updateTextBoxStyle}
    canvasSize={props.canvasSize}
    // index={index}
    key={text.id}/>
})
}
export default DragableDivs