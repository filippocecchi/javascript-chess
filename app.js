const gameBoard=document.querySelector("#gameboard")
const playerDisplay=document.querySelector("#player")
const infoDisplay= document.querySelector("#info-display")
const width=8
let playerGo="white"
playerDisplay.textContent=playerGo
const startPieces=[
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
]

function createBoard(){
    startPieces.forEach((startPiece,index)=>{
       const square= document.createElement("div")
       square.classList.add("square")
       square.innerHTML=startPiece
       square.firstChild && square.firstChild.setAttribute("draggable","true")
       square.setAttribute("square-id",index)
       const row=Math.floor((63-index)/8)+1
       if(row % 2===0){
        square.classList.add(index % 2 === 0 ? "beige" : "brown")
       }else{
        square.classList.add(index % 2 === 0 ? "brown" : "beige")
       }  
       if(index<=15){
        square.firstChild.firstChild.classList.add("black")
       }
       if(index>=48){
        square.firstChild.firstChild.classList.add("white")
       }
        gameBoard.appendChild(square) 
    })
    reverseIds()
}

createBoard();

const allSquares=document.querySelectorAll(".square")

allSquares.forEach(square=>{
    square.addEventListener("dragstart",dragStart)
    square.addEventListener("dragover",dragOver)
    square.addEventListener("drop",dragDrop)
})

let startPositionId
let draggedElement

function dragStart(e){
    startPositionId=e.target.parentNode.getAttribute("square-id")
    draggedElement=e.target
}

function dragOver(e){
    e.preventDefault()
}

function dragDrop(e){
    e.stopPropagation()
    const taken = e.target.classList.contains("piece")
    const valid=checkIfValid(e.target)
    const correctGo=draggedElement.firstChild.classList.contains(playerGo)
    const opponentGo= playerGo === "white"?"black":"white"
    const takenByOpponent=e.target.firstChild?.classList.contains(opponentGo)

    if(correctGo){
        if(takenByOpponent && valid){
            e.target.parentNode.append(draggedElement)
            e.target.remove()
            checkForWin()
            changePlayer()
            return
        }

        if(taken && !takenByOpponent){
            infoDisplay.textContent="Invalid move"
            setTimeout(()=>infoDisplay.textContent="",1500)
            return
        }

        if(valid){
            e.target.append(draggedElement)
            checkForWin()
            changePlayer()
            return
        }
    }
}

function checkIfValid(target){
    const targetId=Number(target.getAttribute("square-id")) || Number(target.parentNode.getAttribute("square-id"))
    const startId=Number(startPositionId)
    const piece=draggedElement.id

    switch(piece){
        case "pawn":
            const starterRow=[8,9,10,11,12,13,14,15]
            if(
                starterRow.includes(startId) && startId + width*2 === targetId ||
                startId + width === targetId ||
                startId + width - 1 === targetId && document.querySelector(`[square-id="${startId+width-1}"]`).firstChild ||
                startId + width + 1 === targetId && document.querySelector(`[square-id="${startId+width+1}"]`).firstChild
            ){
                return true
            }
            break;
        case "knight":
            if(
                startId + width*2 - 1 === targetId ||
                startId + width*2 + 1 === targetId ||
                startId + width - 2 === targetId ||
                startId + width + 2 === targetId ||
                startId - width - 2 === targetId ||
                startId - width + 2 === targetId ||
                startId - width*2 - 1 === targetId ||
                startId - width*2 + 1 === targetId
            ){
                return true
            }
            break;
        case "bishop":
            if (
                startId + width + 1 === targetId ||
                startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
                startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2+ 2}"]`).firstChild ||
                startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3+ 3}"]`).firstChild ||
                startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3+ 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4+ 4}"]`).firstChild ||
                startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3+ 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4+ 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5+ 5}"]`).firstChild ||
                startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3+ 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4+ 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5+ 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*6+ 6}"]`).firstChild ||
                startId - width - 1 === targetId ||
                startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild ||
                startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2- 2}"]`).firstChild ||
                startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3- 3}"]`).firstChild ||
                startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3- 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4- 4}"]`).firstChild ||
                startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3- 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4- 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5- 5}"]`).firstChild ||
                startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3- 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4- 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5- 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*6- 6}"]`).firstChild ||
                startId - width + 1 === targetId ||
                startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild ||
                startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2+ 2}"]`).firstChild ||
                startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3+ 3}"]`).firstChild ||
                startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3+ 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4+ 4}"]`).firstChild ||
                startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3+ 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4+ 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5+ 5}"]`).firstChild ||
                startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3+ 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4+ 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5+ 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*6+ 6}"]`).firstChild ||
                startId + width - 1 === targetId ||
                startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
                startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2- 2}"]`).firstChild ||
                startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3- 3}"]`).firstChild ||
                startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3- 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4- 4}"]`).firstChild ||
                startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3- 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4- 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5- 5}"]`).firstChild ||
                startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3- 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4- 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5- 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*6- 6}"]`).firstChild

            ) {
                return true;
            }
            break;
        case "rook":
            if(
                startId + width === targetId ||
                startId + width*2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                startId + width*3 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2}"]`).firstChild ||
                startId + width*4 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3}"]`).firstChild ||
                startId + width*5 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4}"]`).firstChild ||
                startId + width*6 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5}"]`).firstChild ||
                startId + width*7 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*6}"]`).firstChild ||
                startId - width === targetId ||
                startId - width*2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                startId - width*3 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2}"]`).firstChild ||
                startId - width*4 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3}"]`).firstChild ||
                startId - width*5 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4}"]`).firstChild ||
                startId - width*6 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5}"]`).firstChild ||
                startId - width*7 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*6}"]`).firstChild ||
                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
                startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
                startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild ||
                startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||
                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
                startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
                startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
                startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild ||
                startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild
            ){
                return true
            }
            break;
        case "queen":
            if(
                startId + width + 1 === targetId ||
                startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
                startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2+ 2}"]`).firstChild ||
                startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3+ 3}"]`).firstChild ||
                startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3+ 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4+ 4}"]`).firstChild ||
                startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3+ 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4+ 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5+ 5}"]`).firstChild ||
                startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3+ 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4+ 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5+ 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*6+ 6}"]`).firstChild ||
                startId - width - 1 === targetId ||
                startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild ||
                startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2- 2}"]`).firstChild ||
                startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3- 3}"]`).firstChild ||
                startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3- 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4- 4}"]`).firstChild ||
                startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3- 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4- 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5- 5}"]`).firstChild ||
                startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3- 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4- 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5- 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*6- 6}"]`).firstChild ||
                startId - width + 1 === targetId ||
                startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild ||
                startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2+ 2}"]`).firstChild ||
                startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3+ 3}"]`).firstChild ||
                startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3+ 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4+ 4}"]`).firstChild ||
                startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3+ 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4+ 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5+ 5}"]`).firstChild ||
                startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3+ 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4+ 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5+ 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*6+ 6}"]`).firstChild ||
                startId + width - 1 === targetId ||
                startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
                startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2- 2}"]`).firstChild ||
                startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3- 3}"]`).firstChild ||
                startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3- 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4- 4}"]`).firstChild ||
                startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3- 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4- 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5- 5}"]`).firstChild ||
                startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3- 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4- 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5- 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*6- 6}"]`).firstChild ||
                startId + width === targetId ||
                startId + width*2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                startId + width*3 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2}"]`).firstChild ||
                startId + width*4 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3}"]`).firstChild ||
                startId + width*5 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4}"]`).firstChild ||
                startId + width*6 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5}"]`).firstChild ||
                startId + width*7 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*6}"]`).firstChild ||
                startId - width === targetId ||
                startId - width*2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                startId - width*3 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2}"]`).firstChild ||
                startId - width*4 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3}"]`).firstChild ||
                startId - width*5 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4}"]`).firstChild ||
                startId - width*6 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5}"]`).firstChild ||
                startId - width*7 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*6}"]`).firstChild ||
                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
                startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
                startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild ||
                startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||
                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
                startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
                startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
                startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild ||
                startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild
            ){
                return true
            }
            break;
        case "king":
            if(
                startId + width === targetId ||
                startId + width + 1 === targetId ||
                startId + 1 === targetId ||
                startId - width + 1 === targetId ||
                startId - width === targetId ||
                startId - width - 1 === targetId ||
                startId - 1 === targetId ||
                startId + width - 1 === targetId
            ){
                return true
            }
            break;
}}

function changePlayer(){
    if(playerGo==="black"){
        reverseIds()
        playerGo="white"
    }else{
        revertIds()
        playerGo="black"
    }    
    playerDisplay.textContent=playerGo

}   

function reverseIds(){
    const allSquares=document.querySelectorAll(".square")
    allSquares.forEach((square,i)=>{
        square.setAttribute("square-id",(width*width-1)-i)
    })
}

function revertIds(){
    const allSquares=document.querySelectorAll(".square")
    allSquares.forEach((square,i)=>{
        square.setAttribute("square-id",i)
    })
}

function checkForWin(){
    const kings=Array.from(document.querySelectorAll("#king"))
    if(!kings.some(king => king.firstChild.classList.contains("white"))){
        const allSquares=document.querySelectorAll(".square")
        allSquares.forEach(square=>{
            square.firstChild?.setAttribute("draggable",false)
        })
        document.querySelector("#text").innerHTML="Black Player Wins!!"

    }
    if(!kings.some(king => king.firstChild.classList.contains("black"))){
        const allSquares=document.querySelectorAll(".square")
        allSquares.forEach(square=>{
            square.firstChild?.setAttribute("draggable",false)
        })
        document.querySelector("#text").innerHTML="White Player Wins!!"

    }
}
