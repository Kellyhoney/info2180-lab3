document.addEventListener('DOMContentLoaded', function(){

    
    let gameStatus = true; 
    let player = "X" 
    let selection = []; 
    let controls = document.querySelector(".controls");

    const board = document.querySelector("#board");
    const boxes = board.querySelectorAll("div");
    const status = document.querySelector("#status");
    const newGame = controls.querySelector('.btn');


//function to switch players
    function switch_player(){ 
        if (player=="X"){
            player = "O";
        }
        else{
            player = "X";
        }
    }


    boxes.forEach(function(box, index){  //Used to display the squares
        box.classList.add('square');      


//add hover effect over grids

        box.addEventListener("mouseover", () => {
            box.style.cursor = "pointer";
            box.classList.add("hover");
        })

        box.addEventListener("mouseout",()=>{ 
            box.classList.remove("hover");
        });



        // displays a X or O when the box is clicked
        box.addEventListener("click", function(e){ 

            if (gameStatus == true && box.innerHTML==""){

                if (player == "X"){
                    box.classList.add("X")
                }
                else{
                    box.classList.add("O");
                }

                box.innerHTML = player;
                

                selection[index] = player;


                if (winner(index,player) == true){ 
                    gameStatus = false;
                    
                    status.classList.add("you-won");
                    status.innerHTML = `Congratulations! ${player} is the Winner!`;

                };
                
                switch_player()
            
            }
            
        })
        
        
    })


    //check the boxes to determine the winner
     function winner(index,player){
     
        if (index == 0){
            if((selection[1] == player && selection[2] == player) || 
            (selection[4]==player && selection[8]==player) || 
            (selection[3]==player && selection[6] == player)){
                return true;
            }
        }

        else if(index == 1){
            if((selection[0] == player && selection[2]==player) || 
            (selection[4]==player && selection[7]==player)){
                return true;
            }
        }

        else if(index == 2){
            if((selection[0] == player && selection[1]==player) || 
            (selection[4]==player && selection[6]==player) ||
            (selection[5] == player && selection[8] == player)){
                return true;
            }
        }

        else if(index == 3){
            if((selection[4] == player && selection[5] == player) ||
            (selection[0] == player && selection[6] == player)){
                return true;
            }
        }

        else if(index == 4){
            if((selection[3] == player && selection[5] == player) ||
            (selection[0] == player && selection[8] == player) ||
            (selection[2] == player && selection[6] == player)){
                return true;
            }
        }

        else if(index == 5){
            if((selection[3] == player && selection[4] == player) ||
            (selection[2] == player && selection[8] == player)){
                return true;
            }
        }

        else if(index == 6){
            if((selection[7] == player && selection[8] == player) ||
            (selection[2] == player && selection[4] == player) ||
            (selection[0] == player && selection[3] == player)){
                return true;
            }
        }

        else if(index == 7){
            if ((selection[6] == player && selection[8] == player) ||
            (selection[1] == player && selection[4] == player)){
                return true;
            }
        }

        else if(index == 8){
            if((selection[6] == player && selection[7] == player) ||
            (selection[0] == player && selection[4] == player) || 
            (selection[2] == player && selection[5] == player)){
                return true;
            }
        }

        return false; 
     };


     newGame.addEventListener("click", () => { 
        
        boxes.forEach(box => {
            box.classList.remove("X")
            box.classList.remove("O")
            box.innerHTML="";

        
        });

        selection = [] 

        status.classList.remove("you-won")
        status.innerHTML = "Move your mouse over a square and click to play an X or an O."

        gameStatus = true; //restarts the game
        player = "X";

     })
        
    
});

 
 
/* document.addEventListener("DOMContentLoaded", function() {
    const squares = document.querySelectorAll("#board");
    const gameState = Array(9).fill(null);
    let currentPlayer = "X";
    const statusDiv = document.getElementById("status");
    const newGameButton = document.querySelector(".btn"); 

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Apply 'square' class and set up the game board (Exercise 1)
    squares.forEach((square, index) => {
        square.classList.add("square");

        square.addEventListener("click", function() {
            if (!gameState[index] && !statusDiv.classList.contains("you-won")) {
                square.textContent = currentPlayer;
                square.classList.add(currentPlayer);
                gameState[index] = currentPlayer;

                if (checkWinner()) {
                    statusDiv.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
                    statusDiv.classList.add("you-won");
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        });

        // Hover effects (Exercise 3)
        square.addEventListener("mouseenter", function() {
            square.classList.add("hover");
        });
        square.addEventListener("mouseleave", function() {
            square.classList.remove("hover");
        });
    });

    // New Game functionality
    newGameButton.addEventListener("click", function() {
        gameState.fill(null);
        squares.forEach(square => {
            square.textContent = "";
            square.classList.remove("X", "O");
        });
        currentPlayer = "X";
        statusDiv.textContent = "Move your mouse over a square and click to play an X or an O.";
        statusDiv.classList.remove("you-won");
    });

    function checkWinner() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    }
}); 


/*window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

   /* const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});  */ 





