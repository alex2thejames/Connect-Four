import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ConnectFourService } from './connect-four.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private _gameSub: Subscription;
  private _gameStarted: Subscription;
  private _playerTurn: Subscription;
  private _gameWon: Subscription;
  private _joinedGame: Subscription;

  constructor(private connectFourService: ConnectFourService) {}

  gameStarted: boolean = false;
  playerNum: any;
  playerTurn: any;
  game = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
  ];
  blueWon: Boolean = false;
  redWon: Boolean = false;

  ngOnInit(){
    this._gameSub = this.connectFourService.game.subscribe(grid => {
      console.log('Game updated grid with:');
      console.log(grid);
      this.game = grid
    });
    this._gameStarted = this.connectFourService.gameStarted.subscribe(() => {
      this.gameStarted = true;
      console.log(`Game Started: ${this.gameStarted}`);
    });
    this._playerTurn = this.connectFourService.playerTurn.subscribe(playerTurn => {
      console.log(`Player turn updated to ${playerTurn}`);
      this.playerTurn = playerTurn;
    });
    this._joinedGame = this.connectFourService.joinedGame.subscribe(playerNum => {
      console.log(`Player num set to ${playerNum}`);
      this.playerNum = playerNum;
    });
    this._gameWon = this.connectFourService.gameWon.subscribe(winner => {
      console.log(`Player ${winner} won the game`);
      if(winner == 1)
        this.blueWon = true;
      else
        this.redWon = true;
    });
  }

  ngOnDestroy() {
    this._gameSub.unsubscribe();
    this._gameStarted.unsubscribe();
    this._playerTurn.unsubscribe();
    this._joinedGame.unsubscribe();
    this._gameWon.unsubscribe();
  }

  placeToken(col) {
    console.log(`Called place token. Player Turn: ${this.playerTurn} Player Num: ${this.playerNum}`);
    if(!this.gameStarted || this.playerTurn != this.playerNum)
      return;
    console.log('Function returned');
    
    this.connectFourService.selectMove(this.playerNum, col);
    
  }
}