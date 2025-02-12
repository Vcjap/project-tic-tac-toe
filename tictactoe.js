const board = (function() {
    let boardArr = new Array(9).fill("-");

    const addToken = function(position, token) {
        boardArr[position] === "-" ? boardArr[position] = token : console.log("the position is already taken");
        console.log(`Current board: ${getBoard()}`);
    };

    const reset = function() {
        boardArr = new Array(9).fill("-");
        console.log("Board reset!");
        console.log(`Current board: ${getBoard()}`);
    };

    const getBoard = () => boardArr;
    
    return {getBoard, addToken, reset};
})();

const play = (function() {

    const round = function(player) {
        const position = prompt("Enter the position as a number");
        board.addToken(position,player);

        boardArr = board.getBoard();

        if (checkWin(boardArr) === true) {
            console.log(`${player} wins!`);
        }
        else if (checkTie(boardArr) === true) {
            console.log("It's a tie!")
        }
        else {
            console.log("It's the next player turn")
        }

        players.updateCurrentPlayer(player);
    };

    const checkTie = function(boardArr) {
        const emptyPosition = boardArr.indexOf("-");
        return emptyPosition === -1; // If there are no empty positions it's a tie
    };

    const checkWin = function(boardArr) {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
    
        return winningCombos.some(([a, b, c]) => 
            boardArr[a] !== "-" && boardArr[a] === boardArr[b] && boardArr[b] === boardArr[c]
        );
    };

    return {round, checkWin};
})();

const players = (function() {

    const createPlayer = function(name, token) {
        return {name, token};
    }
    
    const p1 = createPlayer("p1", "X");
    const p2 = createPlayer("p2", "O");
    let currentPlayer = "p1";

    const updateCurrentPlayer = function(player) { // Used to change player after a round
        const newPlayer = player === "p1" ? "p2" : "p1";
        players.currentPlayer = newPlayer;
    }

    return {p1, p2, currentPlayer, updateCurrentPlayer};

})();

const display = (function(){

    const reset = function() {
        let currentBoard = document.querySelector("#board");
        currentBoard.replaceChildren();
    };

    const update = function(boardArr) {
        let currentBoard = document.querySelector("#board");

        boardArr.forEach((position) => {
            const newDiv = document.createElement("div");
            const newBtn = document.createElement("button");
            newBtn.textContent = position;
            newDiv.appendChild(newBtn);
            currentBoard.appendChild(newDiv);
        });
    };

    return {reset, update};

})();

display.update(board.getBoard()); //initialize board display