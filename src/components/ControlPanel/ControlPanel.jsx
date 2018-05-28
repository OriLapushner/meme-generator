import React from 'react'
import TextControlers from '../TextControlers/TextControlers'
import './ControlPanel.css'
const controlPanel = props =>{ 
return (< div className="control-panel"> <TextControlers texts={props.texts}/></div >)
}

    export default controlPanel