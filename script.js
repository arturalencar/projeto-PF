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

const colors = [
  '#fff',
  '#9b5fe0',
  '#16a4d8',
  '#60dbe8',
  '#8bd346',
  '#efdf48',
  '#f9a52c',
  '#d64e12' 
]

const rows = 20;
const cols = 10;
const Pieces = [
  [
       [0,1,0,0],
       [0,1,0,0],
       [0,1,0,0],
       [0,1,0,0]
  ],
  [
       [1,1],
       [1,1]
  ],
  [
       [0,1,0],
       [1,1,1],
       [0,0,0]
  ],
  [
       [0,1,1],
       [1,1,0],
       [0,0,0]
  ],
  [
       [0,0,0],
       [1,1,0],
       [0,1,1]
  ],
  [
       [0,0,0],
       [1,1,1],
       [0,0,1]
  ],
  [
       [0,0,1],
       [1,1,1],
       [0,0,0]
  ],
]

let canvas = document.querySelector('#tetris-board')
let ctx = canvas.getContext("2d");
ctx.scale(30, 30);

;
const generateRandomPiece = () => {
  const ran = Math.floor(Math.random() * 7)
  const piece = Pieces[ran]
  const x = 4;
  const y = 0;
  const colorIndex = ran + 1
  return { piece, x, y, colorIndex }
}

const currentPiece = generateRandomPiece()


const objPiece = generateRandomPiece()


const renderPiece = ({piece, x, y, colorIndex}) =>
  piece.map((row, i) => row.map((element, j) => {if (element == 1) {
      ctx.fillStyle = colors[colorIndex]
      ctx.fillRect(j, i, 1, 1)
  } }))

renderPiece(objPiece)
  

const Matrix  = {}
Matrix.sum    = pipe(map(reduce(add)(0)), reduce(add)(0))
Matrix.toStr  = x => pipe(map(join(' ')), join('\r\n'))(x)
Matrix.row    = x => m => rep(x)(m[0].length)
Matrix.frame  = m => append(Matrix.row('▔')(m))(m)
Matrix.rotate = pipe(transpose, mirror)
Matrix.make   = rows => cols => rep(rep(0)(cols))(rows)
Matrix.mount  = f => pos => m1 => m2 =>
  mapi(row => y =>
    mapi(val => x =>
      (y >= pos.y && (y - pos.y < m1.length)) &&
      (x >= pos.x && (x - pos.x < m1[0].length))
      ? f(m1[y-pos.y][x-pos.x])(m2[y][x])
      : m2[y][x]
    )(row)
  )(m2)
    
const Random = {}
Random.pick = xs => xs[Math.floor(Math.random() * xs.length)]

const Player = {}
Player.move   = d => p => ({ ...p, x:p.x+(d.x||0), y:p.y+(d.y||0) })
Player.make   = () => ({ x: 3, y: 0 , piece: Piece.rand() }),
Player.rotate = p  => ({ ...p, piece: Matrix.rotate(p.piece) })

const State = {}
State.toMatrix = s => Board.mount(s.player)(s.board)
State.make = k({
  time:   0,
  wait:   15,
  board:  Matrix.make(22)(10),
  player: Player.make(),
})
State.movePlayer = f => s => {
  if (State.isAnimating(s)) return s
  let pre  = Board.mount(s.player)(s.board)
  let post = Board.mount(f(s.player))(s.board)
  let valid = Matrix.sum(pre) == Matrix.sum(post)
  return { ...s, player: valid ? f(s.player) : s.player }
}
State.moveLeft   = State.movePlayer(Player.move({ x: -1 }))
State.moveRight  = State.movePlayer(Player.move({ x: 1 }))
State.moveDown   = s => {
  if (State.isAnimating(s)) return s
  let s2 = State.movePlayer(Player.move({ y: 1 }))(s)
  return s2.player != s.player
    ? s2
    : {
      ...s,
      board:  Board.mount(s.player)(s.board),
      player: Player.make(),
    }
}
State.rotate = s =>
  State.isAnimating(s) ? s : ({
    ...s,
    player: (
      find(f =>
        Matrix.sum(Board.mount(f(s.player))(s.board)) ==
        Matrix.sum(Board.mount(s.player)(s.board))
      )([
        Player.rotate,
        pipe(Player.move({ x: 1 }), Player.rotate),
        pipe(Player.move({ x:-1 }), Player.rotate),
        pipe(Player.move({ x: 2 }), Player.rotate),
        pipe(Player.move({ x:-2 }), Player.rotate),
        id
      ])
    )(s.player)
  })
State.swipe = s => ({
  ...s,
  board: s.board.map(
    ifelse(
      all(both(flip(gt)(0))(flip(lt)(10)))
    )(
      k([10,12,14,16,18,18,16,14,12,10])
    )(id)
  )
})
State.clear = s => {
  let remains = filter(any(not(eq(-1))))(s.board)
  let count    = s.board.length - remains.length
  let newlines = rep(Matrix.row(0)(remains))(count)
  let board    = concat(newlines)(remains)
  return { ...s, board }
}
State.isAnimating = pipe(prop('board'), any(any(flip(gt)(9))))
State.animate = s => ({
  ...s,
  board: map(map(pipe(
    ifelse(flip(gt)(7))(add(1))(id),
    ifelse(flip(gt)(30))(k(-1))(id)
  )))(s.board)
})
State.timeToMove     = s => s.time % s.wait == 0
State.nextTime       = s => ({ ...s, time: s.time + 1})
State.maybeMoveDown  = ifelse(State.isAnimating)(id)(ifelse(State.timeToMove)(State.moveDown)(id))
State.next           = pipe(
  State.animate,
  State.nextTime,
  State.maybeMoveDown,
  State.clear,
  State.swipe,
)

const Board = {}
Board.mount = p => Matrix.mount(o => n => n != 0 ? n : o)(p)(p.piece)
Board.valid = b1 => b2 => Matrix.sum(b1) == Matrix.sum(b2)

// Key events
const readline = require('readline')
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') process.exit()
  switch (key.name.toUpperCase()) {
    case 'LEFT':  STATE = State.moveLeft(STATE);  break
    case 'RIGHT': STATE = State.moveRight(STATE); break
    case 'DOWN':  STATE = State.moveDown(STATE);  break
    case 'UP':    STATE = State.rotate(STATE);    break
  }
});

// Game loop
let STATE = State.make()
const step = () => STATE = State.next(STATE)
const show = () =>
  console.log('\x1Bc' + pipe(
    State.toMatrix,
    map(map(Piece.toStr)),
    Matrix.frame,
    Matrix.toStr,
  )(STATE))
setInterval(() => { step(); show() }, 30)
  
  