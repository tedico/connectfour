// const gameState = {
//   gameStart: true,
//   gamePlay: true,
//   haveWinner: false,
//   clicks: 0,
//   redIsNext: true,
//   chipValue: gameState.redIsNext ? RED : BLUE,
//   gameMessages: [
//     "Good move! Chuck🥋Norris bows to you with humility 🙏",
//     "Your move just put Einstein🧠 to shame 👊",
//     "Yoda 🧙 comes to you for advice 🦉 with the move you just made",
//     "A sagely 🧘 move right there!",
//     "There's unstoppable 🛑 and then there's you 👈",
//     "This isn't amateur night for sure with those kind of moves 🕺💃",
//     "Call the fire department 🚒 your move just made some 🔥",
//     "Mensa is like 🎒pre-school🎓 for you! Great move!"
//   ],
//   gameDrawMessage: `🙅 It's a draw. Nobody wins 🙅`,
//   winningMessage: `🎉 WOOOHOOO! ${''} won! 🍾`,
//   greetMessage: `Hi there! ${''} are you ready to play?`,
//   resetMessage: `Do you want to play again?`
// }

// const setGameMessage = (element, msgState) => (element.textContent = msgState)

// function setGameMessage(gameState) {
//   const {
//     gamePlay,
//     haveWinner,
//     gameMessages,
//     winningMessage
//   } = gameState

//   if (haveWinner) {
//     setGameMessage(messageZone, winningMessage)
//   }
//   if (gamePlay) {
//     setGameMessage(messageZone, gameMessages[roll(0, messages.gameMessages.length)])
//   }
// }

// setGameMessage(gameState)