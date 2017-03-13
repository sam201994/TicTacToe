const readline = require('readline');
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
				temp.push("--")
			}
			this.board.push(temp);
		}
		console.log("INITIAL BOARD: \n",this.board);
		this.player1Symbol = symbol1;
		this.player2Symbol = symbol2;

	}
	gameStatus() {
		for(var i = 0; i < 3; i++){

			if(this.board[i][0] != "--" && this.board[i][0] == board[i][1] && board[i][1] == board[i][2]){
				if(this.board[i][0] == this.player1Symbol){
					return this.PLAYER1WON;
				}
				else{
					return this.PLAYER2WON;
				}
			}
		}

		for(var i = 0; i < 3; i++){
			if(this.board[0][i] != "--" && this.board[0][i] == this.board[1][i] && this.board[1][i] == this.board[2][i]){
				if(board[0][i] == this.player1Symbol){
					return this.PLAYER1WON;
				}
				else{
					return this.PLAYER2WON;
				}
			}
		}
		if(this.board[0][0] != '--' && this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2]){
			if(this.board[0][0] == player1Symbol){
				return this.PLAYER1WON;
			}
			else{
				return this.PLAYER2WON;
			}
		}

		if(this.board[0][2] != '--' && this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0]){
			if(this.board[0][2] == this.player1Symbol){
				return this.PLAYER1WON;
			}
			else{
				return this.PLAYER2WON;
			}
		}

		for(var i = 0; i < 3; i++){
			for(var j = 0; j < 3; j++ ){
				if(this.board[i][j] == '--'){
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
	}
	printGame() {
		console.log("PRINT BOARD");
		console.log("\n",this.board);
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
		var done;
		while(board.gameStatus() ===  board.INCOMPLETE){

			if(player1Turn){
			
					var x;
					var y;
					console.log("Player 1 turn !");

					const rl = readline.createInterface({
					  input: process.stdin,
					  output: process.stdout
					});

					rl.question('Enter X: ', (answer) => {

					  x = answer;
					  rl.close();

						const r2 = readline.createInterface({
						  input: process.stdin,
						  output: process.stdout
						});

						r2.question('Enter Y: ', (answer) => {
						  y = answer;
						  board.move(player1.symbol,x,y);
						  player1Turn = false;  
						  r2.close();
						});

					  
					});
				
			}
			else {
				var x;
				var y;
				console.log("Player 2 turn !");

				const rl = readline.createInterface({
				  input: process.stdin,
				  output: process.stdout
				});

				rl.question('Enter X: ', (answer) => {
				  x = answer;

					const r2 = readline.createInterface({
					  input: process.stdin,
					  output: process.stdout
					});
					r2.question('Enter Y: ', (answer) => {
					  y = answer;
					  board.move(player2.symbol,x,y);
					  player1Turn = true;
					  r2.close();
					});

				  rl.close();
				});	
				
				
			}

			board.printGame();
		}	
		
		
		if(board.gameStatus() == board.PLAYER1WON){
			console.log(player1.name+" wins !!!");
		}
		else if(board.gameStatus() == board.PLAYER2WON){
			console.log(player2.name+" wins !!!");
		}
		else{
			console.log("Its a Draw !!");
		}
	

	}


	takePlayerInput(num) {

		var name;
		var symbol;
		if(num === 1)
			return new Player("Smriti", "X");
		return new Player("Vrishti", "O");

		console.log("ENTER DETAILS FOR ", num, " PLAYER");


		const rl = readline.createInterface({
		  input: process.stdin,
		  output: process.stdout
		});

		rl.question('Enter Name: ', (n) => {
		  name = n; 
		  rl.close();

			const r2 =readline.createInterface({
			  input: process.stdin,
			  output: process.stdout
			});
			
			r2.question('Enter symbol: ', (s) => {
			  symbol = s;
			 

			  var p = new Player("smriti", "x");
			  r2.close();
			  return p;
			});
		});
	}
}
var t = new TicTacToe();
