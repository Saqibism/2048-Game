// import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";


function flattenArr(arr){
    let temp=[]
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length;j++){
            temp.push(arr[i][j])
        }
    }
    return temp
}

export default class Game {
    
    constructor(size) {
      this.boardSize = size
      this.gameBoard = []
      this.score = 0
      this.won = false
      this.over = false
      this.setupNewGame()
      this.Moved=false
      this.alreadyWon=false

    }
    setupNewGame() {
        this.moveArr=[]
        this.overArr=[]
        this.winArr=[]

        this.score = 0
        this.won = false
        this.over = false
        this.alreadyWon=false

        this.gameBoard = []
        for(let i=0;i<this.boardSize*this.boardSize;i++){
            this.gameBoard.push(0)
        }

      //random position
      this.ran1=this.getRandomNumbers(0,this.boardSize*this.boardSize)
      this.ran2=this.getRandomNumbers(0,this.boardSize*this.boardSize)
      this.ran3=this.getRandomNumbers(0,this.boardSize*this.boardSize)
      this.ran4=this.getRandomNumbers(0,this.boardSize*this.boardSize)
      
      //get random numbers 2 or 4
      this.ran5=this.getRandomNumbers(0,9)
      this.ran6=this.getRandomNumbers(0,9)

      if(this.ran5==5){
          this.sNum1=4
      }else{
          this.sNum1=2
      }
      if(this.ran6==5){
          this.sNum2=4
      }else{
          this.sNum2=2
      }
      //prevents default values to land on the same spot
      while(this.ran1==this.ran2){
        this.ran1=this.getRandomNumbers(0,this.boardSize*this.boardSize)
        this.ran2=this.getRandomNumbers(0,this.boardSize*this.boardSize)
      }
    //   this.sNum1=1024
    //   this.sNum2=1024

      this.gameBoard[this.ran1]=this.sNum1
      this.gameBoard[this.ran2]=this.sNum2
      }

    getRandomNumbers(min, max){
        return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
    }




    addrandom(){
        this.randomNum=this.getRandomNumbers(0,this.boardSize*this.boardSize) 

        this.ran8=this.getRandomNumbers(0,9)
        if(this.ran8==5){
            this.newNumber=4
        }else{
            this.newNumber=2
        }

        while(this.gameBoard[this.randomNum]!=0){
            this.randomNum=this.getRandomNumbers(0,this.boardSize*this.boardSize)       
        }
        this.gameBoard[this.randomNum]=this.newNumber
    }


    getGameState(){
        let temp ={
            board: this.gameBoard,
            score: this.score,
            won: this.won,
            over: this.over
          }

          return temp
    }

        toString() {
            for(let i = 0; i < (this.boardSize*this.boardSize); i += this.boardSize) {
                var together = []
                for (let j = 0; j < this.boardSize; j++) {
                    together.push(this.gameBoard[i+j]);
                }
                console.log(together);
            }
        }
        
    loadGame(gameState){
        this.gameBoard=gameState['board']
        this.won= gameState['won']
        this.over= gameState['over']
        this.score= gameState['score']
        this.boardSize=Math.sqrt(gameState['board'].length)
        this.alreadyWon=false

        // this.boardSize=Math.sqrt(gameState['board'].length)
        // this.tempGame = gameState['board'].reverse()
        // this.gameBoard=[]
        // for(let i=0;i<this.boardSize;i++){
        //     this.gameBoard.push([])
        //     for(let j=0;j<this.boardSize;j++){
        //         this.gameBoard[i][j]=this.tempGame.pop()
        //     }
        // }
    }
    move(direction) {
        switch (direction) {
            case 'right':
                this.rotate()
                this.rotate()
                this.rotate()
                this.swipeUp()
                this.zeroUp()
                this.rotate()
            break 

            case 'left':
                this.rotate()
                this.swipeUp()
                this.zeroUp()
                this.rotate()
                this.rotate()
                this.rotate()
                break 

            case 'down':
               this.rotate()
               this.rotate()
               this.swipeUp()
               this.zeroUp()
               this.rotate()
               this.rotate()
                break ;


            case 'up':
            this.swipeUp()
            this.zeroUp()
                break ;

        }

        if(this.won&& !this.alreadyWon){
            this.alreadyWon=true
            for(let i=0;i<this.winArr.length;i++){
                let tempGameState ={
                    board: this.gameBoard,
                    score: this.score,
                    won: this.won,
                    over: this.over
                  }
                   this.winArr[i](tempGameState)
               } 
        }

        if(!this.fullBoard()&&this.Moved){
            this.addrandom()
        }

        if(this.fullBoard()){
            this.temp1=false
            this.temp2=false
            if(this.hasLost()){
                this.temp1=true
            }
            this.rotate()
            if(this.hasLost()){
                this.temp2=true
            }

            this.rotate()
            this.rotate()
            this.rotate()
            
            if(this.temp1&&this.temp2){
                this.over=true
                for(let i=0;i<this.overArr.length;i++){
                    let tempGameState ={
                        board: this.gameBoard,
                        score: this.score,
                        won: this.won,
                        over: this.over
                      }
                       this.overArr[i](tempGameState)
                   } 
            }
        }


       for(let i=0;i<this.moveArr.length;i++){
        let tempGameState ={
            board: this.gameBoard,
            score: this.score,
            won: this.won,
            over: this.over
          }
           this.moveArr[i](tempGameState)
       } 

       this.Moved=false
    }
    swipeUp(){
        for(let i=0;i<this.boardSize;i++){
            for(let j=i;j<this.boardSize*this.boardSize;j=j+this.boardSize){
                for(let k=j+this.boardSize;k<this.boardSize*this.boardSize;k=k+this.boardSize){
                    if(this.gameBoard[k]==0){
                        continue
                    }
                    if(this.gameBoard[k]==this.gameBoard[j]){
                        this.Moved=true
                        this.score=this.score+(this.gameBoard[k]*2)
                        this.gameBoard[k]=0
                        this.gameBoard[j]=this.gameBoard[j]*2
                        if(this.gameBoard[j]==2048){
                            this.won=true
                        }
                        break
                    }
                    if(this.gameBoard[k]!=this.gameBoard[j]){
                        break
                    }
                }
            }
        }

        this.zeroUp()
    }

    zeroUp(){
        for(let i=0;i<this.boardSize;i++){
            for(let j=i;j<this.boardSize*this.boardSize;j=j+this.boardSize){
                if(this.gameBoard[j]!=0){
                    continue
                }
                for(let k=j+this.boardSize;k<this.boardSize*this.boardSize;k=k+this.boardSize){
                    if(this.gameBoard[k]==0){
                        continue
                    }else{
                        this.gameBoard[j]=this.gameBoard[k]
                        this.gameBoard[k]=0
                        this.Moved=true
                        break

                    }

                }

            }
        }

    }
    turn2D(){
        var newArr = [];
        while(this.gameBoard.length) {
            newArr.push(this.gameBoard.splice(0,this.boardSize));
        }
        this.gameBoard=newArr
    }

    fullBoard(){
        for(let i=0;i<this.boardSize*this.boardSize;i++){
            if(this.gameBoard[i]==0){
                return false
            }
        }
        return true
    }

    hasLost(){
        for(let i=0;i<this.boardSize;i++){
            for(let j=i;j<this.boardSize*this.boardSize;j=j+this.boardSize){
                for(let k=j+this.boardSize;k<this.boardSize*this.boardSize;k=k+this.boardSize){
                    if(this.gameBoard[k]==this.gameBoard[j]){
                        return false
                    }
                    if(this.gameBoard[k]!=this.gameBoard[j]){
                        break
                    }
                }
            }
        }
        return true

    }


    rotate() {
                this.turn2D()
                const n = this.boardSize;
                const x = Math.floor(n/2);
                const y = n - 1;
                let tempM = this.gameBoard
                for (let i = 0; i < x; i++) {
                   for (let j = i; j < y - i; j++) {
                      let k = tempM[i][j];
                      tempM[i][j] = tempM[y - j][i];
                      tempM[y - j][i] = tempM[y - i][y - j];
                      tempM[y - i][y - j] = tempM[j][y - i]
                      tempM[j][y - i] = k
                   }
                }

            this.gameBoard= flattenArr(this.gameBoard)
            }


    onMove(callback){
        this.moveArr.push(callback)
    }
    onWin(callback){
        this.winArr.push(callback)
    }
    onLose(callback){
        this.overArr.push(callback)
    }

    }

/*
  setupNewGame(): Resets the game back to a random starting position.

  loadGame(gameState): Given a gameState object, it loads that board, score, etc...
  
  move(direction) : Given "up", "down", "left", or "right" as string input, it makes the appropriate shifts and adds a random tile.
  
  Notice how, when you play the game, tiles are only able to combine once per move. So, for example, if you had [2][2][2][2] and did a right shift, you end up with [ ][ ][4][4], NOT [ ][ ][ ][8]. It would take another right shift to then combine the 4s into an 8.
  
  toString(): Returns a string representation of the game as text/ascii. See the gameState section above for an example. This will not be graded, but it useful for your testing purposes when you run the game in the console. The run_in_console.js script uses the toString() method to print the state of the game to the console after every move.
  
  onMove(callback): Takes a callback function as input and registers that function as a listener to the move event. Every time a move is made, the game should call all previously registered move callbacks, passing in the game's current gameState as an argument to the function.
  
  onWin(callback): Takes a callback function as input and registers that function as a listener to the win event. When the player wins the game (by making a 2048 tile), the game should call all previously registered win callbacks, passing in the game's current gameState as an argument to the function.
  
  onLose(callback): Takes a callback function as input and registers that function as a listener to the move event. When the game transitions into a state where no more valid moves can be made, the game should call all previously registered lose callbacks, passing in the game's current gameState as an argument to the function.
  
  getGameState(): Returns a accurate gameState object representing the current game state.
move(direction)

*/