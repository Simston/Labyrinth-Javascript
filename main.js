let nbRow = 4;
let nbCol = 4;
let posPlayer = [0, 0];

const myGame = document.querySelector('#game');

let line1 = [createCell(5), createCell(10), createCell(1), createCell(7)];
let line2 = [createCell(5), createCell(14), createCell(5), createCell(5)];
let line3 = [createCell(4), createCell(1), createCell(8), createCell(5)];
let line4 = [createCell(14), createCell(9), createCell(12), createCell(9)];
let gameArray = [line1, line2, line3, line4];

const createCell = picture => {
    let cell = {
        picture: picture,
        left: getLeft(),
        right: getRight(),
        top: getTop(),
        bot: getBot()
    }
    return cell

}
const getLeft = (picture) => {
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


const displayLabyrinth = array => {
    myGame.innerHTML = "";
    let content = "<table>";
    for (let i = 0; i < array.length; i++) {
        content += "<tr>";
        for (let j = 0; j < array[i].length; j++) {
            content += "<td>";
            content += "<img src='images/" + array[i][j] + ".png' />"
            if (i === nbRow - 1 && j === nbCol - 1) {
                let chara2Line = 25 + 100 * i;
                let chara2Col = 25 + 100 * j;
                content += "<img class='character1' src='images/1pixel.png' />"
            }
            if (i === posPlayer[0] && j === posPlayer[1]) {
                let chara1Line = 25 + 100 * posPlayer[0];
                let chara1Col = 25 + 100 * posPlayer[1];
                chara1Line += 20;
                chara1Col += 750;
                content += "<img class='character2' src='images/2pixel.png' style='left:" + chara1Col + "px;top:" + chara1Line + "px' />"

            }
            content += "</td>";
        }
        content += "</tr>";
    }
    content += "</table>";
    myGame.innerHTML = content;
}
displayLabyrinth(gameArray);

const getCell = (i, j) => {
    return tab[i][j];
}

document.addEventListener("keyup", function (event) {
    let linePlayer = posPlayer[0];
    let colPlayer = posPlayer[1];

    switch (event.key) {
        case "ArrowDown":
            if (linePlayer < nbRow - 1) {
                if (getCell(linePlayer, colPlayer).bot) {
                    linePlayer += 1;
                }
            }
            console.log(linePlayer)
            break;
        case "ArrowUp":
            if (linePlayer > 0) {
                if (getCell(linePlayer, colPlayer).top) {
                    linePlayer -= 1;
                }
            }
            break;
        case "ArrowLeft":
            console.log(colPlayer)
            if (colPlayer > 0) {
                if (getCell(linePlayer, colPlayer).left) {
                    colPlayer -= 1;
                }
            }
            break;
        case "ArrowRight":
            if (colPlayer < nbCol - 1) {
                if (getCell(linePlayer, colPlayer).right) {
                    colPlayer += 1;
                }

            }
            break;
        default:
            break;
    }
    posPlayer = [linePlayer, colPlayer];
    displayLabyrinth(gameArray)

    console.log(event.key);
});