// Shop Button (Não está em programção funcional)
const openShopButtons = document.querySelectorAll('[data-shop-target]') 
const closeShopButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openShopButtons.forEach(button => {
  button.addEventListener('click', () => {
    const shop = document.querySelector(button.dataset.shopTarget)
    openShop(shop)
  })
})

overlay.addEventListener('click', () => {
  const shops = document.querySelectorAll('.shop.active')
  shops.forEach(shop => {
    closeShop(shop)
  })
})

closeShopButtons.forEach(button => {
  button.addEventListener('click', () => {
    const shop = button.closest('.shop')
    closeShop(shop)
  })
})

function openShop(shop) {
  if (shop == null) return
  shop.classList.add('active')
  overlay.classList.add('active')
}

function closeShop(shop) {
  if (shop == null) return
  shop.classList.remove('active')
  overlay.classList.remove('active')
}



let canvas = document.querySelector("#tetris-board");
let scoreboard = document.querySelector("h2");
let ctx = canvas.getContext("2d");
ctx.scale(30,30);




const SHAPES = [
    [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
    ],
    [
        [0,1,0],  
        [0,1,0],  
        [1,1,0]   
    ],
    [
        [0,1,0],
        [0,1,0],
        [0,1,1]
    ],
    [
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],
    [
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ],
    [
        [1,1,1],
        [0,1,0],
        [0,0,0]
    ],
    [
        [1,1],
        [1,1],
    ]
]

const COLORS = [
    "#fff",
    "#9b5fe0",
    "#16a4d8",
    "#60dbe8",
    "#8bd346",
    "#efdf48",
    "#f9a52c",
    "#d64e12"
]

const ROWS = 20;
const COLS = 10;

let grid = generateGrid();
let fallingPieceObj = null;
let score = 0;

setInterval(newGameState,500);
function newGameState(){
    checkGrid();
    if(!fallingPieceObj){
        fallingPieceObj = randomPieceObject();
        renderPiece();
    }
    moveDown();
}

function checkGrid() {
    const updatedGrid = grid.reduce((newGrid, row) => {
      const allFilled = row.every((cell) => cell !== 0);
      if (!allFilled) {
        newGrid.push([...row]);
      }
      return newGrid;
    }, []);
  
    const rowsCleared = grid.length - updatedGrid.length;
  
    let scoreIncrease = 0;
    if (rowsCleared === 1) {
      scoreIncrease = 10;
    } else if (rowsCleared === 2) {
      scoreIncrease = 30;
    } else if (rowsCleared === 3) {
      scoreIncrease = 50;
    } else if (rowsCleared > 3) {
      scoreIncrease = 100;
    }
  
    score += scoreIncrease;
    scoreboard.innerHTML = "Score: " + score;
    const emptyRows = Array.from({ length: rowsCleared }, () => [0,0,0,0,0,0,0,0,0,0,]);
    grid = [...emptyRows, ...updatedGrid];
  }
  

function generateGrid(i = 0, grid = []){
    if( i >= ROWS) return grid
    else{
        grid.push([])
        const generateGridCol = (i, j = 0, grid) =>{
            if(j >= COLS) return grid
            else{
                grid[i].push(0)
                return generateGridCol(i, j + 1, grid)
            }
        }
        generateGridCol(i,0,grid)
        return generateGrid(i + 1,grid)
    }
}


function randomPieceObject(){
    const ran = Math.floor(Math.random()*7);
    const piece = SHAPES[ran];
    const colorIndex = ran+1;
    const x = 4;
    const y = 0;
    return {piece,colorIndex,x,y}
}

function renderPiece() {
    const piece = fallingPieceObj.piece;
    const renderedPiece = piece.flatMap((row, i) =>
      row.map((cell, j) => ({
        cell,
        x: fallingPieceObj.x + j,
        y: fallingPieceObj.y + i,
      }))
    );
  
    renderedPiece.filter(({ cell }) => cell === 1).forEach(({ x, y }) => {
        ctx.fillStyle = COLORS[fallingPieceObj.colorIndex];
        ctx.fillRect(x, y, 1, 1);
      });
  }
  

function moveDown() {
    const canMoveDown = !collision(fallingPieceObj.x, fallingPieceObj.y + 1);
  
    const movePieceDown = () => {
      fallingPieceObj.y += 1;
    };
  
    const placePieceOnGrid = () => {
      const piece = fallingPieceObj.piece;
      for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece[i].length; j++) {
          if (piece[i][j] === 1) {
            const p = fallingPieceObj.x + j;
            const q = fallingPieceObj.y + i;
            grid[q][p] = fallingPieceObj.colorIndex;
          }
        }
      }
    };
  
    const handleGameOver = () => {
      if (fallingPieceObj.y === 0) {
        alert("Game over");
        grid = generateGrid();
        score = 0;
      }
    };
  
    if (canMoveDown) {
      movePieceDown();
    } else {
      placePieceOnGrid();
      handleGameOver();
      fallingPieceObj = null;
    }
  
    renderGame();
  }
  

function moveLeft(){
    const canMoveRight = !collision(fallingPieceObj.x - 1, fallingPieceObj.y);
  
    if (canMoveRight) {
      fallingPieceObj = { ...fallingPieceObj, x: fallingPieceObj.x - 1 };
    }
  
    renderGame();
}

function moveRight() {
    const canMoveRight = !collision(fallingPieceObj.x + 1, fallingPieceObj.y);
  
    if (canMoveRight) {
      fallingPieceObj = { ...fallingPieceObj, x: fallingPieceObj.x + 1 };
    }
  
    renderGame();
  }
  

function rotate() {
    const piece = fallingPieceObj.piece;
    const transposeMatrix = (matrix) => matrix[0].map((_, i) => matrix.map((row) => row[i]));
    const reverseRows = (matrix) => matrix.map((row) => row.reverse());
    const rotatedPiece = reverseRows(transposeMatrix([...piece]));
    if (!collision(fallingPieceObj.x, fallingPieceObj.y, rotatedPiece)) {
      fallingPieceObj.piece = rotatedPiece;
    }
  
    renderGame();
  }
  

function collision(x, y, rotatedPiece) {
    const piece = rotatedPiece || fallingPieceObj.piece;
  
    const hasCollision = piece.some((row, i) =>
      row.some((cell, j) => {
        const p = x + j;
        const q = y + i;
        return (
          (cell === 1 &&
            ((p < 0 || p >= COLS || q >= ROWS) || (q >= 0 && grid[q][p] > 0)))
        );
      })
    );
  
    return hasCollision;
  }

function renderGame(){
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[i].length;j++){
            ctx.fillStyle = COLORS[grid[i][j]];
            ctx.fillRect(j,i,1,1)
        }
    }
    renderPiece();
}

document.addEventListener("keydown",function(e){
    let key = e.key;
    if(key == "ArrowDown"){
        moveDown();
    }else if(key == "ArrowLeft"){
        moveLeft();
    }else if(key == "ArrowRight"){
        moveRight();
    }else if(key == "ArrowUp"){
        rotate();
    }
})
  


  
