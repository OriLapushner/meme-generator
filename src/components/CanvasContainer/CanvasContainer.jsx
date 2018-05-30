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
        ctx.drawImage(this.img.current,0,0)
    }
render() {
    return ( <div className="canvas-container">
    <img ref="img" className="hidden" src={this.state.imgSrc} ref={this.img}/>
<canvas ref={this.canvas}/>
<input type="file" accept="image/*" onChange={this.getImgHandler} ref={this.fileInput}/>
</div>
)
}
 }
export default CanvasContainer