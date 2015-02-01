;
(function () {
    var Gift = game.Gift = function (props) {
        Gift.superClass.constructor.call(this, props);
        this.init();
    };
    Q.inherit(Gift, Q.DisplayObjectContainer);


    Gift.prototype.init = function () {
        var gift = new Q.Bitmap({
            image: game.getImage('gift'),
            x: 0,
            y: 0
        });

        this.width = 131;
        this.height = 87;
        this.regX = this.width >> 1;
        this.regY = this.height >> 1;
        this.visible = false;
        this.scaleX = this.scaleY = 0.5;

        this.isDrop = false;
        this.speed = 2;
        this.speedX = Q.supportTouch ? 2 : 2.8;  // pc 和 mobile 的使用体验不一致

        this.addChild(gift);
    };


    Gift.prototype.drop = function () {
        if(!this.isDrop) {
            this.isDrop = true;
            this.visible = true;
            this.alpha = 1;
            this.x = 50;
            this.y = -30;
        }
    };


    Gift.prototype.speedUp = function (num) {
      this.x += this.speedX;
    };


    Gift.prototype.isCatch = function (elem) {
      return this.hitTestObject(elem);
    };


    Gift.prototype.update = function () {
        if(this.isDrop) {
            // 旋转 & 掉落
            this.rotation += 0.5;
            this.y += this.speed;

            // 渐出
            if(this.y > game.height) {
                this.alpha -= 0.1;
                game.over(2);
            }

            if(this.alpha <= 0) {
                this.isDrop = false;
            }
        }
    }
})();