GamePlayManager = {
    init: function(){
    },
    preload: function(){
        game.load.image('background', 'assets/img/background.png');
        game.load.image('object1' , 'assets/img/objects1.png');
        game.load.image('object2' , 'assets/img/objects2.png');
    },
    create: function(){
        game.add.sprite(0,0, 'background');
        game.add.sprite(0,100, 'object1');
        game.add.sprite(0,0, 'object2');
    },
    update: function(){
    }
}

var game =  new Phaser.Game(1012, 657, Phaser.CANVAS);

game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");