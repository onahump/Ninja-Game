GamePlayManager = {
    init: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    preload: function(){
        game.load.image('background', 'assets/img/background.png');
        game.load.image('object1' , 'assets/img/objects1.png');
        game.load.image('object2' , 'assets/img/objects2.png');
        game.load.image('ninja' , 'assets/img/ninja.png');

    },
    create: function(){
        game.add.sprite(0,0, 'background');
        game.add.sprite(0,100, 'object1');
        game.add.sprite(0,0, 'object2');

        var ninja = game.add.sprite(500, 300, 'ninja');

        ninja.inputEnabled = true;
        ninja.input.pixelPerfectClick = true;
        ninja.events.onInputDown.add( function(){
            console.log("CLICK");
        }, this);


    },
    update: function(){
    }
}

var game =  new Phaser.Game(1012, 657, Phaser.AUTO);

game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");