
const drawImgToCanvas = (canvas, textCanvas ,img) => {
  console.log(img.width)
    var ctx = canvas.getContext("2d");
    var sizes = getScaledImgSize(
      img.width,
      img.height,
      400,
      400
    );
    resizeElement(canvas, 300, 300)
    resizeElement(textCanvas, sizes.width, sizes.height)
    // console.log(sizes)
    // this.setState(state => {
    //   return {
    //     ...state,
    //     sizes
    //   };
    // });
    // var textBoxTop = sizes.height - 50;
    // this.props.updateTextBoxStyle(this.props.texts[0].id, {
    //     top: 0,
    //     left: 0,
    //     width: sizes.width / 2,
    //     height: 50
    //   });
    //   this.props.updateTextBoxStyle(this.props.texts[1].id, {
    //     top: textBoxTop,
    //     left: 0,
    //     width: sizes.width / 2,
    //     height: 50
    //   });
    console.log(img,sizes)
    ctx.drawImage(img, 0, 0, sizes.width, sizes.height);

}
const resizeElement = (element, width, height) => {
    element.width = width
    element.height = height
}
const drawTexts = (canvas,texts) => {
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    // ctx.textBaseline = 'top';
    // console.log(ctx.measureText(text));
    texts.forEach(text => {
        ctx.fillStyle = text.color;
      var drawCoordX = text.style.left + text.style.width / 2;
      var drawCoordY = text.style.top + text.style.height / 2;
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
        console.log(width,height)
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
        img.onload = drawImgToCanvas(canvas, textCanvas, img);
    }
    // console.log(img.width)
    // console.log(fileInput.files[0])
  };
  export default {
      getImgHandler,
      drawImgToCanvas,
      drawTexts,
      getScaledImgSize,
      clearCanvas
  }