const board = (function() {
    let boardArr = new Array(9).fill("-");

    const addToken = function(position, token) {
        if (boardArr[position]==="-") {
            boardArr[position] = token;
        }
        else {
            console.log("ERROR! The position is already taken");
        }
    };

    const reset = function() {
        boardArr = new Array(9).fill("-");
        display.reset();
    };

    const getBoard = () => boardArr;
    
    return {getBoard, addToken, reset};
})();

const play = (function() {

    const round = function(position) {

        board.addToken(position,players.currentPlayer.token);
        
        boardArr = board.getBoard(); //Get the newest board

        roundResult = play.endRound(boardArr);

        display.update(boardArr);

        if (roundResult !== null) display.showEnding(roundResult);

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

    const endRound = function(boardArr) {
        if (checkWin(boardArr) === true) {
            return (`${players.currentPlayer.name} wins!`);
        }
        else if (checkTie(boardArr) === true) {
            return ("It's a tie!");
        }
        else {
            players.updateCurrentPlayer(players.currentPlayer);
            return null;
        }
    }

    return {round, endRound};
})();

const players = (function() {

    const createPlayer = function(name, token) {
        return {name, token};
    }
    
    const p1 = createPlayer("p1", "X");
    const p2 = createPlayer("p2", "O");
    let currentPlayer = p1;

    const updateCurrentPlayer = function(player) { // Used to change player after a round
        const newPlayer = player === p1 ? p2 : p1;
        players.currentPlayer = newPlayer;
    }

    return {p1, p2, currentPlayer, updateCurrentPlayer};

})();

const display = (function(){
    let currentBoard = document.querySelector("#board");
    let endDiv = document.querySelector("#endDiv");
    let main = document.querySelector(".main");
    let message = document.querySelector(".currentPlayer");

    const reset = function() {
        currentBoard.replaceChildren();
    };

    const update = function(boardArr) {
        display.reset();

        boardArr.forEach((position,index) => {
            const newDiv = document.createElement("div");
            const newBtn = document.createElement("button");

            newDiv.setAttribute("board-index", index);
            newBtn.textContent = position;

            newBtn.addEventListener("click", (event)=> {
                divTarget = event.target.parentElement;
                position = divTarget.getAttribute("board-index");
                play.round(position);        
            });
            
            if(position !== "-") newBtn.classList.add("nonClickable"); //Avoid clicks on a "occupied" position

            newDiv.appendChild(newBtn);
            currentBoard.appendChild(newDiv);
        });

        display.currentPlayer(players.currentPlayer); //Show the current player 
    };

    const showEnding = function(message) {
        endDiv = document.createElement("div");
        endDiv.id = "endDiv";

        finalMessage = document.createElement("h2");
        finalMessage.textContent = message;
        
        newGameBtn = document.createElement("button");
        newGameBtn.textContent = "Start new Game";
        newGameBtn.addEventListener("click", ()=> {
            board.reset();
            main.removeChild(endDiv);
            message.textContent = "";
            display.update(board.getBoard())
        })

        endDiv.append(finalMessage,newGameBtn);
        main.append(endDiv);
    }

    const currentPlayer = function(player) {
        message.textContent = `It's ${player.name} turn. They play with ${player.token}`
        return message
    };

    return {reset, update, showEnding, currentPlayer};

})();

display.update(board.getBoard()); //initialize board display