import React from 'react'
import TextControler from '../TextControler/TextControler'
import './TextControlers.css'
const TextControlers = (props) => {
return <div className='text-controlers'>{props.texts.map(textInfo => {
    return <TextControler textInfo={textInfo}
    updateTextBody={props.updateTextBody}
    key={textInfo.id}/>
})}</div>
}
export default TextControlers