let gameState = {
    currentPlayerName: "",
    otherPlayerName: "",
    // gameGrid: [
    //     [null, null, null],
    //     [null, null, null],
    //     [null, null, null]
    // ],
    }



// function renderGameGrid() {
//     for (let numOfRowsMade = 0; numOfRowsMade < gameState.gameGrid.length; numOfRowsMade++) {
//         let newRowElement = document.createElement("div");
//         newRowElement.classList.add("row");
//         let currentJSRow = gameState.gameGrid[numOfRowsMade];

//         for (let numOfCellsMade = 0; numOfCellsMade < currentJSRow.length; numOfCellsMade++) {
//             let newCellElement = document.createElement("div");
//             newCellElement.classList.add("cell");

//             if(currentJSRow[numOfCellsMade] != null) {
//                 newCellElement.textContent = currentJSRow[numOfCellsMade];
//             } else {
//                 newCellElement.textContent = ""
//             }

//             newRowElement.appendChild(newCellElement)
//         }
//         gameGridContainer.appendChild(newRowElement);
//     }
// };

let winnerText = document.getElementById('winnerText')
let cellBoxes = Array.from(document.getElementsByClassName('cell'))
let playerX = "X"
let playerO = "O"
let currentPlayer = playerX
let cellSpaces = Array(9).fill(null)
let nameInputEle = document.getElementById("name-input");
let nameInputEleTwo = document.getElementById("name-input-two")
let submitButtonEle = document.getElementById("submit-button");
let submitButtonEleTwo = document.getElementById("submit-button-two");
let displayNameEle = document.getElementById("displayed-name")
let displayNameEleTwo = document.getElementById("displayed-name-two")
let restartBtn = document.getElementById('restartButton')

const winState = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ]

function displayNameFunc() {
    let nameSubmission = nameInputEle.value;
    gameState.currentPlayerName = nameSubmission;

    displayNameEle.textContent = `Player-X: ${gameState.currentPlayerName}`;
}

submitButtonEle.addEventListener("click", displayNameFunc);

function displayNameFuncTwo() {
    let otherSubmission = nameInputEleTwo.value;
    gameState.otherPlayerName = otherSubmission;

    displayNameEleTwo.textContent = `Player-O: ${gameState.otherPlayerName}`;
}

submitButtonEleTwo.addEventListener("click",displayNameFuncTwo)



function gameStart() {
    cellBoxes.forEach(cell => cell.addEventListener('click', cellsClicked))
}

function cellsClicked(event) {
    const id = event.target.id
    if(!cellSpaces[id]){
        cellSpaces[id] = currentPlayer;
        event.target.innerText = currentPlayer;
    if (gameIsWon()) {
        gameEnd()
    } 
    if(currentPlayer == playerX) {
        currentPlayer = playerO
    } else {
        currentPlayer = playerX
    }
    
}
}


function gameIsWon() {
    for (const condition of winState) {
        let [a, b, c] = condition

        if(cellSpaces[a] && (cellSpaces [a] == cellSpaces[b] && cellSpaces[a] == cellSpaces[c])){
            return [a, b, c]
        }
    }
}
function gameEnd() {
        const cellsDraw = cellBoxes.every((cellSpaces) => cellSpaces !== null);
        if (cellsDraw) {
            winnerText.innerText = `Player-${currentPlayer} WINS!!`
        } else {
            return winnerText.innerText = "Draw";
        }
// This ^^ can't be right....I can't get the game to say Draw, but it'll say win...
    cellBoxes.forEach((cell) => cell.removeEventListener("click", cellsClicked));
}

restartBtn.addEventListener('click', restart)



function restart() {
    currentPlayer = playerX
    cellSpaces.fill("")
    cellBoxes.forEach((cell) => {
    cell.innerText = "";
    })

    winnerText.innerText = "Who will win??";
    cellBoxes.forEach((cell) => cell.addEventListener("click", cellsClicked))
    nameInputEle.value = ""
    nameInputEleTwo.value = ""
    displayNameEle.textContent = "Player-X:"
    displayNameEleTwo.textContent = "Player-O:"
}


gameStart()