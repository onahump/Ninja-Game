Ninja = function (id, assetName, x0, y0, x1, y1, scale, angle, timeAnimation, timeDelay) {
    Phaser.Sprite.call(this, game, 100,500, 'ninja');

    this.inputEnabled = true; //this se refiere a nuestra funcion ninja. PErmite realizar click
    this.input.pixelPerfectClick = true; //Solo permite dar click en la imagen, no en lo transparente
    this.events.onInputDown.add( function(){
        console.log("CLICK");
        this.kill();
        GamePlayManager.hitNinja(this.id, this.x, this.y, this.scale.x, this.angle);
        if (this.tweenIn != null) {
            this.tweenIn.stop();
        }
        if (this.tweenOut != null) {
            this.tweenOut.stop();
        }
    }, this);

    this.id = id;
    this.assetName = assetName;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.defaultScale = scale;
    this.angle = angle;
    this.timeAnimation = timeAnimation;
    this.timeDelay = timeDelay;

    this.scale.setTo(scale);
    this.anchor.setTo(0.5,1);
    this.kill();
}
Ninja.prototype = Object.create(Phaser.Sprite.prototype);
Ninja.prototype.constructor = Ninja;

Ninja.prototype.Appear = function () {
    this.reset(this.x0, this.y0);
    this.tweenIn = game.add.tween(this);
    this.tweenOut = game.add.tween(this);

    this.tweenIn.to( {x: this.x1, y:this.y1}, this.timeAnimation, Phaser.Easing.Quadratic.In);
    this.tweenOut.to( {x: this.x0, y:this.y0}, this.timeAnimation, Phaser.Easing.Quadratic.In, false, this.timeDelay);

    this.tweenIn.onComplete.add(function () {
        this.tweenOut.start();
        this.tweenOut.onComplete.add(function () {
            console.log("END ANIMATION");
            if (this.tweenIn != null) {
                this.tweenIn.stop();
            }
            if (this.tweenOut != null) {
                this.tweenOut.stop();
            }
            this.kill();
        }, this);
    }, this);

    this.tweenIn.start();
}