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

        this.ninjaGroup = game.add.group();

        game.add.sprite(0,0, 'object1');
        game.add.sprite(0,0, 'object2');

        this.prepareLevel();

    },
    prepareLevel: function () {
        var ninja1 = new Ninja(0,'ninja', 537, 400, 537, 304, 0.7, 0, 1500, 1500);
        this.ninjaGroup.add(ninja1);

        var ninja2 = new Ninja(1,'ninja', 746, -70, 746, 17, 1, 180, 1500, 1500);
        this.ninjaGroup.add(ninja2);

        game.time.events.add(1000, this.callBackShowNinja, this);
    },
    callBackShowNinja: function () {
        game.time.events.add(1000, this.callBackShowNinja, this);
        this.showNinja();
    },
    showNinja: function () {
        var newNinja = this.ninjaGroup.getFirstDead();
        console.log("SHOW NINJA:"+ newNinja);
        if(newNinja != null) {
            newNinja.Appear();
        }
    },
    update: function(){
    }
}

var game =  new Phaser.Game(1012, 657, Phaser.AUTO);

game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");