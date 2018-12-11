import interact from 'interactjs'


//keeps track of text positions
const textPositions = []
//function that is invoked after text position change
var textChangeHandler = null
// a container to be contained in when moving divs
var textBoxesContainer = null

var containerPos = {
  x: null,
  y: null
}

function deleteAllTextPositions(){
  var length = textPositions.length
  for(var i = length; i < 0; i--){
    deleteTextPosition(textPositions[i].id)
  }
}
function deleteTextPosition(id) {
  removeListeners(id)
  var idx = textPositions.findIndex(textPos => textPos.id === id)
  textPositions.splice(idx, 1)
  console.log(idx)
}

function removeListeners(textId) {
  interact('#drag' + textId).unset()
}

function setTextBoxPosition(target, left, top) {
  target.style.left = left + textBoxesContainer.offsetLeft + "px"
  target.style.top = top + textBoxesContainer.offsetTop + "px"
}

function TextPosition(id, posX = 0, posY = 0) {
  this.id = id
  this.posX = posX
  this.posY = posY
}

function setTextBoxesContainer(container) {
  textBoxesContainer = container
  containerPos = {
    posX: container.offsetLeft,
    posY: container.offsetTop
  }

  //on resize event,updates text boxes
  window.onresize = function () {
    if (textBoxesContainer.offsetLeft == containerPos.x &&
      textBoxesContainer.offsetTop == containerPos.y) return
    containerPos.x = container.offsetLeft
    containerPos.y = container.offsetTop
    textPositions.forEach(text => setTextPosition(text.id, text.posX, text.posY))
  }
}

function setTextPosition(id, posX, posY) {
  var text = textPositions.find((text) => text.id === id)
  var textBox = document.querySelector('#drag' + text.id)
  text.posX = posX
  text.posY = posY
  setTextBoxPosition(textBox, posX, posY)
  textChangeHandler()
}

function addTextPosition(id, posX, posY){
  console.log("add text pos")
textPositions.push(new TextPosition(id, posX, posY))
}
function makeDragableResizeable(id, posX, posY) {
  // addTextPosition(id, posX, posY)
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
      textPos.posX += event.deltaRect.left;
      textPos.posY += event.deltaRect.top;

      target.style.width = event.rect.width + 'px';
      target.style.height = event.rect.height + 'px';
      // handle resizing movement from top and left corners
      setTextBoxPosition(target, textPos.posX, textPos.posY)
      textChangeHandler()
    });

  function dragMoveListener(event) {
    var target = event.target
    var id = +event.target.id.substring(4)
    var textPos = textPositions.find(textPos => textPos.id === id)
    //give positions data update
    textPos.posX += event.dx
    textPos.posY += event.dy
    setTextBoxPosition(target, textPos.posX, textPos.posY)
    textChangeHandler()
  }
}

function setTextChangeHandler(handler) {
  textChangeHandler = handler
}

export default {
  addTextPosition,
  deleteTextPosition,
  deleteAllTextPositions,
  setTextBoxPosition,
  setTextBoxesContainer,
  setTextChangeHandler,
  removeListeners,
  makeDragableResizeable,
  textPositions,
  setTextPosition
}