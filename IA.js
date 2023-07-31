var IA = {
    startIA: function () {
        this.movePlayer();
    },
    movePlayer: function () {
        console.log('movePlayer called');
        gameState.posPlayer = [0, 1];
        console.log('gameState.posPlayer', gameState.posPlayer);
    }
}
