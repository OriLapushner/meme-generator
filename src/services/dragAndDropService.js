import interact from 'interactjs'

//keeps track of text positions
const textPositions = []
//function that is invoked after text position change
var textChangeHandler = null
// a container to be contained in when moving divs
var textBoxesContainer = null

function removeListeners(textId) {
  interact('#drag' + textId).unset()
}

function setTextBoxPosition(target,left,top){
  console.log(textBoxesContainer.offsetTop)
  target.style.left = left + textBoxesContainer.offsetLeft + 'px'
  target.style.top = top + textBoxesContainer.offsetTop + 'px'
}

function TextPosition(id, posX = 0, posY = 0) {
  this.id = id
  this.posX = posX,
  this.posY = posY
}
function setTextBoxesContainer(container){
  textBoxesContainer = container
}
function setTextPosition(id, posX, posY) {
  console.log(posX, posY)
  var text = textPositions.find((text) => text.id === id)
  text.posX = posX
  text.posY = posY
  var textBox = document.querySelector('#drag' + text.id)
  console.log(posX,posY)
  setTextBoxPosition(textBox,posX,posY)
  textChangeHandler()
}


function makeDragableResizeable(id, posX, posY) {
  textPositions.push(new TextPosition(id, posX, posY))
  interact('#drag' + id)
    .draggable({
      onmove: dragMoveListener,
      restrict: {
        restriction: 'parent',
        elementRect: {
          top: 0,
          left: 0,
          bottom: 1,
          right: 1
        }
      },
    })
    .resizable({
      // resize from all edges and corners
      edges: {
        left: ".left-resizer",
        right: ".right-resizer",
        bottom: ".bot-resizer",
        top: ".top-resizer"
      },

      // keep the edges inside the parent
      restrictEdges: {
        outer: 'parent',
        endOnly: true,
      },

      // minimum size
      restrictSize: {
        min: {
          width: 100,
          height: 50
        },
      },

      inertia: true,
    })
    .on('resizemove', function (event) {

      var target = event.target
      var id = +event.target.id.substring(4)
      var textPos = textPositions.find(textpos => id === textpos.id)
      // update the element's style
      console.log(event)
      textPos.posX += event.deltaRect.left;
      textPos.posY += event.deltaRect.top;

      target.style.width = event.rect.width + 'px';
      target.style.height = event.rect.height + 'px';
      // handle resizing movement from top and left corners
      setTextBoxPosition(target,textPos.posX,textPos.posY)
      textChangeHandler()
    });

  function dragMoveListener(event) {
    var target = event.target
    var id = +event.target.id.substring(4)
    var textPos = textPositions.find(textPos => textPos.id === id)
    //give positions data update
    textPos.posX += event.dx
    textPos.posY += event.dy
    //give style to elements
    setTextBoxPosition(target,textPos.posX,textPos.posY)
    textChangeHandler()
  }
}

function setTextChangeHandler(handler) {
  textChangeHandler = handler
}

export default {
  setTextBoxPosition,
  setTextBoxesContainer,
  setTextChangeHandler,
  removeListeners,
  makeDragableResizeable,
  textPositions,
  setTextPosition
}