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
//Realiza a compra dos itens na loja
function comprar(item) {
  if (item == 'music1') {
    let valorNaLoja = document.querySelector('#credito')
    if (parseInt(valorNaLoja.innerHTML) >= 250) {
      const musicaComprada = document.querySelector('#music1')
      musicaComprada.classList.add('comprado')
      const button = document.querySelector('#buttonmusic1')
      button.parentNode.removeChild(button)
      valorNaLoja.innerHTML -= 250
      const textoColorir = document.querySelector('#texto-music1')
      textoColorir.style.color = 'green'
    }
    else alert('Você não tem saldo')

  }
  else if (item == 'music2') {
    let valorNaLoja = document.querySelector('#credito')
    if (parseInt(valorNaLoja.innerHTML) >= 250) {
      const musicaComprada = document.querySelector('#music2')
      musicaComprada.classList.add('comprado')
      const button = document.querySelector('#buttonmusic2')
      button.parentNode.removeChild(button)
      valorNaLoja.innerHTML -= 250
      const textoColorir = document.querySelector('#texto-music2')
      textoColorir.style.color = 'green'
    }
  }
  else if (item == 'music3') {
    let valorNaLoja = document.querySelector('#credito')
    if (parseInt(valorNaLoja.innerHTML) >= 250) {
      const musicaComprada = document.querySelector('#music3')
      musicaComprada.classList.add('comprado')
      const button = document.querySelector('#buttonmusic3')
      button.parentNode.removeChild(button)
      valorNaLoja.innerHTML -= 250
      const textoColorir = document.querySelector('#texto-music3')
      textoColorir.style.color = 'green'
    }
  }
  else if (item == 'bk1') {
    let valorNaLoja = document.querySelector('#credito')
    if (parseInt(valorNaLoja.innerHTML) >= 250) {
      const musicaComprada = document.querySelector('#texto-bk1')
      musicaComprada.classList.add('comprado')
      const button = document.querySelector('#button-bk1')
      button.parentNode.removeChild(button)
      valorNaLoja.innerHTML -= 250
      const textoColorir = document.querySelector('#texto-bk1')
      textoColorir.style.color = 'green'
    }
  }
  else if (item == 'bk2') {
    let valorNaLoja = document.querySelector('#credito')
    if (parseInt(valorNaLoja.innerHTML) >= 250) {
      const musicaComprada = document.querySelector('#texto-bk2')
      musicaComprada.classList.add('comprado')
      const button = document.querySelector('#button-bk2')
      button.parentNode.removeChild(button)
      valorNaLoja.innerHTML -= 250
      const textoColorir = document.querySelector('#texto-bk2')
      textoColorir.style.color = 'green'
    }
  }
  else if (item == 'bk3') {
    let valorNaLoja = document.querySelector('#credito')
    if (parseInt(valorNaLoja.innerHTML) >= 250) {
      const musicaComprada = document.querySelector('#texto-bk3')
      musicaComprada.classList.add('comprado')
      const button = document.querySelector('#button-bk3')
      button.parentNode.removeChild(button)
      valorNaLoja.innerHTML -= 250
      const textoColorir = document.querySelector('#texto-bk3')
      textoColorir.style.color = 'green'
    }
  }
  else if (item == 'bk4') {
    let valorNaLoja = document.querySelector('#credito')
    if (parseInt(valorNaLoja.innerHTML) >= 250) {
      const musicaComprada = document.querySelector('#texto-bk4')
      musicaComprada.classList.add('comprado')
      const button = document.querySelector('#button-bk4')
      button.parentNode.removeChild(button)
      valorNaLoja.innerHTML -= 250
      const textoColorir = document.querySelector('#texto-bk4')
      textoColorir.style.color = 'green'
    }
  }
}

//atualiza o seus créditos na loja
function scoreShop(scoreAtual) {
  let valorNaLoja = document.querySelector('#credito')
  const valorNaLojaAtualizado = parseInt(valorNaLoja.innerHTML) + scoreAtual
  valorNaLoja.innerHTML = valorNaLojaAtualizado.toString()
}


//Indica se a música deve ser tocada ou pausada.
const playPause = (musicId, buttonId, play) => {
  const music = document.getElementById(musicId);
  const button = document.getElementById(buttonId);

  if (play) {
    music.play();
    button.innerHTML = "Pause &#9208;";
  } else {
    music.pause();
    button.innerHTML = "Play &#9655;";
  }
}

//Faz tocar a música 1 e pausa a 2 e a 3
function playPause1() {
  const isPlaying1 = document.getElementById('music1').currentTime > 0 && !document.getElementById('music1').paused && !document.getElementById('music1').ended && document.getElementById('music1').readyState > 2;

  playPause('music1', 'playPauseButton1', !isPlaying1);
  playPause('music2', 'playPauseButton2', false);
  playPause('music3', 'playPauseButton3', false);
}

//Faz tocar a música 2 e pausa a 1 e a 3
function playPause2() {
  const isPlaying2 = document.getElementById('music2').currentTime > 0 && !document.getElementById('music2').paused && !document.getElementById('music2').ended && document.getElementById('music2').readyState > 2;

  playPause('music1', 'playPauseButton1', false);
  playPause('music2', 'playPauseButton2', !isPlaying2);
  playPause('music3', 'playPauseButton3', false);
}

//Faz tocar a música 3 e pausa a 1 e a 2
function playPause3() {
  const isPlaying3 = document.getElementById('music3').currentTime > 0 && !document.getElementById('music3').paused && !document.getElementById('music3').ended && document.getElementById('music3').readyState > 2;

  playPause('music1', 'playPauseButton1', false);
  playPause('music2', 'playPauseButton2', false);
  playPause('music3', 'playPauseButton3', !isPlaying3);
}


//Muda o background a partir da loja
function backGroundChange(cor) {
  const newBackground = cor
  if (cor == 'cyan') {
    body = document.querySelector('body')
    body.style.backgroundColor = '#0bbae6ec'
    body.style.background = '#0bbae6ec'
    red = document.querySelector('#red')
    red.style.color = 'red'
    orange = document.querySelector('#orange')
    orange.style.color = 'orange'
    yellow = document.querySelector('#yellow')
    yellow.style.color = 'yellow'
    green = document.querySelector('#green')
    green.style.color = 'green'
    cyan = document.querySelector('#cyan')
    cyan.style.color = 'cyan'
    blue = document.querySelector('#blue')
    blue.style.color = 'blue'
  }
  else if (cor == 'padrao') {
    body = document.querySelector('body')
    body.style.backgroundColor = '#040009ec'
    body.style.background = '#040009ec'
    red = document.querySelector('#red')
    red.style.color = 'red'
    orange = document.querySelector('#orange')
    orange.style.color = 'orange'
    yellow = document.querySelector('#yellow')
    yellow.style.color = 'yellow'
    green = document.querySelector('#green')
    green.style.color = 'green'
    cyan = document.querySelector('#cyan')
    cyan.style.color = 'cyan'
    blue = document.querySelector('#blue')
    blue.style.color = 'blue'
  }
  else if (cor == 'gradient') {
    body = document.querySelector('body')
    body.style.backgroundColor = 'none'
    body.style.background = 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab'
    red = document.querySelector('#red')
    red.style.color = 'red'
    orange = document.querySelector('#orange')
    orange.style.color = 'orange'
    yellow = document.querySelector('#yellow')
    yellow.style.color = 'yellow'
    green = document.querySelector('#green')
    green.style.color = 'green'
    cyan = document.querySelector('#cyan')
    cyan.style.color = 'cyan'
    blue = document.querySelector('#blue')
    blue.style.color = 'blue'
  }
  else if (cor == 'bw') {
    body = document.querySelector('body')
    body.style.backgroundColor = 'black'
    body.style.background = 'black'
    const mudar = Array.from(document.querySelectorAll('span.blwh'))
    mudar.map(element => element.style.color = 'white')
  }
}

const canvas = document.querySelector("#tetris-board"); // Conecta o canvas do html ao js
const scoreboard = document.querySelector("h2");
const ctx = canvas.getContext("2d");  // Atribui ao contexto do jogo 2d
ctx.scale(30, 30);  // Dimensionamento do quadro de jogo


// Estruturação das peças do jogo em seus diferentes formatos
const SHAPES = [
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0]
  ],
  [
    [1, 1],
    [1, 1],
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

// Quando deixamos de forma funcional, o código não funciona da maneira correta.
let grid = generateGrid();   //Variável para a geração do plano de jogo
let fallingPieceObj = null;
let score = 0;  //Contagem inicial da pontuação

// EStebelece o reinício do quadro de jogo para uma nova partida
setInterval(newGameState, 500);
function newGameState() {
  checkGrid();
  if (!fallingPieceObj) {
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
  const emptyRows = Array.from({ length: rowsCleared }, () => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]);
  grid = [...emptyRows, ...updatedGrid];
}

// Função responsável pela geração do plano de jogo, onde as peças podem percorrer durante a partida.
function generateGrid(i = 0, grid = []) {
  if (i >= ROWS) return grid
  else {
    grid.push([])
    const generateGridCol = (i, j = 0, grid) => {
      if (j >= COLS) return grid
      else {
        grid[i].push(0)
        return generateGridCol(i, j + 1, grid)
      }
    }
    generateGridCol(i, 0, grid)
    return generateGrid(i + 1, grid)
  }
}

// Função responsável pela geração automática e aleatória(dentre as possíveis) das peças no decorrer da partida.
function randomPieceObject() {
  const ran = Math.floor(Math.random() * 7);
  const piece = SHAPES[ran];
  const colorIndex = ran + 1;
  const x = 4;
  const y = 0;
  return { piece, colorIndex, x, y }
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

  //Filtra os quadrados que estão preenchidos na matriz, para desenhá-los e preenchê-los com a devida cor.
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

  //Coloca a peça na quadro de jogo nas coordenadas x e y, colorindo os quadrados.
  const placePieceOnGrid = () => {
    const { piece, x, y, colorIndex } = fallingPieceObj;
    piece.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 1) {
          grid[y + i][x + j] = colorIndex;
        }
      });
    });
  };

  // Emite um alerta quando o teto máximo do quadro de jogo colide com uma peça, informando o final do partida.
  const handleGameOver = () => {
    if (fallingPieceObj.y === 0) {
      alert("GAME OVER");
      grid = generateGrid();
      scoreShop(score)
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
function moveLeft() {
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

// Desenha a peça na posição (i, j).
function renderCell(i, j) {
  ctx.fillStyle = COLORS[grid[i][j]];
  ctx.fillRect(j, i, 1, 1);
}

// Desenha a linha do quadro de jogo.
function renderRow(row, i) {
  row.forEach((cell, j) => renderCell(i, j));
}

// Chama a função anterior, e com ela rederiza todas as linhas que compõem o quadro do jogo. 
function renderGame() {
  grid.forEach(renderRow);
  renderPiece();
}

// Atibui os comandos no teclado para efutuar as movimentações da peça em jogo.
document.addEventListener("keydown", function (e) {
  let key = e.key;
  if (key == "ArrowDown") {
    moveDown();
  } else if (key == "ArrowLeft") {
    moveLeft();
  } else if (key == "ArrowRight") {
    moveRight();
  } else if (key == "ArrowUp") {
    rotate();
  }
})

