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
        game.load.image('iconLive', 'assets/img/iconLive.png');

        game.load.spritesheet('smoke' , 'assets/img/smoke.png',125,125,20);
        game.load.spritesheet('buttonPlay', 'assets/img/buttonPlay.png', 200,76,2);
        game.load.spritesheet('buttonContinue', 'assets/img/buttonContinue.png', 200,76,2);
        game.load.bitmapFont('fontWhite', 'assets/fonts/bitmapFonts/fontWhite.png', 'assets/fonts/bitmapFonts/fontWhite.fnt');
    },
    create: function(){
        game.add.sprite(0,0, 'background');

        this.ninjaGroup = game.add.group();
        this.smokeGroup = game.add.group();

        game.add.sprite(0,0, 'object1');
        game.add.sprite(0,0, 'object2');

        this.arrayIconLives = [];
        this.arrayIconLives[0] = game.add.sprite(200, game.height - 45, 'iconLive');
        this.arrayIconLives[1] = game.add.sprite(250, game.height - 45, 'iconLive');
        this.arrayIconLives[2] = game.add.sprite(300, game.height - 45, 'iconLive');

        this.currentScore = 0;
        this.txtCurrentScore = game.add.bitmapText(100,35,'fontWhite', '0', 55);
        this.txtCurrentScore.anchor.setTo(0.5);

        this.txtTimeLeft = game.add.bitmapText(950,35,'fontWhite', '', 55);
        this.txtTimeLeft.anchor.setTo(0.5);


        var pixel = game.add.bitmapData(1,1);
        pixel.ctx.fillStyle = '#000000';
        pixel.ctx.fillRect(0,0,1,1);

        this.bgMenu = game.add.sprite(0,0,pixel);
        this.bgMenu.width = game.width;
        this.bgMenu.height = game.height;
        this.bgMenu.alpha = 0.5;

        this.buttonPlay = game.add.button(game.width/2, game.height*0.8, 'buttonPlay', this.startGame, this, 1, 0, 1, 0);
        this.buttonPlay.anchor.setTo(0.5);

        this.buttonContinue = game.add.button(game.width/2, game.height*0.8, 'buttonContinue', this.nextLevel, this, 1, 0, 1, 0);
        this.buttonContinue.anchor.setTo(0.5);
        this.buttonContinue.visible =false;



        this.scoreTextTween  = game.add.tween(this.txtCurrentScore.scale).to({
            x: [1, 1.5, 1],
            y: [1, 1.5, 1]
        }, 500, Phaser.Easing.Elastic.Out, false, 0, 0, false);

    },
    startGame:function () {
        this.level = 0;
        this.currentScore = 0;
        this.lives = 3;
        this.refreshArrayLives();
        this.prepareLevel();
        this.buttonContinue.visible = false;
    },
    nextLevel: function(){
        this.level ++;
        this.prepareLevel();
    },
    refreshArrayLives: function(){
        for(var i =0; i<this.arrayIconLives.length; i++){
            this.arrayIconLives[i].visible = false;
        }
        for(var i=0; i<this.lives; i++){
            this.arrayIconLives[i].visible = true;
        }
    },
    looseLive: function () {
        this.lives --;
        this.refreshArrayLives();
        if(this.lives<=0){
            this.gameOver();
        }
    },
    gameOver: function () {
        game.time.events.remove(this.timerDown);
        this.destroyNinjaGroup();
        this.bgMenu.visible = true;
        this.buttonPlay.visible = true;
        game.time.events.remove(this.timerShowNinja);
    },
    destroyNinjaGroup: function () {
        this.ninjaGroup.forEach(function (ninja) {
            ninja.kill();
        },this);
        this.ninjaGroup.removeAll(true); //Destuyendo todos los ninjas del grupo
    },
    prepareLevel: function () {
        this.buttonContinue.visible = false;
        this.txtCurrentScore.text = this.currentScore.toString();
        this.buttonPlay.visible = false;
        this.bgMenu.visible = false;
        var levelConfig = {
            timeLeft:10,
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

        this.timeLeft = levelConfig.timeLeft;
        this.txtTimeLeft.text = this.timeLeft.toString();
        game.time.events.add(1000, this.callBackShowNinja, this);

        this.timerDown = game.time.events.loop(1000, this.callBackTimerDown, this);
    },
    callBackTimerDown: function () {
        this.timeLeft --;
        this.txtTimeLeft.text = this.timeLeft.toString();
        if (this.timeLeft<=0) {
            this.levelComplete();
        }
    },
    levelComplete: function () {
        this.bgMenu.visible = true;
        this.buttonContinue.visible = true;
        this.destroyNinjaGroup();
        game.time.events.remove(this.timerDown);
        game.time.events.remove(this.timerShowNinja);
    },
    callBackShowNinja: function () {
        this.timerShowNinja = game.time.events.add(1000, this.callBackShowNinja, this);
        this.showNinja();
    },
    showNinja: function () {
        var newNinja = this.getRandomNinja();
        if(newNinja != null) {
            newNinja.Appear();
        }
    },
    hitNinja:function (id, x , y, scale, angle) {
        this.increaseScore();
        var currentSmoke =  this.smokeGroup.getFirstDead();
        if (currentSmoke == null) {
            currentSmoke = this.smokeGroup.create(x,y, 'smoke');
            currentSmoke.animations.add('explode', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);
            currentSmoke.anchor.setTo(0.5,1);
        }

        currentSmoke.reset(x,y);
        currentSmoke.scale.setTo(scale);
        currentSmoke.angle = angle;
        currentSmoke.animExplode = currentSmoke.animations.play('explode',16);
        currentSmoke.animExplode.onComplete.add(function (sprite, animation) {
            sprite.kill();
        },this)
    },
    getRandomNinja: function(){
        var ninjaAvailable = false;
        var amountNinjas = this.ninjaGroup.length;

        for(var i=0; i<amountNinjas; i++){
            if (!this.ninjaGroup.children[i].alive) {
                ninjaAvailable =true
            }
        }
        if(!ninjaAvailable){
            return null;
        }
        var index = game.rnd.integerInRange(0, amountNinjas-1)
        var randomNinja = this.ninjaGroup.children[index];
        while (randomNinja.alive) {
            index = game.rnd.integerInRange(0, amountNinjas-1)
            randomNinja = this.ninjaGroup.children[index];
        }
        return randomNinja;
    },
    increaseScore: function () {
      this.currentScore += 100;
      this.txtCurrentScore.text = this.currentScore.toString();
      this.scoreTextTween.start();
    },
    update: function(){
    }
}

var game =  new Phaser.Game(1012, 657, Phaser.AUTO);

game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");