console.log('yew!');
const gameBoard = document.getElementById('game-board');
const dropZone = document.getElementById('drop-zone');
const messageZone = document.getElementById('message-zone');

const RED = '🔴';
const BLUE = '🔵';
const upperBoundCol = 6;
const upperBoundRow = 5;
const lowerBoundRowAndCol = 0;

// rename this to boardState
const boardModelArray = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

let gameStart = true;
let gamePlay = true;
let haveWinner = false;
let isGameDraw = false;
let redIsNext = true;
let chipValue = redIsNext ? RED : BLUE;
let clicks = 0; // max is <= 49 this prevents the game from working if all the squares are filled up.

const setGameMessage = (element, msg) => (element.textContent = msg);
const setNextChipValue = (redIsNext) => (chipValue = redIsNext ? RED : BLUE);
const winnerIs = (chpVal) => (chpVal === RED ? 'Red' : 'Blue');

const messageFactory = (currState) => {
  const {
    state,
    chipValue
  } = currState;

  const gamePlayMessages = [
    'Good move! Chuck 🥋 Norris bows to you with humility 🙏',
    'Your move just put Einstein 🧠 to shame 👊',
    'Yoda 🧙 comes to you for advice 🦉 with the move you just made',
    'A sagely 🧘 move right there!',
    "There's unstoppable 🛑 and then there's you 👈",
    "🕺This isn't amateur night for sure with those kind of moves💃",
    'Call the fire department 🚒 your move just made some 🔥',
    'Mensa is like 🎒pre-school 🎓 for you! Great move!',
  ];

  const roll = (min, max, floatFlag) => {
    let r = Math.random() * (max - min) + min;
    return floatFlag ? r : Math.floor(r);
  };

  switch (state) {
    case 'gameStart': {
      return `Hi there! Are you ready to play?`;
      break;
    }
    case 'gamePlay': {
      return gamePlayMessages[roll(0, gamePlayMessages.length)];
      break;
    }
    case 'haveWinner': {
      return `🎉 WOOOHOOO! ${chipValue} won! 🍾`;
      break;
    }
    case 'isGameDraw': {
      return `🙅 It's a draw. Nobody wins 🙅`;
      break;
    }
    default: {
      return `Do you want to play again?`;
      break;
    }
  }
};

function createDropZoneSquare(i) {
  const square = document.createElement('div');
  square.className = 'square-drop-zone';
  square.id = `${i}`;
  // square.setAttribute('data-column', `${i}`);
  return square;
}

// creates individual squares
function createSquare(i, j) {
  const square = document.createElement('div');
  square.className = 'square';
  square.setAttribute('data-cell', `${i},${j}`);
  return square;
}

//creates dropzone
function createDropZone(squares) {
  dropZone.appendChild(squares);
}

// createst the game board
function createBoard(squares) {
  gameBoard.appendChild(squares);
}

for (let i = 0; i < 7; i++) {
  createDropZone(createDropZoneSquare(i));
}

for (let i = 0; i < boardModelArray.length; i++) {
  for (let j = 0; j < boardModelArray[i].length; j++) {
    createBoard(createSquare(i, j));
  }
}

function setChipOnDOM(boardModel, rowVal, columnVal) {
  const cell = document.querySelector(
    `.square[data-cell="${rowVal},${columnVal}"]`
  );
  cell.textContent = boardModel[rowVal][columnVal];
}

function checkNullCount(dropChipOnColumn) {
  let numNull = 0;
  for (let i = 0; i < boardModelArray.length; i++) {
    if (boardModelArray[i][dropChipOnColumn] === null) numNull++;
  }
  return numNull - 1; // this value represents the i-value because Column-value is the column value from the DOM
}

// place chip on gameboard
function dropChip(e) {
  clicks++;
  const columnVal = +e.target.id;
  const rowVal = checkNullCount(columnVal); //this will be checkNullCount fn
  boardModelArray[rowVal][columnVal] = chipValue;
  setChipOnDOM(boardModelArray, rowVal, columnVal);
  const chipPosition = [rowVal, columnVal];

  if (checkWinner(boardModelArray, chipPosition, chipValue)) {
    // console.log(`Game over ${winnerIs(chipValue)} won! Yew!`);
    haveWinner = true;
    gamePlay = false;
    const currState = {
      state: 'haveWinner',
      chipValue: chipValue,
    };
    const message = messageFactory(currState);
    setGameMessage(messageZone, message);
    // remove listeners in dropzone
    // display reset game modal
    // if yes
    // init()
    // else
    // return
  } else if (clicks >= 49) {
    isGameDraw = true;
    const currState = {
      state: 'isGameDraw',
    };
    const message = messageFactory(currState);
    setGameMessage(messageZone, message);
    console.log('Game Draw! No winner!');
    // remove listeners in dropzone
    // display reset game modal
    // if yes
    // init()
    // else
  } else {
    // this works
    const currState = {
      state: 'gamePlay',
    };
    const message = messageFactory(currState);
    setGameMessage(messageZone, message);
    redIsNext = !redIsNext;
    setNextChipValue(redIsNext);
  }
}

function checkWinner(arr, chipPos, chipVal) {
  console.log('hi from checkWinner');
  return [
    checkXDir(arr, chipPos, chipVal),
    checkYDir(arr, chipPos, chipVal),
    checkQuadrants(arr, chipPos, chipVal),
  ].some((val) => val === true);
}

// works
function checkYDir(arr, chipPosition, chipValue) {
  console.log('hi from Ydir!');
  // "down" i++ j stays the same
  const [row, col] = chipPosition;

  if (row <= 2 && row >= lowerBoundRowAndCol) {
    return [
      arr[row][col],
      arr[row + 1][col],
      arr[row + 2][col],
      arr[row + 3][col],
    ].every((chpVal) => chpVal === chipValue);
  } else {
    return false;
  }
}

// this function works! Yew!
function checkXDir(arr, chipPosition, chipValue) {
  // from chipPosition
  // "left" = i stays the same j--
  // "right" = i stays the same j++
  const [row, col] = chipPosition;

  const sign =
    col >= lowerBoundRowAndCol && col <= 2 ?
    'positive' :
    col >= 4 && col <= 6 ?
    'negative' :
    'both';

  switch (sign) {
    case 'positive': {
      return [
        arr[row][col], // this represents the initial chip position (aka where the chip was "dropped" too)
        arr[row][col + 1],
        arr[row][col + 2],
        arr[row][col + 3],
      ].every((chpVal) => chpVal === chipValue);
      break;
    }

    case 'negative': {
      return [
        arr[row][col], // this represents the initial chip position (aka where the chip was "dropped" too)
        arr[row][col - 1],
        arr[row][col - 2],
        arr[row][col - 3],
      ].every((chpVal) => chpVal === chipValue);
      break;
    }
    case 'both': {
      // I'm using short circuit eval. I'm looking for a true value in either directions
      return (
        [
          arr[row][col], // this represents the initial chip position (aka where the chip was "dropped" too)
          arr[row][col + 1],
          arr[row][col + 2],
          arr[row][col + 3],
        ].every((chpVal) => chpVal === chipValue) || [
          arr[row][col], // this represents the initial chip position (aka where the chip was "dropped" too)
          arr[row][col - 1],
          arr[row][col - 2],
          arr[row][col - 3],
        ].every((chpVal) => chpVal === chipValue)
      );
      break;
    }
    default:
      return;
      break;
  }
}

function checkQuadrants(arr, chipPosition, chipValue) {
  console.log('hi from checkQuadrants!');
  const [row, col] = chipPosition;
  // check quadrant I
  // from chipPosition
  // up-right in inverse i-- j++
  if (row - 3 >= lowerBoundRowAndCol && col + 3 <= upperBoundCol) {
    return [
      arr[row][col],
      arr[row - 1][col + 1],
      arr[row - 2][col + 2],
      arr[row - 3][col + 3],
    ].every((chpVal) => chpVal === chipValue);
  }
  // check check quadrant II
  // from chipPosition
  // up-right in inverse i-- j--
  if (row - 3 >= lowerBoundRowAndCol && col - 3 >= lowerBoundRowAndCol) {
    return [
      arr[row][col],
      arr[row - 1][col - 1],
      arr[row - 2][col - 2],
      arr[row - 3][col - 3],
    ].every((chpVal) => chpVal === chipValue);
  }

  // check check quadrant III
  // from chipPosition
  // up-right in inverse i++ j--
  if (row + 3 <= upperBoundCol && col - 3 >= lowerBoundRowAndCol) {
    return [
      arr[row][col],
      arr[row + 1][col - 1],
      arr[row + 2][col - 2],
      arr[row + 3][col - 3],
    ].every((chpVal) => chpVal === chipValue);
  }
  // check check quadrant IV
  // from chipPosition
  // up-right in inverse i++ j++
  if (row + 3 <= upperBoundCol && col + 3 <= upperBoundCol) {
    return [
      arr[row][col],
      arr[row + 1][col + 1],
      arr[row + 2][col + 2],
      arr[row + 3][col + 3],
    ].every((chpVal) => chpVal === chipValue);
  }
}

dropZone.addEventListener('click', dropChip);