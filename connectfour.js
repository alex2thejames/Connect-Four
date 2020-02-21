const EventEmitter = require('events');

module.exports = class ConnectFour extends EventEmitter {

    numPlayers = 0;
    playerTurn = 1;

    constructor() {
        super();

        this.grid = [];
        for(let r = 0; r < 6; r++) {
            this.grid.push([]);
            for(let c = 0; c < 7; c++) {
                this.grid[r].push(0);
            }
        }
    }

    addPlayer() {
        let currPlayer = 0;
        if(this.numPlayers == 0) {
            this.numPlayers = 1;
            currPlayer = 1;
        } else if(this.numPlayers == 1) {
            this.numPlayers = 2;
            currPlayer = 2;
            this.emit('gamestarted');
        }
        return currPlayer;
    }

    makeMove(player, col) {
        if(player != this.playerTurn)
            return;
        let piecePlaced = false;
        for(let r = 0; r < 6; r++) {
            if(this.grid[r][col] == 0) {
                this.grid[r][col] = player;
                piecePlaced = true;
                break;
            }
        }
        this.emit('gridupdated');
        this.checkWinner();
        this.playerTurn = this.playerTurn == 1 ? 2 : 1;
        this.emit('newturn');
        return piecePlaced;
    }

    checkLine(a, b, c, d) {
        return a != 0 && a == b && a == c && a == d;
    }

    checkWinner() {
        // Check down
        for (let r = 0; r < 3; r++)
            for (let c = 0; c < 7; c++)
                if (this.checkLine(this.grid[r][c], this.grid[r+1][c], this.grid[r+2][c], this.grid[r+3][c])) {
                    this.emit('gamewon', this.grid[r][c]);
                    return;
                }
    
        // Check right
        for (let r = 0; r < 6; r++)
            for (let c = 0; c < 4; c++)
                if (this.checkLine(this.grid[r][c], this.grid[r][c+1], this.grid[r][c+2], this.grid[r][c+3])) {
                    this.emit('gamewon', this.grid[r][c]);
                    return;
                }
    
        // Check down-right
        for (let r = 0; r < 3; r++)
            for (let c = 0; c < 4; c++)
                if (this.checkLine(this.grid[r][c], this.grid[r+1][c+1], this.grid[r+2][c+2], this.grid[r+3][c+3])) {
                    this.emit('gamewon', this.grid[r][c]);
                    return;
                }
    
        // Check down-left
        for (let r = 3; r < 6; r++)
            for (let c = 0; c < 4; c++)
                if (this.checkLine(this.grid[r][c], this.grid[r-1][c+1], this.grid[r-2][c+2], this.grid[r-3][c+3])) {
                    this.emit('gamewon', this.grid[r][c]);
                    return;
                }
    }

    displayGrid() {
        for(let r = 6 - 1; r >= 0; r--) {
            let row = '';
            for(let c = 0; c < 7; c++) {
                row = row + String(this.grid[r][c]) + ' ';
            }
            console.log(row);
        }
    }

}