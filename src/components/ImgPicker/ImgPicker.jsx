import React from 'react'
import canvasService from '../../services/canvasService'
import './ImgPicker.css'


const ImgPicker = (props) => {
   var imgs = props.imgs.map( (img,idx) => {
        return <img src={img} id={'imgPicker' + idx} 
        onClick={() => canvasService.drawImgToCanvasBySelector('#imgPicker' + idx)}></img>
    })
    return <div className="img-picker-container">{imgs}</div>
}
export default ImgPicker