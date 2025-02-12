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

const createPlayers = (function() {

    const createPlayer = function(name, token) {
        return {name, token};
    }
    
    const p1 = createPlayer("P1", "X");
    const p2 = createPlayer("P2", "O");

    return {p1, p2};

})();

