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

//General functions 
const id = x => x
// realiza a soma de dois parâmetros
const add = x => y => x + y
// recebe uma matriz bidimensional e devolve como resultado a sua matriz transposta
const transpose = matrix => matrix[0].map((col, i) => matrix.map(row => row[i]));
// recebe como parâmetro um array com subarrays e inverte a ordem dos elementos do subarray 
const mirror = arrayOfArrays => arrayOfArrays.map(subArray => subArray.reverse())
// a função pipe faz um encadeiamento de n funções em um parâmetro x qualquer 
const pipe = (...fs) => x => [...fs].reduce((acc, f) => f(acc), x)
// recebe uma função e um array como parâmetros e realiza um map no array 
const map = f => xs => xs.map(f)
//recebe um valor min e max e cria um array com os valores intermediários
const range = min => max => [...Array(max).keys()].map((_, i) => i + min)
// função que independente do seu segundo parâmetro sempre retorna o valor do primeiro, criando assim uma constante
const k = x => _ => x
// recebe como primeiro parâmetro um separador e como segundo um array o qual, para cada elemento do array tera como termo separador a string passada no primeiro parâmetro 
const join = s => xs => xs.join(s)
// recebe um valor e cria um array com n elemnetos iguais ao valor passado no primeiro parâmetro
const rep = value => numberOfRepetitions => map(k(value))(range(0)(numberOfRepetitions))
// recebe dois valores e realiza um concatenação entre eles 
const concat = x1 => x2 => x1.concat(x2)
// aplica uma função a cada um dos elementos de um array e passa o índice desse elemento como argumento para a função
const mapi = f => xs => xs.map((x, i) => f(x)(i))
// verifica se uma determinada condição e verdadeira, caso seja aplica a função t e caso seja falsa aplica a função f
const ifelse = condition => t => f => value => condition(value) ? t(value) : f(value)
//
const reduce = f => z => xs => xs.reduce((acc, x) => f(acc)(x), z)
//
const eq = x => y => x == y
//
const find = f => xs => xs.find(f)
//
const append = x => xs => [...xs, x]
//
const not = f => x => !f(x)
//
const and = x => y => x && y
//
const or = x => y => x || y
//
const all = f => pipe(map(f), reduce(and)(true))
//
const any = f => pipe(map(f), reduce(or)(false))
//
const flip = f => x => y => f(y)(x)
//
const filter = f => xs => xs.filter(f)
//
const gt = x => y => x > y
//
const lt = x => y => x < y
//
const prop = p => o => o[p]
//
const both = f => g => x => f(x) && g(x)

let canvas = document.querySelector('#tetris-board')
let ctx = canvas.getContext("2d");
ctx.scale(30, 30);
let scoreboard = document.querySelector("h2");


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

function checkGrid(){
    let count = 0;
    for(let i=0;i<grid.length;i++){
        let allFilled = true;
        for(let j=0;j<grid[0].length;j++){
            if(grid[i][j] == 0){
                allFilled = false
            }
        }
        if(allFilled){
            count++;
            grid.splice(i,1);
            grid.unshift([0,0,0,0,0,0,0,0,0,0]);
        }
    }
    if(count == 1){
        score+=10;
    }else if(count == 2){
        score+=30;
    }else if(count == 3){
        score+=50;
    }else if(count>3){
        score+=100
    }
    scoreboard.innerHTML = "Score: " + score;
}

function generateGrid(){
    let grid = [];
    for(let i=0;i<ROWS;i++){
        grid.push([]);
        for(let j=0;j<COLS;j++){
            grid[i].push(0)
        }
    }
    return grid;
}

function randomPieceObject(){
    let ran = Math.floor(Math.random()*7);
    let piece = SHAPES[ran];
    let colorIndex = ran+1;
    let x = 4;
    let y = 0;
    return {piece,colorIndex,x,y}
}

function renderPiece(){
    let piece = fallingPieceObj.piece;
    for(let i=0;i<piece.length;i++){
        for(let j=0;j<piece[i].length;j++){
            if(piece[i][j] == 1){
            ctx.fillStyle = COLORS[fallingPieceObj.colorIndex];
            ctx.fillRect(fallingPieceObj.x+j,fallingPieceObj.y+i,1,1);
        }
        }
    }
    renderGame();
}

function moveDown(){
    if(!collision(fallingPieceObj.x,fallingPieceObj.y+1))
        fallingPieceObj.y+=1;
    else{
        let piece = fallingPieceObj.piece
        for(let i=0;i<piece.length;i++){
            for(let j=0;j<piece[i].length;j++){
                if(piece[i][j] == 1){
                    let p = fallingPieceObj.x+j;
                    let q = fallingPieceObj.y+i;
                    grid[q][p] = fallingPieceObj.colorIndex;
                }
            }
        }
        if(fallingPieceObj.y == 0){
            alert("gamer over");
            grid = generateGrid();
            score = 0;
        }
        fallingPieceObj = null;
    }
    renderGame();
}

function moveLeft(){
    if(!collision(fallingPieceObj.x-1,fallingPieceObj.y))
        fallingPieceObj.x-=1;
    renderGame();
}

function moveRight(){
    if(!collision(fallingPieceObj.x+1,fallingPieceObj.y))
        fallingPieceObj.x+=1;
    renderGame();
}

function rotate(){
    let rotatedPiece = [];
    let piece = fallingPieceObj.piece;
    for(let i=0;i<piece.length;i++){
        rotatedPiece.push([]);
        for(let j=0;j<piece[i].length;j++){
            rotatedPiece[i].push(0);
        }
    }
    for(let i=0;i<piece.length;i++){
        for(let j=0;j<piece[i].length;j++){
            rotatedPiece[i][j] = piece[j][i]
        }
    }

    for(let i=0;i<rotatedPiece.length;i++){
        rotatedPiece[i] = rotatedPiece[i].reverse();
    }
    if(!collision(fallingPieceObj.x,fallingPieceObj.y,rotatedPiece))
        fallingPieceObj.piece = rotatedPiece
    renderGame()
}

function collision(x,y,rotatedPiece){
    let piece = rotatedPiece || fallingPieceObj.piece
    for(let i=0;i<piece.length;i++){
        for(let j=0;j<piece[i].length;j++){
            if(piece[i][j] == 1){
            let p = x+j;
            let q = y+i;
            if(p>=0 && p<COLS && q>=0 && q<ROWS){
                if(grid[q][p]>0){
                    return true;
                }
            }else{
                return true;
            }}
        }
    }
    return false;
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

  


  