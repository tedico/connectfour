"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

console.log('yew!');
var gameBoard = document.getElementById('game-board');
var dropZone = document.getElementById('drop-zone');
var messageZone = document.getElementById('message-zone');
var RED = '🔴';
var BLUE = '🔵';
var upperBoundCol = 6;
var upperBoundRow = 5;
var lowerBoundRowAndCol = 0; // rename this to boardState

var boardModelArray = [[null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null]];
var gameStart = true;
var gamePlay = true;
var haveWinner = false;
var isGameDraw = false;
var redIsNext = true;
var chipValue = redIsNext ? RED : BLUE;
var clicks = 0; // max is <= 49 this prevents the game from working if all the squares are filled up.

var setGameMessage = function setGameMessage(element, msg) {
  return element.textContent = msg;
};

var setNextChipValue = function setNextChipValue(redIsNext) {
  return chipValue = redIsNext ? RED : BLUE;
};

var winnerIs = function winnerIs(chpVal) {
  return chpVal === RED ? 'Red' : 'Blue';
};

var messageFactory = function messageFactory(currState) {
  var state = currState.state,
      chipValue = currState.chipValue;
  var gamePlayMessages = ['Good move! Chuck 🥋 Norris bows to you with humility 🙏', 'Your move just put Einstein 🧠 to shame 👊', 'Yoda 🧙 comes to you for advice 🦉 with the move you just made', 'A sagely 🧘 move right there!', "There's unstoppable 🛑 and then there's you 👈", "🕺This isn't amateur night for sure with those kind of moves💃", 'Call the fire department 🚒 your move just made some 🔥', 'Mensa is like 🎒pre-school 🎓 for you! Great move!'];

  var roll = function roll(min, max, floatFlag) {
    var r = Math.random() * (max - min) + min;
    return floatFlag ? r : Math.floor(r);
  };

  switch (state) {
    case 'gameStart':
      {
        return "Hi there! Are you ready to play?";
        break;
      }

    case 'gamePlay':
      {
        return gamePlayMessages[roll(0, gamePlayMessages.length)];
        break;
      }

    case 'haveWinner':
      {
        return "\uD83C\uDF89 WOOOHOOO! ".concat(chipValue, " won! \uD83C\uDF7E");
        break;
      }

    case 'isGameDraw':
      {
        return "\uD83D\uDE45 It's a draw. Nobody wins \uD83D\uDE45";
        break;
      }

    default:
      {
        return "Do you want to play again?";
        break;
      }
  }
};

function createDropZoneSquare(i) {
  var square = document.createElement('div');
  square.className = 'square-drop-zone';
  square.id = "".concat(i); // square.setAttribute('data-column', `${i}`);

  return square;
} // creates individual squares


function createSquare(i, j) {
  var square = document.createElement('div');
  square.className = 'square';
  square.setAttribute('data-cell', "".concat(i, ",").concat(j));
  return square;
} //creates dropzone


function createDropZone(squares) {
  dropZone.appendChild(squares);
} // createst the game board


function createBoard(squares) {
  gameBoard.appendChild(squares);
}

for (var i = 0; i < 7; i++) {
  createDropZone(createDropZoneSquare(i));
}

for (var _i = 0; _i < boardModelArray.length; _i++) {
  for (var j = 0; j < boardModelArray[_i].length; j++) {
    createBoard(createSquare(_i, j));
  }
}

function setChipOnDOM(boardModel, rowVal, columnVal) {
  var cell = document.querySelector(".square[data-cell=\"".concat(rowVal, ",").concat(columnVal, "\"]"));
  cell.textContent = boardModel[rowVal][columnVal];
}

function checkNullCount(dropChipOnColumn) {
  var numNull = 0;

  for (var _i2 = 0; _i2 < boardModelArray.length; _i2++) {
    if (boardModelArray[_i2][dropChipOnColumn] === null) numNull++;
  }

  return numNull - 1; // this value represents the i-value because Column-value is the column value from the DOM
} // place chip on gameboard


function dropChip(e) {
  clicks++;
  var columnVal = +e.target.id;
  var rowVal = checkNullCount(columnVal); //this will be checkNullCount fn

  boardModelArray[rowVal][columnVal] = chipValue;
  setChipOnDOM(boardModelArray, rowVal, columnVal);
  var chipPosition = [rowVal, columnVal];

  if (checkWinner(boardModelArray, chipPosition, chipValue)) {
    // console.log(`Game over ${winnerIs(chipValue)} won! Yew!`);
    haveWinner = true;
    gamePlay = false;
    var currState = {
      state: 'haveWinner',
      chipValue: chipValue
    };
    var message = messageFactory(currState);
    setGameMessage(messageZone, message); // remove listeners in dropzone
    // display reset game modal
    // if yes
    // init()
    // else
    // return
  } else if (clicks >= 49) {
    isGameDraw = true;
    var _currState = {
      state: 'isGameDraw'
    };

    var _message = messageFactory(_currState);

    setGameMessage(messageZone, _message);
    console.log('Game Draw! No winner!'); // remove listeners in dropzone
    // display reset game modal
    // if yes
    // init()
    // else
  } else {
    var _currState2 = {
      state: 'gamePlay'
    };

    var _message2 = messageFactory(_currState2);

    setGameMessage(messageZone, _message2);
    redIsNext = !redIsNext;
    setNextChipValue(redIsNext);
  }
}

function checkWinner(arr, chipPos, chipVal) {
  console.log('hi from checkWinner');
  return [checkXDir(arr, chipPos, chipVal), checkYDir(arr, chipPos, chipVal), checkQuadrants(arr, chipPos, chipVal)].some(function (val) {
    return val === true;
  });
} // works


function checkYDir(arr, chipPosition, chipValue) {
  console.log('hi from Ydir!'); // "down" i++ j stays the same

  var _chipPosition = _slicedToArray(chipPosition, 2),
      row = _chipPosition[0],
      col = _chipPosition[1];

  if (row <= 2 && row >= lowerBoundRowAndCol) {
    return [arr[row][col], arr[row + 1][col], arr[row + 2][col], arr[row + 3][col]].every(function (chpVal) {
      return chpVal === chipValue;
    });
  } else {
    return false;
  }
} // this function works! Yew!


function checkXDir(arr, chipPosition, chipValue) {
  // from chipPosition
  // "left" = i stays the same j--
  // "right" = i stays the same j++
  var _chipPosition2 = _slicedToArray(chipPosition, 2),
      row = _chipPosition2[0],
      col = _chipPosition2[1];

  var sign = col >= lowerBoundRowAndCol && col <= 2 ? 'positive' : col >= 4 && col <= 6 ? 'negative' : 'both';

  switch (sign) {
    case 'positive':
      {
        return [arr[row][col], // this represents the initial chip position (aka where the chip was "dropped" too)
        arr[row][col + 1], arr[row][col + 2], arr[row][col + 3]].every(function (chpVal) {
          return chpVal === chipValue;
        });
        break;
      }

    case 'negative':
      {
        return [arr[row][col], // this represents the initial chip position (aka where the chip was "dropped" too)
        arr[row][col - 1], arr[row][col - 2], arr[row][col - 3]].every(function (chpVal) {
          return chpVal === chipValue;
        });
        break;
      }

    case 'both':
      {
        // I'm using short circuit eval. I'm looking for a true value in either directions
        return [arr[row][col], // this represents the initial chip position (aka where the chip was "dropped" too)
        arr[row][col + 1], arr[row][col + 2], arr[row][col + 3]].every(function (chpVal) {
          return chpVal === chipValue;
        }) || [arr[row][col], // this represents the initial chip position (aka where the chip was "dropped" too)
        arr[row][col - 1], arr[row][col - 2], arr[row][col - 3]].every(function (chpVal) {
          return chpVal === chipValue;
        });
        break;
      }

    default:
      return;
      break;
  }
}

function checkQuadrants(arr, chipPosition, chipValue) {
  console.log('hi from checkQuadrants!');

  var _chipPosition3 = _slicedToArray(chipPosition, 2),
      row = _chipPosition3[0],
      col = _chipPosition3[1]; // check quadrant I
  // from chipPosition
  // up-right in inverse i-- j++


  if (row - 3 >= lowerBoundRowAndCol && col + 3 <= upperBoundCol) {
    return [arr[row][col], arr[row - 1][col + 1], arr[row - 2][col + 2], arr[row - 3][col + 3]].every(function (chpVal) {
      return chpVal === chipValue;
    });
  } // check check quadrant II
  // from chipPosition
  // up-right in inverse i-- j--


  if (row - 3 >= lowerBoundRowAndCol && col - 3 >= lowerBoundRowAndCol) {
    return [arr[row][col], arr[row - 1][col - 1], arr[row - 2][col - 2], arr[row - 3][col - 3]].every(function (chpVal) {
      return chpVal === chipValue;
    });
  } // check check quadrant III
  // from chipPosition
  // up-right in inverse i++ j--


  if (row + 3 <= upperBoundCol && col - 3 >= lowerBoundRowAndCol) {
    return [arr[row][col], arr[row + 1][col - 1], arr[row + 2][col - 2], arr[row + 3][col - 3]].every(function (chpVal) {
      return chpVal === chipValue;
    });
  } // check check quadrant IV
  // from chipPosition
  // up-right in inverse i++ j++


  if (row + 3 <= upperBoundCol && col + 3 <= upperBoundCol) {
    return [arr[row][col], arr[row + 1][col + 1], arr[row + 2][col + 2], arr[row + 3][col + 3]].every(function (chpVal) {
      return chpVal === chipValue;
    });
  }
}

dropZone.addEventListener('click', dropChip);