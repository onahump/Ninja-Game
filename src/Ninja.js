Ninja = function () {
    Phaser.Sprite.call(this, game, 100,500, 'ninja');

    this.inputEnabled = true; //this se refiere a nuestra funcion ninja. PErmite realizar click
    this.input.pixelPerfectClick = true; //Solo permite dar click en la imagen, no en lo transparente
    this.events.onInputDown.add( function(){
        console.log("CLICK"); 
    }, this);

}
Ninja.prototype = Object.create(Phaser.Sprite.prototype);
Ninja.prototype.constructor = Ninja;
