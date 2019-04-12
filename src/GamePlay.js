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

        var levelConfig = {
            ninjas:[
                {"sprite":"ninja", "x0":537, "y0":400, "x1":537, "y1":304, "scale":0.7, "angle":0, "timeAnimation":1500, "timeDelay":1500},
                {"sprite":"ninja", "x0":746, "y0":-70, "x1":746, "y1":17, "scale":1, "angle":180, "timeAnimation":1500, "timeDelay":1500},
                {"sprite":"ninja", "x0":314, "y0":305, "x1":400, "y1":236, "scale":1, "angle":45, "timeAnimation":1500, "timeDelay":1500},
                {"sprite":"ninja", "x0":744, "y0":285, "x1":727, "y1":337, "scale":0.6, "angle":195, "timeAnimation":1500, "timeDelay":1500},
                {"sprite":"ninja", "x0":860, "y0":266, "x1":860, "y1":189, "scale":0.9, "angle":0, "timeAnimation":1500, "timeDelay":1500},
                {"sprite":"ninja", "x0":288, "y0":281, "x1":350, "y1":340, "scale":1, "angle":135, "timeAnimation":1500, "timeDelay":1500},
                {"sprite":"ninja", "x0":213, "y0":242, "x1":181, "y1":311, "scale":1, "angle":200, "timeAnimation":1500, "timeDelay":1500},
                {"sprite":"ninja", "x0":68, "y0":231, "x1":77, "y1":211, "scale":0.3, "angle":17, "timeAnimation":1500, "timeDelay":1500},
                {"sprite":"ninja", "x0":716, "y0":517, "x1":691, "y1":487, "scale":0.5, "angle":-45, "timeAnimation":1500, "timeDelay":1500},
                {"sprite":"ninja", "x0":28, "y0":420, "x1":40, "y1":372, "scale":0.55, "angle":22, "timeAnimation":1500, "timeDelay":1500},
                {"sprite":"ninja", "x0":373, "y0":180, "x1":414, "y1":116, "scale":1, "angle":31, "timeAnimation":1500, "timeDelay":1500}
            ]
        };

        for(var i=0; i<levelConfig.ninjas.length; i++){
            var ninja = new Ninja(i,levelConfig.ninjas[i].sprite,levelConfig.ninjas[i].x0,levelConfig.ninjas[i].y0, levelConfig.ninjas[i].x1, levelConfig.ninjas[i].y1,levelConfig.ninjas[i].scale, levelConfig.ninjas[i].angle, levelConfig.ninjas[i].timeAnimation, levelConfig.ninjas[i].timeDelay);
            this.ninjaGroup.add(ninja);
        }

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