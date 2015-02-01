;
(function () {
    var Bg = game.Bg = function (props) {
        Bg.superClass.constructor.call(this, props);

        this.init();
    };
    Q.inherit(Bg, Q.DisplayObjectContainer);


    Bg.prototype.init = function () {
        var bg1 = new Q.Bitmap({
            image: game.getImage('bg1'),
            x: 0,
            y: 0
        });
        var bg2 = new Q.Bitmap({
            image: game.getImage('bg2'),
            x: 340,
            y: 0
        });
        var bg3 = new Q.Bitmap({
            image: game.getImage('bg3'),
            x: 681,
            y: 0
        });

        this.width = 1024;
        this.height = 478;
        this.regX = 702;
        this.alpha = 0.3;
        this.eventChildren = false;

        this.speed = 0.1;
        this.run = false;
        this.isSpeedUp = false;
        this.luckyPoint = [660];

        this.addEventListener(game.events[0], function () {
            this.speedUp();

            if(game.alert.show) {
                game.alert.show = false;
            }
        });

        this.addChild(bg1, bg2, bg3);
    };

    Bg.prototype.speedUp = function () {
        if(!this.isSpeedUp) {
            if(this.speed <= 3) this.speed += 0.3;

            game.gift.speedUp();
        }
    };

    Bg.prototype.update = function () {
        if (this.run) {
            if (this.regX <= 0) {
                this.regX = 0;
                game.bike.body.stop();

                if(this.alpha > 0.5) {
                    this.alpha -= 0.05; // 背景淡出
                } else {
                    this.run = false;
                    game.over(2);
                }
            } else {
                if(this.alpha < 1) this.alpha += 0.05;
                this.regX -= this.speed;

                // 掉落礼物
                if(this.luckyPoint.length && this.regX <= this.luckyPoint[0]) {
                    game.gift.drop();
                    this.luckyPoint.splice(0, 1);
                }

                // 检测碰撞
                var isCatch = game.gift.isCatch(game.bike);
                if(isCatch) {
                    game.over(1);
                }
            }
        }
    }
})();