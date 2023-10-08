// Shop Button (Não está em programação funcional)
const openShopButtons = document.querySelectorAll('[data-shop-target]') //retorna os elementos que possuem o atributo data-shop-target(vai servir para abrir a loja)
const closeShopButtons = document.querySelectorAll('[data-close-button]') //retorna os elementos que possuem o atributo data-close-button(vai servir para fechar a loja)
const overlay = document.getElementById('overlay') //retorna o elemento que possui o id overlay

//espera o botão de abrir loja ser apertado, seleciona elementos com o valor de data-shopTarget e os abre utilizando a função openShop
openShopButtons.forEach(button => {
  button.addEventListener('click', () => {
    const shop = document.querySelector(button.dataset.shopTarget)
    openShop(shop)
  })
})

//fecha a loja quando o overlay é clickado (utilizando a função closeShop)
overlay.addEventListener('click', () => {
  const shops = document.querySelectorAll('.shop.active')
  shops.forEach(shop => {
    closeShop(shop)
  })
})

//espera o botão de fechar loja ser apertado, seleciona o elemento mais próximo com o valor shop e o fecha com a função closeShop
closeShopButtons.forEach(button => {
  button.addEventListener('click', () => {
    const shop = button.closest('.shop')
    closeShop(shop)
  })
})

// Ambas as funções abaixo determinam o estado da janela a loja (aberta ou fechada).
//Nesta, é adicionado o 'active', declarando assim que a janela está aberta.
function openShop(shop) {
  if (shop == null) return
  shop.classList.add('active')
  overlay.classList.add('active')
}

//Nesta, é removido o 'active', quando a janela é fechada.
function closeShop(shop) {
  if (shop == null) return
  shop.classList.remove('active')
  overlay.classList.remove('active')
}

//Faz tocar a música 1
var music1 = document.getElementById('music1')
var playPauseButton1 = document.getElementById('playPauseButton1')
var count1 = 0
function playPause1() {
    if(count1 == 0) {
        count1 = 1;
        music1.play()
        playPauseButton1.innerHTML = "Pause &#9208;"
    }
    else {
        count1 = 0
        music1.pause()
        playPauseButton1.innerHTML = "Play &#9655;"
    }
}

//Faz tocar a música 2
var music2 = document.getElementById('music2')
var playPauseButton2 = document.getElementById('playPauseButton2')
var count2 = 0
function playPause2() {
    if(count2 == 0) {
        count2 = 1;
        music2.play()
        playPauseButton2.innerHTML = "Pause &#9208;"
    }
    else {
        count2 = 0
        music2.pause()
        playPauseButton2.innerHTML = "Play &#9655;"
    }
}

//Faz tocar a música 3
var music3 = document.getElementById('music3')
var playPauseButton3 = document.getElementById('playPauseButton3')
var count3 = 0
function playPause3() {
    if(count3 == 0) {
        count3 = 1;
        music3.play()
        playPauseButton3.innerHTML = "Pause &#9208;"
    }
    else {
        count3 = 0
        music3.pause()
        playPauseButton3.innerHTML = "Play &#9655;"
    }
}


let canvas = document.querySelector("#tetris-board"); // Conecta o canvas do html ao js
let scoreboard = document.querySelector("h2");
let ctx = canvas.getContext("2d");  // Atribui ao contexto do jogo 2d
ctx.scale(30,30);  // Dimensionamento do quadro de jogo



// Estruturação das peças do jogo em seus diferentes formatos
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

// Atribui diferentes cores às peças
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

const ROWS = 19;  // Número de linhas do quadro de jogo
const COLS = 10;  // Número de colunas do quadro de jogo

// Quando deixamos de forma funcional, o código não funciona de maneira correta.
let grid = generateGrid();   //Variável para a geração do plano de jogo
let fallingPieceObj = null; 
let score = 0;  //Contagem inicial da pontuação

// EStebelece o reinício do quadro de jogo para uma nova partida
setInterval(newGameState,500);
function newGameState(){
    checkGrid();
    if(!fallingPieceObj){
        fallingPieceObj = randomPieceObject();
        renderPiece();
    }
    moveDown();
}

// Função de verificação para os quadrados que estão preechidos ou não 
function checkGrid() {
    const updatedGrid = grid.reduce((newGrid, row) => {
      const allFilled = row.every((cell) => cell !== 0);
      if (!allFilled) {
        newGrid.push([...row]);
      }
      return newGrid;
    }, []);
  
    const rowsCleared = grid.length - updatedGrid.length;
    
    // Sistema de pontuação por linhas completadas
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
    
    // Mecanismo de soma de pontuação diante das linhas que são completadas durante a partida
    score += scoreIncrease;
    scoreboard.innerHTML = "Score: " + score;
    const emptyRows = Array.from({ length: rowsCleared }, () => [0,0,0,0,0,0,0,0,0,0,]);
    grid = [...emptyRows, ...updatedGrid];
}
  
// Função responsável pela geração do plano de jogo, onde as peças podem percorrer durante a partida.
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

// Função responsável pela geração automática e aleatória(dentre as possíveis) das peças no decorrer da partida.
function randomPieceObject(){
    const ran = Math.floor(Math.random()*7);
    const piece = SHAPES[ran];
    const colorIndex = ran+1;
    const x = 4;
    const y = 0;
    return {piece,colorIndex,x,y}
}

// Renderiza a peça no quadro de jogo após ela ser gerada.
function renderPiece() {
    const piece = fallingPieceObj.piece;
    const renderedPiece = piece.flatMap((row, i) =>
      row.map((cell, j) => ({
        cell,
        x: fallingPieceObj.x + j,
        y: fallingPieceObj.y + i,
      }))
    );

    //
    renderedPiece.filter(({ cell }) => cell === 1).forEach(({ x, y }) => {
        ctx.fillStyle = COLORS[fallingPieceObj.colorIndex];
        ctx.fillRect(x, y, 1, 1);
      });
  }
  
// Adiciona a capacidade de movimentação da peça para BAIXO, como a peça já se move para baixo naturalmente, este comando aumenta a velocidade de queda da peça.
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
    
    // Emite um alerta quando o teto máximo do quadro de jogo colide com uma peça, informando o final do partida, você perdeu :(
    const handleGameOver = () => {
      if (fallingPieceObj.y === 0) {
        alert("Game over");
        grid = generateGrid();
        score = 0;
      }
    };
    
    //Verifica a possibilidade de mover a peça para baixo, caso sim, continua a partida, caso não, emite o alerta de fim de jogo.
    if (canMoveDown) {
      movePieceDown();
    } else {
      placePieceOnGrid();
      handleGameOver();
      fallingPieceObj = null;
    }
  
    renderGame();
}
  
// Adiciona a capacidade de movimentação da peça para a ESQUERDA.
function moveLeft(){
    const canMoveRight = !collision(fallingPieceObj.x - 1, fallingPieceObj.y);
  
    if (canMoveRight) {
      fallingPieceObj = { ...fallingPieceObj, x: fallingPieceObj.x - 1 };
    }
  
    renderGame();
}

// Adiciona a capacidade de movimentação da peça para a DIREITA.
function moveRight() {
    const canMoveRight = !collision(fallingPieceObj.x + 1, fallingPieceObj.y);
  
    if (canMoveRight) {
      fallingPieceObj = { ...fallingPieceObj, x: fallingPieceObj.x + 1 };
    }
  
    renderGame();
}
  
// Adiciona a capacidade de ROTAÇÃO da peça.
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
  
// Estabelece os limites de colisão das peças com as paredes, para que as peças permaneçam no quadro de jogo.
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

// Renderiza o jogo
function renderGame(){
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[i].length;j++){
            ctx.fillStyle = COLORS[grid[i][j]];
            ctx.fillRect(j,i,1,1)
        }
    }
    renderPiece();
}

// Atibui os comandos no teclado para efutuar as movimentações da peça em jogo.
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
  
