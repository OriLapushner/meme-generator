import React ,{Component} from 'react'
import DragableDivs from '../DragableDivs/DragableDivs'
import './CanvasContainer.css'

 class CanvasContainer extends Component{
     constructor(props) {
         super(props)
         this.fileInput = React.createRef();
         this.img = React.createRef();
         this.canvas = React.createRef();
         this.state = {
             imgSrc: null,
             size: {
                 width: 0 ,
                 height: 0
             },
         }
     }
     drawText = () => {
     var ctx = this.canvas.current.getContext('2d')
     ctx.font ="30px Arial"
     ctx.fillText("test",10,10)    
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
        // console.log(sizes)
        this.props.updateAllTextBoxStyle({width:sizes.width/2,height:50})
        var textBoxTop = sizes.height - 50;
        console.log(textBoxTop)
        this.props.updateTextBoxStyle(this.props.texts[1].id,{top:textBoxTop})
        this.setState(state => {
            return {...state,sizes}
        })
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
        // console.log('original relation:',width/height,'scaled relation:',scaledWidth/scaledHeight)
        return {width:scaledWidth,height:scaledHeight}
    }
render() {
    return ( <div className="canvas-container">
    <img ref="img" className="hidden" src={this.state.imgSrc} ref={this.img}/>
<DragableDivs texts={this.props.texts} canvasSize={this.state.sizes}/>
<canvas className="canvas" ref={this.canvas}/>
 <input type="file" accept="image/*" onChange={this.getImgHandler} ref={this.fileInput}/>
</div>
)
}
 }
export default CanvasContainer