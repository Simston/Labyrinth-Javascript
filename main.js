const myGame = document.querySelector('#game');
const alert = document.querySelector('.alert');
const iaCheckBox = document.querySelector('#IA');

var niveauEnCours = 0;
var sizeImage = "";
var chareSizeImage = "";
var nbRow = null;
var nbCol = null;
var posPlayer = [0, 0];

var endGame = false;
var isIaOn = false;

function createCell(picture) {
    var cell = {
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

function startIA() {
    iaCheckBox.setAttribute('disabled', 'disabled')
    isIaOn = true;
    IA.startIA();
}

var gameArray = null;
launchNextLevel();

function displayLabyrinth(array) {
    sizeImage = levels["level" + niveauEnCours].sizeImage;
    chareSizeImage = levels["level" + niveauEnCours].sizeCharacImage;
    myGame.innerHTML = "";
    var content = "<table class='tab'>";
    for (var i = 0; i < array.length; i++) {
        content += "<tr>";
        for (var j = 0; j < array[i].length; j++) {
            content += "<td>";
            content += "<img src='images/" + array[i][j].picture + ".png' style='width:" + sizeImage + "px; height:" + sizeImage + "px;' /> "
            if (i === nbRow - 1 && j === nbCol - 1) {
                var chara2Line = 25 + sizeImage * i;
                var chara2Col = 25 + sizeImage * j;
                content += "<img class='character1' src='images/1pixel.png' style='width:" + chareSizeImage + "px; height:" + chareSizeImage + "px;' />";

            }
            if (i === posPlayer[0] && j === posPlayer[1]) {
                var chara1Line = 12 + sizeImage * posPlayer[0];
                var chara1Col = 15 + sizeImage * posPlayer[1];
                content += "<img class='character2' src='images/2pixel.png' style='left: " + chara1Col + "px; top:" + chara1Line + "px; width:" + chareSizeImage + "px; height:" + chareSizeImage + "px;' />";
                content += "<img class='speech-bubble hidden' src='images/pixel-speech-bubble.gif' />"

            }
            content += "</td>";
        }
        content += "</tr>";
    }
    content += "</table>";
    myGame.innerHTML = content;

}
displayLabyrinth(gameArray);

function getCell(i, j) {
    return gameArray[i][j];
}

document.addEventListener("keyup", function (event) {
    if (!isIaOn) {
        var linePlayer = posPlayer[0];
        var colPlayer = posPlayer[1];

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
        move();
    }
});

function move() {
    displayLabyrinth(gameArray);
    displaySpeechBubble();
}


function move() {
    var linePlayer = posPlayer[0];
    var colPlayer = posPlayer[1];
    displayLabyrinth(gameArray);
    verificationEndGame(linePlayer, colPlayer);
    displaySpeechBubble();
}

function verificationEndGame(posPlayerLine, posPlayerCol) {
    if (posPlayerLine === (nbRow - 1) && posPlayerCol === (nbCol - 1)) {
        var content = "";
        var nextLevel = false;

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
        endGame = true;
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
    var newLevelArray = [];
    isIaOn = false;
    endGame = false;
    IA.positionPastArray = [];
    IA.positionBlocked = [];
    iaCheckBox.removeAttribute('disabled');
    iaCheckBox.checked = false;

    for (var i = 0; i < levels["level" + niveauEnCours].nbRow; i++) {
        var row = [];
        for (var j = 0; j < levels["level" + niveauEnCours].nbCol; j++) {
            var val = levels["level" + niveauEnCours]["line" + i]["case" + j];
            row.push(createCell(val))
        }
        newLevelArray.push(row);
    }
    return newLevelArray;
}
