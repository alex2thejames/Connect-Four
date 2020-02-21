import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ConnectFourService {
  game = this.socket.fromEvent<any>('gridupdated');
  gameStarted = this.socket.fromEvent<any>('gamestarted');
  playerTurn = this.socket.fromEvent<any>('newturn');
  gameWon = this.socket.fromEvent<any>('gamewon');
  joinedGame = this.socket.fromEvent<any>('joinedgame');

  constructor(private socket: Socket) {
    this.socket.fromEvent<any>('connected').subscribe(() => {
      this.socket.emit('joingame');
    })
  }

  selectMove(player, col) {
    console.log('Entered select move function.');
    console.log(`Player ${player} is has selected column ${col}`);
    this.socket.emit('colselect', player, col);
  }
}
