import React ,{Component} from 'react'
import './CanvasContainer.css'

 class CanvasContainer extends Component{
     constructor(props) {
         super(props)
         this.fileInput = React.createRef();
         this.img = React.createRef();
         this.canvas = React.createRef();
         this.state = {
             imgSrc: null
         }

     }
getImgHandler = (e) => {
    var reader = new FileReader  
    reader.addEventListener('load', () => {
        this.img.current.src = reader.result
    },false)
    var file = this.fileInput.current.files[0]
    if(file) {
        reader.readAsDataURL(file)
        this.img.current.onload = this.setImgToCanvas
    }
        // console.log(this.fileInput.current.files[0]
    }
    setImgToCanvas = () => {
        var ctx = this.canvas.current.getContext('2d')
        var sizes = this.getScaledImgSize(this.img.current.width,this.img.current.height,400,400)
        this.canvas.current.height = sizes.height
        this.canvas.current.width = sizes.width
        console.log(sizes)
        ctx.drawImage(this.img.current,0,0,sizes.width,sizes.height)
    }
    getScaledImgSize = (width,height,maxHeight,maxWidth) => {
        var scaledWidth,scaledHeight,higherValue;
        higherValue = width > height ? 'width' : 'height'
        if(higherValue === 'width'){
            if(width > maxWidth){
                scaledWidth = maxWidth;
                scaledHeight = height/(width/maxWidth)
            }
        }
        else if( height > maxHeight){
            scaledHeight = maxHeight;
            scaledWidth = width/(height/maxHeight)
        }
        else{
            scaledHeight = height
            scaledWidth = width
        }
        console.log('original relation:',width/height,'scaled relation:',scaledWidth/scaledHeight)
        return {width:scaledWidth,height:scaledHeight}
    }
render() {
    return ( <div className="canvas-container">
    <img ref="img" className="hidden" src={this.state.imgSrc} ref={this.img}/>
<canvas className="canvas" ref={this.canvas}/>
<input type="file" accept="image/*" onChange={this.getImgHandler} ref={this.fileInput}/>
</div>
)
}
 }
export default CanvasContainer