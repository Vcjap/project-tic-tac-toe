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

        // Manage state when ending conditions are satisfied
        if (roundResult !== null) { 
            display.showEnding(roundResult);
            const boardDisplay = document.querySelector("#board");
            Array.from(boardDisplay.children).forEach((position) => {
                position.classList.add("nonClickable");
            })
        };

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
        newGameBtn.textContent = "Start New Game";
        newGameBtn.classList.add("newGameBtn");
        newGameBtn.addEventListener("click", ()=> { // Reset everything and display form
            board.reset();
            main.removeChild(endDiv);
            currentPlayerMessage = document.querySelector(".currentPlayer");
            currentPlayerMessage.textContent = "";
            form.create();
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

const form = (function(){
    const mainBody = document.querySelector(".main");

    const create = function(){

        const form = document.createElement("form");

        const p1label = document.createElement("label");
        p1label.setAttribute("for", "p1");
        p1label.textContent = "Player 1 Name (X):"

        const p1input = document.createElement("input");
        p1input.setAttribute("type","text");
        p1input.setAttribute("name", "p1");
        p1input.setAttribute("id", "p1");
        p1input.setAttribute("required", "true");
        p1input.value = players.p1.name;

        const p2label = document.createElement("label");
        p2label.setAttribute("for", "p2");
        p2label.textContent = "Player 2 Name (O):"

        const p2input = document.createElement("input");
        p2input.setAttribute("type","text");
        p2input.setAttribute("name", "p2");
        p2input.setAttribute("id", "p2");
        p2input.setAttribute("required", "true");
        p2input.value = players.p2.name;

        const newGameBtn = document.createElement("button");
        newGameBtn.classList.add("newGameBtn");
        newGameBtn.textContent = "Start New Game";
        newGameBtn.addEventListener("click", (event)=> {
            event.preventDefault();
            startNewGame();
        });

        form.appendChild(p1label);
        form.appendChild(p1input);
        form.appendChild(p2label);
        form.appendChild(p2input);
        form.appendChild(newGameBtn);

        mainBody.appendChild(form);

    };

    const startNewGame = function(){
        newP1Name = document.querySelector("#p1").value;
        newP2Name = document.querySelector("#p2").value;
        players.p1.name = newP1Name;
        players.p2.name = newP2Name;
        oldForm = document.querySelector("form");
        mainBody.removeChild(oldForm);
        display.update(board.getBoard());
    };

    return {create, startNewGame};

})();

// display.update(board.getBoard()); //initialize board display
form.create();