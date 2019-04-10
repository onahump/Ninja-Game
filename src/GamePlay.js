GamePlayManager = {
    init: function(){

    },
    preload: function(){
        game.load.image('background', 'assets/img/background.png');
    },
    create: function(){
        game.add.sprite(0,0, 'background');
    },
    update: function(){
    }
}

var game =  new Phaser.Game(1012, 657, Phaser.CANVAS);

game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");