import React from 'react'
import TextControler from '../TextControler/TextControler'
import './TextControlers.css'
const TextControlers = (props) => {
return <div className='text-controlers'>{props.texts.map(textInfo => {
    return <TextControler textInfo={textInfo}/>
})}</div>
}
export default TextControlers