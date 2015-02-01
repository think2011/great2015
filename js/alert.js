;
(function () {
    var Alert = game.Alert = function (props) {
        Alert.superClass.constructor.call(this, props);
        this.init();
    };
    Q.inherit(Alert, Q.DisplayObjectContainer);


    Alert.prototype.init = function () {
        var alert = new Q.Bitmap({id: 'alert', image: game.getImage('alert')});

        this.width = 335;
        this.height = 244;
        this.speed = 5;
        this.alpha = 0;
        this.show = false;
        this.scaleX = this.scaleY = 0.8;

        this.addChild(alert);
    };


    Alert.prototype.update = function () {
        if(this.show) {
            if(this.alpha < 1) {
                this.alpha += 0.1;
            }

            if (this.y <= 15) {
                this.y += this.speed;
            }
            else {
                this.y -= 0.3;
            }
        } else {
            this.alpha = 0;
        }

    }
})();