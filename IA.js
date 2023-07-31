var IA = {
    positionPastArray: [],
    startIA: function () {
        if (!endGame) {
            this.movePlayer();
            move();
            setTimeout(function () {
                IA.startIA();
            }, 500)
        }
    },

    movePlayer: function () {
        var possibilities = this.getPossibilities();
        posPlayer = this.getBestPossibility(possibilities);
        this.saveCurrentPosition(posPlayer);
        console.log(this.positionPastArray);
    },

    getPossibilities: function () {
        var possibilities = [];

        if (getCell(posPlayer[0], posPlayer[1]).bot) {
            possibilities.push([posPlayer[0] + 1, posPlayer[1]])
        }
        if (getCell(posPlayer[0], posPlayer[1]).top) {
            possibilities.push([posPlayer[0] - 1, posPlayer[1]])
        }
        if (getCell(posPlayer[0], posPlayer[1]).right) {
            possibilities.push([posPlayer[0], posPlayer[1] + 1])
        }
        if (getCell(posPlayer[0], posPlayer[1]).left) {
            possibilities.push([posPlayer[0], posPlayer[1] - 1])
        }

        return possibilities;
    },

    getBestPossibility: function (possibilities) {
        var bestPos = possibilities[0];
        var bestPosArray = [possibilities[0]];
        var bestPosWeight = this.getWeightPosition(possibilities[0]);

        for (let i = 0; i < possibilities.length; i++) {
            var weight = this.getWeightPosition(possibilities[i])
            if (weight < bestPosWeight) {
                bestPosWeight = weight;
                bestPos = possibilities[i];
                bestPosArray = [];
                bestPosArray.push(bestPos)
            } else if (weight === bestPosWeight) {
                bestPosArray.push(possibilities[i])
            }
        }

        var randomPossibility = Math.floor(Math.random() * bestPosArray.length);
        var posToPlay = bestPosArray[randomPossibility];
        return posToPlay;
    },

    saveCurrentPosition: function (position) {
        var idpositionPastArray = this.getpositionPastArray(position);
        if (idpositionPastArray === -1) {
            position.push(1);
            this.positionPastArray.push(position)
        } else {
            this.positionPastArray[idpositionPastArray][2]++;
        }
    },

    getpositionPastArray: function (position) {
        for (let i = 0; i < this.positionPastArray.length; i++) {
            if (this.positionPastArray[i][0] === position[0] && this.positionPastArray[i][1] === position[1]) {
                return i;
            }
        }
        return -1;
    },

    getWeightPosition: function (position) {
        for (let i = 0; i < this.positionPastArray.length; i++) {
            if (this.positionPastArray[i][0] === position[0] && this.positionPastArray[i][1] === position[1]) {
                return this.positionPastArray[i][2];
            }
        }
        return 0;

    }
}
