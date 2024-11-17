/*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll('.sqr'); 
const messageEl = document.querySelector('.message'); 
const resetBtnEl = document.getElementById('reset'); 


const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/
let board = ['', '', '', '', '', '', '', '', '']; 
let turn = 'X'; 
let winner = null;
let tie = false;

/*------------------------ Cached Element References ------------------------*/
console.log(squareEls);  
console.log(messageEl);  

/*-------------------------------- Functions --------------------------------*/
function init() {
  board = ['', '', '', '', '', '', '', '', '']; 
  turn = 'X'; 
  winner = null;
  tie = false;
  console.log('Game Initialized');
  render();
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((square, index) => {
    const squareEl = squareEls[index];
    squareEl.textContent = square; 
  });
}

function updateMessage() {
  if (winner) {
    messageEl.textContent = `${winner} wins!`;
  } else if (tie) {
    messageEl.textContent = "It's a tie!";
  } else {
    messageEl.textContent = `It's ${turn}'s turn.`;
  }
}

function handleClick(event) {
  const squareIndex = parseInt(event.target.id); 

  if (board[squareIndex] !== '' || winner || tie) return;
  
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

function placePiece(index) {
  board[index] = turn;
  console.log(board);
}

function checkForWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      winner = turn; 
      return;
    }
  }
}

function checkForTie() {
  if (!board.includes('')) {
    tie = true;
  }
}

function switchPlayerTurn() {
  if (winner) return;
  turn = turn === 'X' ? 'O' : 'X'; 
  console.log(turn);
}

/*----------------------------- Event Listeners -----------------------------*/
window.addEventListener("DOMContentLoaded", init);

document.querySelector('.board').addEventListener('click', function(event) {
  if (event.target.classList.contains('sqr')) {
    handleClick(event);
  }
});

resetBtnEl.addEventListener('click', init); 
