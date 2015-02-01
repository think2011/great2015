;
(function () {
    var Title = game.Title = function (props) {
        Title.superClass.constructor.call(this, props);
        this.init();
    };
    Q.inherit(Title, Q.DisplayObjectContainer);


    Title.prototype.init = function () {
        var title = new Q.Bitmap({id: 'title', image: game.getImage('title')});

        this.width = 335;
        this.height = 244;
        this.alpha = 0;
        this.speed = 4;
        this.scaleX = this.scaleY = 0.95;

        this.addChild(title);
    };
    
    
    Title.prototype.update = function () {
        if(this.y < 30) {
            this.y += this.speed;
            this.alpha += 0.1;
        }
    }
})();