import { levels } from './levels.js';
const myGame = document.querySelector('#game');
const alert = document.querySelector('.alert');
let niveauEnCours = 0;
let sizeImage = "";
let chareSizeImage = "";
let nbRow = null;
let nbCol = null;
let partyStart = true;
let posPlayer = [0, 0];
let mazeSave = [];


function createCell(picture) {
    let cell = {
        picture: picture,
        left: getLeft(picture),
        right: getRight(picture),
        top: getTop(picture),
        bot: getBot(picture)
    }
    return cell;
}

function getLeft(picture) {
    if (picture === 0 || picture === 1 || picture === 2 || picture === 3 || picture === 6 || picture === 7 || picture === 8 || picture === 12) {
        return true;
    }
}
const getRight = (picture) => {
    if (picture === 0 || picture === 1 || picture === 3 || picture === 4 || picture === 6 || picture === 9 || picture === 10 || picture === 13) {
        return true;
    }
}
const getTop = (picture) => {
    if (picture === 0 || picture === 2 || picture === 3 || picture === 4 || picture === 5 || picture === 8 || picture === 9 || picture === 14) {
        return true;
    }
}
const getBot = (picture) => {
    if (picture === 0 || picture === 1 || picture === 2 || picture === 4 || picture === 5 || picture === 7 || picture === 10 || picture === 11) {
        return true;
    }
}

let gameArray = null;
launchNextLevel();

function displayLabyrinth(array) {
    sizeImage = levels["level" + niveauEnCours].sizeImage;
    chareSizeImage = levels["level" + niveauEnCours].sizeCharacImage;
    myGame.innerHTML = "";
    let content = "<table class='tab'>";
    for (let i = 0; i < array.length; i++) {
        content += "<tr>";
        for (let j = 0; j < array[i].length; j++) {
            content += "<td>";
            content += "<img src='images/" + array[i][j].picture + ".png' style='width:" + sizeImage + "px; height:" + sizeImage + "px;' /> "
            if (i === nbRow - 1 && j === nbCol - 1) {
                let chara2Line = 25 + sizeImage * i;
                let chara2Col = 25 + sizeImage * j;
                content += "<img class='character1' src='images/1pixel.png' style='width:" + chareSizeImage + "px; height:" + chareSizeImage + "px;' />";

            }
            if (i === posPlayer[0] && j === posPlayer[1]) {
                let chara1Line = 12 + sizeImage * posPlayer[0];
                let chara1Col = 15 + sizeImage * posPlayer[1];
                content += "<img class='character2' src='images/2pixel.png' style='left: " + chara1Col + "px; top:" + chara1Line + "px; width:" + chareSizeImage + "px; height:" + chareSizeImage + "px;' />";
                content += "<img class='speech-bubble hidden' src='images/pixel-speech-bubble.gif' />"

            }
            content += "</td>";
        }
        content += "</tr>";
    }
    content += "</table>";
    myGame.innerHTML = content;
    if (partyStart) {
        for (let i = 0; i < levels["level" + niveauEnCours].nbRow; i++) {
            mazeSave.push(new Array(levels["level" + niveauEnCours].nbCol).fill(0));
        }
        partyStart = false;
    }
}
displayLabyrinth(gameArray);

const getCell = (i, j) => {
    return gameArray[i][j];
}

document.addEventListener("keyup", function (event) {
    let linePlayer = posPlayer[0];
    let colPlayer = posPlayer[1];

    switch (event.key) {
        case "ArrowDown":
            if (linePlayer < nbRow - 1) {
                if (getCell(linePlayer, colPlayer).bot) {
                    linePlayer += 1;
                    verificationEndGame(linePlayer, colPlayer);
                }
            }
            console.log(linePlayer)
            break;
        case "ArrowUp":
            if (linePlayer > 0) {
                if (getCell(linePlayer, colPlayer).top) {
                    linePlayer -= 1;
                    verificationEndGame(linePlayer, colPlayer);
                }
            }
            break;
        case "ArrowLeft":
            console.log(colPlayer)
            if (colPlayer > 0) {
                if (getCell(linePlayer, colPlayer).left) {
                    colPlayer -= 1;
                    verificationEndGame(linePlayer, colPlayer);
                }
            }
            break;
        case "ArrowRight":
            if (colPlayer < nbCol - 1) {
                if (getCell(linePlayer, colPlayer).right) {
                    colPlayer += 1;
                    verificationEndGame(linePlayer, colPlayer);
                }
            }
            break;
        default:
            break;
    }
    posPlayer = [linePlayer, colPlayer];
    displayLabyrinth(gameArray)
    displaySpeechBubble();
});

const verificationEndGame = (posPlayerLine, posPlayerCol) => {
    if (posPlayerLine === (nbRow - 1) && posPlayerCol === (nbCol - 1)) {
        let content = "";
        let nextLevel = false;

        if (niveauEnCours < levels.nbLevels) {
            content += "<p class='text-alert'>Well done ! Next level : " + (niveauEnCours + 1) + " ?</p>";
            content += "<button id='nextLevelButton' class='btn btn-primary'> Next </button>";
            nextLevel = true;
        } else {
            content += "You have won !"
        }
        alert.innerHTML = content;
        alert.classList.remove('d-none');
        if (nextLevel) {
            document.querySelector('#nextLevelButton').addEventListener('click', launchNextLevel);
        }

    }
}

function displaySpeechBubble() {
    if (posPlayer[0] === nbRow - 1 && posPlayer[1] === nbCol - 1) {
        const speechBubble = document.querySelector('.speech-bubble');
        console.log(speechBubble);
        if (speechBubble) {
            speechBubble.style.display = 'block';
        }
    } else {
        const speechBubble = document.querySelector('.speech-bubble');
        if (speechBubble) {
            speechBubble.style.display = 'none';
        }
    }
}
function launchNextLevel() {
    niveauEnCours++;

    alert.classList.add("d-none");
    nbRow = levels["level" + niveauEnCours].nbRow;
    nbCol = levels["level" + niveauEnCours].nbCol;
    posPlayer = [0, 0];
    gameArray = loadLevel();

    displayLabyrinth(gameArray);

}


function loadLevel() {
    let newLevelArray = [];

    for (let i = 0; i < levels["level" + niveauEnCours].nbRow; i++) {
        let row = [];
        for (let j = 0; j < levels["level" + niveauEnCours].nbCol; j++) {
            let val = levels["level" + niveauEnCours]["line" + i]["case" + j];
            row.push(createCell(val))
        }
        newLevelArray.push(row);
    }
    return newLevelArray;
}
function aiResolve() {
    let linePlayer = posPlayer[0];
    let colPlayer = posPlayer[1];
    let counterLaby = 1;

    const getRadar = () => getCell(linePlayer, colPlayer);

    const move = () => {
        const radar = getRadar();

        // Vérifier la possibilité de déplacement verticalement uniquement
        if (radar.bot && mazeSave[linePlayer][colPlayer] !== "closed") {
            const newRadar = getRadar();
            mazeSave[linePlayer][colPlayer] = counterLaby;
            counterLaby++;

            let possibleBot = getCell(linePlayer + 1, colPlayer).bot;
            console.log(possibleBot);

            if (possibleBot) {
                linePlayer += 1;
            } else {
                console.log("IA bloquée. Arrêt du mouvement BOT .");
                mazeSave[linePlayer][colPlayer] = 'closed';
                return; // Arrêter l'appel récursif ici
            }
        }
        /*else if (radar.top) {
            linePlayer -= 1;
        }

        // Vérifier la possibilité de déplacement horizontalement uniquement
        if (radar.right) {
            colPlayer += 1;
        } else if (radar.left) {
            colPlayer -= 1;
        }*/

        //console.log(posPlayer);
        verificationEndGame(linePlayer, colPlayer);
        displayLabyrinth(gameArray);
        displaySpeechBubble();

        // Vérifier si l'IA est bloquée dans la même position après le déplacement
        const newRadar = getRadar();

        if (!newRadar.bot && !newRadar.right && !newRadar.left) {
            console.log("IA bloquée. Arrêt du mouvement.");
            mazeSave[linePlayer][colPlayer] = 'closed';
            console.log(mazeSave);
            return; // Arrêter l'appel récursif ici
        }
        else {
            setTimeout(move, 500); // Chaque déplacement aura lieu toutes les 500 millisecondes
        }
    };

    const moveInterval = setTimeout(move, 500); // chaque déplacement aura lieu toutes les 500 millisecondes
    console.log(mazeSave);
}
// Appeler aiResolve() dès que la page est chargée
document.addEventListener("DOMContentLoaded", function () {
    aiResolve();
});