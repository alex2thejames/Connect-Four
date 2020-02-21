const ConnectFour = require('./connectfour');

const game = new ConnectFour('Trevor', 'Alex');

game.on('gamewon', player => {
    console.log(`${player} won the game`);
});

game.makeMove('Trevor', 3);
game.makeMove('Trevor', 3);
game.makeMove('Trevor', 3);
console.log('Third move made');
game.makeMove('Trevor', 3);