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
        checkWin(boardArr) === true ? console.log(`${player} wins!`) : console.log("It's the next player turn");
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