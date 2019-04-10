GamePlayManager = {
    init: function(){
        
    },
    preload: function(){
    },
    create: function(){
    },
    update: function(){
    }
}

 var game =  new Phaser.Game(1012, 657, Phaser.CANVAS);

game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");