
document.addEventListener("DOMContentLoaded", function() { 
    // this function runs when the DOM is ready, i.e. when the document has been parsed
    let board = document.querySelector("#board");
let deg = 0;
console.log(board);
function rotateBoard() {
    deg++
    board.style.webkitTransform = 'rotateX('+deg+'deg) rotateZ(45deg)'; 
    board.style.mozTransform    = 'rotateX('+deg+'deg) rotateZ(45deg)'; 
    board.style.msTransform     = 'rotateX('+deg+'deg) rotateZ(45deg)'; 
    board.style.oTransform      = 'rotateX('+deg+'deg) rotateZ(45deg)'; 
    board.style.transform       = 'rotateX('+deg+'deg) rotateZ(45deg)'; 
}
setInterval(rotateBoard, 20);
});