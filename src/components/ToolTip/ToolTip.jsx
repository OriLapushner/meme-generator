import React from 'react'
import './ToolTip.css'

const ToolTip = (props) => {
return <div className="tool-tip-container">
    <span><i className="fas fa-star"></i> to upload an image from your device, press upload image or simply drag on desktop</span>
    <span><i className="fas fa-star"></i> to change texts dimensions drag the gray corners of the text container</span>
    <span><i className="fas fa-star"></i> with touch screen text dimensions are changeable by pinching text container</span>
</div>

}
export default ToolTip