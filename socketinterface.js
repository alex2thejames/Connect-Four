module.exports = (io, game) => {
    io.on('connection', socket => {

        socket.on('joingame', () => {
            let playerNum = game.addPlayer();
            console.log(`Player ${playerNum} has joined the game.`);
            socket.emit('joinedgame', playerNum);
        });

        game.on('gamestarted', () => {
            console.log('The game has started.');
            io.emit('gamestarted');
            console.log(`It is now ${game.playerTurn}'s turn`);
            io.emit('newturn', game.playerTurn);
        });

        game.on('gridupdated', () => {
            console.log('The grid has updated');
            console.log(game.grid);
            io.emit('gridupdated', game.grid);
        });

        game.on('gamewon', winningPlayer => {
            console.log(`Player ${winningPlayer} won`);
            io.emit('gamewon', winningPlayer);
        });

        game.on('newturn', () => {
            console.log(`It is now ${game.playerTurn}'s turn`);
            io.emit('newturn', game.playerTurn);
        });

        socket.on('colselect', (player, col) => {
            console.log(`Player ${player} has selected column ${col}.`);
            game.makeMove(player, col);
        });

        console.log('emmitting connected');
        socket.emit('connected');
        io.emit('gridupdated', game.grid);

    });
}