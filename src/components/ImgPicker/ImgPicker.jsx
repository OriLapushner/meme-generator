import React from 'react'
import canvasService from '../../services/canvasService'
import './ImgPicker.css'

const ImgPicker = (props) => {
    var imgs = props.imgs.map( (img,idx) => {
        return <img src={img} id={'imgPicker' + idx} key={idx} alt=""
        onClick={() => canvasService.drawImgToCanvasBySelector('#imgPicker' + idx)}></img>
    })
    return <div className="img-picker-container">
    <i className="fas fa-arrow-left arrow" onClick={() => props.updateDisplayedImgs(-1)}/>
    <div className="imgs-container">
    {imgs}
    </div>
    <i className="fas fa-arrow-right arrow" onClick={() => props.updateDisplayedImgs(1)}/>
    </div>
}
export default ImgPicker