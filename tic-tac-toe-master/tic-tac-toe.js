document.addEventListener("DOMContentLoaded", function() {
    const squares = document.querySelectorAll("#board div");
    const gameState = Array(9).fill(null);
    let activePlayer = "X";
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
                square.textContent = activePlayer;
                square.classList.add(activePlayer);
                gameState[index] = activePlayer;

                if (checkWinner()) {
                    statusDiv.textContent = `Congratulations! ${activePlayer} is the Winner!`;
                    statusDiv.classList.add("you-won");
                } else {
                    activePlayer = activePlayer === "X" ? "O" : "X";
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
        activePlayer = "X";
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





