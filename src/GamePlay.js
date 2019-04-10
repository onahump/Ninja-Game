GamePlayManager = {
    init: function(){
        console.log("init")
    },
    preload: function(){
        console.log("preload")
    },
    create: function(){
        console.log("create")
    },
    update: function(){
        console.log("update")
    }
}

 var game =  new Phaser.Game(1012, 657, Phaser.CANVAS);

game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");