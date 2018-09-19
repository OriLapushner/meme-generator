import interact from 'interactjs'
function removeListeners(textId){
  interact('#drag' + textId).unset()
}

function TextPosition(textId, posX = 0, posY = 0){
  this.id = textId
  this.posX = posX,
  this.posY = posY
}
 
const textPositions = []
function makeDragableResizeable(textId, posX, posY){
  textPositions.push(new TextPosition(textId, posX, posY))
  interact('#drag' + textId)
  .draggable({
    onmove: dragMoveListener,
    restrict: {
      restriction: 'parent',
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
  })
  .resizable({ 
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    // keep the edges inside the parent
    restrictEdges: {
      outer: 'parent',
      endOnly: true,
    },

    // minimum size
    restrictSize: {
      min: { width: 100, height: 50 },
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
    
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    target.style.left = textPos.posX + 'px'
    target.style.top = textPos.posY + 'px'
  });

  function dragMoveListener (event) {
    var target = event.target
    var id = +event.target.id.substring(4)
    var textPos = textPositions.find(textPos => textPos.id === id)
    //give positions data update
    textPos.posX += event.dx
    textPos.posY += event.dy
        
    //give style to elements
    target.style.left = textPos.posX + 'px'
    target.style.top = textPos.posY + 'px'
  }
}

export default {
  removeListeners,
  makeDragableResizeable,
  textPositions
}