;
(function () {
    var Bike = game.Bike = function (props) {
        Bike.superClass.constructor.call(this, props);
        this.init();
    };
    Q.inherit(Bike, Q.DisplayObjectContainer);


    Bike.prototype.init = function () {
        var body = this.body = new Q.MovieClip({id: 'body', image: game.getImage("bike"), interval: 200});
        body.addFrame([
            {rect: [0, 0, 74, 74], label: 'static'},
            {rect: [0, 2, 74, 74]}
        ]);
        body.gotoAndStop('static');

        this.speed = 8;
        this.run = false;
        this.addChild(body);
    };


    Bike.prototype.update = function () {
        if (this.run) {
            if (this.x <= 150) {
                this.x = 150;
                this.run = false;

                game.bg.run = true;
            } else {
                this.x -= (this.speed += 0.1);
                this.body.play();
            }
        }
    }
})();