const readline = require('readline');
var prompt = require('prompt');
class Player {

	constructor(name, symbol){
		this.name = name;
		this.symbol = symbol;
	}

}
class Board{

	constructor(symbol1, symbol2){

		this.board = [];
		this.player1Symbol="";
		this.player2Symbol="";

		this.PLAYER1WON = 1;
		this.PLAYER2WON = 2;
		this.DRAW = 3;
		this.INCOMPLETE = 4;

	
		for(var i = 0; i<3 ; i++) {
			
			var temp =[]
			for(var j =0;j<3; j++) {
				temp.push("*")
			}
			this.board.push(temp);
		}
		console.log("INITIAL BOARD: \n",this.board);
		this.player1Symbol = symbol1;
		this.player2Symbol = symbol2;

	}
	gameStatus() {
		for(var i = 0; i < 3; i++){

			if(this.board[i][0] != "*" && this.board[i][0] == this.board[i][1] && this.board[i][1] == this.board[i][2]){
				if(this.board[i][0] == this.player1Symbol){
					return this.PLAYER1WON;
				}
				else{
					return this.PLAYER2WON;
				}
			}
		}

		for(var i = 0; i < 3; i++){
			if(this.board[0][i] != "*" && this.board[0][i] == this.board[1][i] && this.board[1][i] == this.board[2][i]){
				if(board[0][i] == this.player1Symbol){
					return this.PLAYER1WON;
				}
				else{
					return this.PLAYER2WON;
				}
			}
		}
		if(this.board[0][0] != '*' && this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2]){
			if(this.board[0][0] == this.player1Symbol){
				return this.PLAYER1WON;
			}
			else{
				return this.PLAYER2WON;
			}
		}

		if(this.board[0][2] != '*' && this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0]){
			if(this.board[0][2] == this.player1Symbol){
				return this.PLAYER1WON;
			}
			else{
				return this.PLAYER2WON;
			}
		}

		for(var i = 0; i < 3; i++){
			for(var j = 0; j < 3; j++ ){
				if(this.board[i][j] == '*'){
					return this.INCOMPLETE;
				}
			}
		}

		return this.DRAW;
	}
	move(symbol,x,y){
		x = parseInt(x);
		y = parseInt(y);
		this.board[x][y] = symbol;
		this.printGame();
	
	}
	printGame() {
		console.log("PRINT BOARD");
		var finalAns="";
		for(var i = 0; i<3; i++){
			var str="|"
			for(var j=0 ;j<3; j++){
				str = str+this.board[i][j]+"|";
			}
			finalAns = finalAns + str +"\n";
		}
		console.log(finalAns);
	}

}




class TicTacToe {

	constructor(){
		this.startGame();
	}


	startGame() {
		
		var num = 1;
		var player1 = this.takePlayerInput(num++);
		
		var player2 = this.takePlayerInput(num);
		while(player1.symbol === player2.symbol){
			console.log("Symbol Already Taken !! ");
			player2 = this.takePlayerInput(num);
		}

		console.log("here is player 1: ",player1);
		console.log("here is player 2: ",player2);

		var board = new Board(player1.symbol, player2.symbol);
		var player1Turn = true; 

		function ola(){
			if(player1Turn){
			
				var x;
				var y;

				prompt.start();
				prompt.get(['x', 'y'], function (err, result) { 
					console.log("inside call back for player 1: ", result);
				board.move(player1.symbol, result.x, result.y);
				   player1Turn = false;	
				   if(board.gameStatus() === board.PLAYER1WON){
						console.log(player1.name+" wins !!!");
						return;
					}
					else if(board.gameStatus() === board.PLAYER2WON){
						console.log(player2.name+" wins !!!");
						return;
					}
					else if (board.gameStatus() === board.DRAW){
						console.log("Its a Draw !!");
						return;
					}
				   ola();	
				});	
				
			}
			else {

				var x;
				var y;
				console.log("Player 2 turn !");

				prompt.start();
				prompt.get(['x', 'y'], function (err, result) { 
				board.move(player2.symbol, result.x, result.y);
				   player1Turn = true;
				   if(board.gameStatus() == board.PLAYER1WON){
						console.log(player1.name+" wins !!!");
					}
					else if(board.gameStatus() == board.PLAYER2WON){
						console.log(player2.name+" wins !!!");
					}
					else if(board.gameStatus() === board.DRAW){
						console.log("Its a Draw !!");
					}
				   ola();		
				});	
			}

			

		}
		ola();

	}


	takePlayerInput(num) {

		var name;
		var symbol;
		if(num === 1)
			return new Player("Player1", "X");
		return new Player("Player2", "O");
	
	}
}
var t = new TicTacToe();
