import React from 'react'
import DragableDiv from '../DragableDiv/DragableDiv'
const DragableDivs = (props) => {
return props.texts.map(text => {
    return <DragableDiv text={text}
    updateTextBoxStyle={props.updateTextBoxStyle}
    canvasSize={props.canvasSize}
    key={text.id}/>
})
}
export default DragableDivs