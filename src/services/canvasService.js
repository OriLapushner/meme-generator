import dragService from './dragAndDropService'

const drawImgToCanvas = (canvas, textCanvas ,img) => {
    var ctx = canvas.getContext("2d");
    var sizes = getScaledImgSize(
      img.width,
      img.height,
      400,
      400
    );
    resizeElement(canvas, sizes.width, sizes.height)
    resizeElement(textCanvas, sizes.width, sizes.height)
    ctx.drawImage(img, 0, 0, sizes.width, sizes.height);

}
const resizeElement = (element, width, height) => {
    element.width = width
    element.height = height
}

const getTexts = (texts) => {

}

const drawTexts = (canvas,texts) => {
    var ctx = canvas.getContext("2d");
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    texts.forEach(text => {
      ctx.fillStyle = text.color;
      var pos = dragService.textPositions.find(textPos => textPos.id === text.id)
      var dragable = document.querySelector('#drag' + pos.id)
      // ctx.font = "30px Arial";
      console.log(text.fontSize + text.font)
      ctx.font = text.fontSize + ' ' +  text.font;
      // console.log(ctx.measureText(text.body).width)
      // if(dragable.offsetWidth > 5 + ctx.measureText(text.body)) ctx.font = "15px Arial"
        
      var drawCoordX = pos.posX + dragable.offsetWidth / 2;
      var drawCoordY = pos.posY + dragable.offsetHeight / 2;
      ctx.fillText(text.body, drawCoordX, drawCoordY);
    });
  };

  const getScaledImgSize = (width, height, maxHeight, maxWidth) => {
    var scaledWidth, scaledHeight, higherValue;
    higherValue = width >= height ? "width" : "height";
    if (higherValue === "width") {
      if (width >= maxWidth) {
        scaledWidth = maxWidth;
        scaledHeight = height / (width / maxWidth);
      }
    } else if (height > maxHeight) {
      scaledHeight = maxHeight;
      scaledWidth = width / (height / maxHeight);
    } else {
      scaledHeight = height;
      scaledWidth = width;
    }
        // console.log(
        //   "original relation:",
        //   width / height,
        //   "scaled relation:",
        //   scaledWidth / scaledHeight,
        //   "scaled width",
        //   width,
        //   "scaled height",
        //   height
        // );
    return { width: scaledWidth, height: scaledHeight };
  };

  const clearCanvas = (canvas) => {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }

  const getImgHandler = (fileToUpload, img, canvas, textCanvas, fileInput) => {
    var reader = new FileReader();
    reader.addEventListener(
        "load",
        () => {
            img.src = reader.result;
        },
        false
    );
    var file = fileToUpload || fileInput.files[0];
    if (file) {
        reader.readAsDataURL(file);
        img.onload = () => drawImgToCanvas(canvas, textCanvas, img);
    }
  };
  export default {
      getImgHandler,
      drawImgToCanvas,
      drawTexts,
      getScaledImgSize,
      clearCanvas
  }