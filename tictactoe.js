const board = (function() {
    let boardArr = new Array(9).fill("-");

    const addToken = function(position, token) {
        boardArr[position] = token;
    };
    
    return {boardArr, addToken};
})();