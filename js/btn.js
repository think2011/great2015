;
(function () {
    var Btn = game.Btn = function (props) {
        Btn.superClass.constructor.call(this, props);
        this.init();
    };
    Q.inherit(Btn, Q.DisplayObjectContainer);


    Btn.prototype.init = function () {
        var play = new Q.Button({id: 'play', image: game.getImage('playBtn')});
        play.width = 180;
        play.height = 69;
        play.setUpState({rect: [0, 0]});

        // 开始游戏
        play.addEventListener(game.events[0], game.play.bind(game));

        this.addChild(play);
    };
})();