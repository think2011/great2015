;
(function () {
    var game = window.game = {
        res: [
            {id: "title", size: 1, src: "imgs/title.png"},
            {id: "bg1", size: 1, src: "imgs/bg_01.png"},
            {id: "bg2", size: 1, src: "imgs/bg_02.png"},
            {id: "bg3", size: 1, src: "imgs/bg_03.png"},
            {id: "playBtn", size: 1, src: "imgs/play.png"},
            {id: "gift", size: 1, src: "imgs/gift.png"},
            {id: "alert", size: 1, src: "imgs/alert.png"},
            {id: "bike", size: 1, src: "imgs/bike.png"}
        ],
        fps: 60,
        width: 320,
        height: 480
    };


    /**
     * 获取对应图片
     * @param id
     */
    game.getImage = function (id) {
        return this.images[id].image;
    };


    game.init = function () {
        var that = this;

        // 引用移动设备特性
        if (Q.isWebKit && Q.supportTouch) {
            document.body.style.webkitTouchCallout = "none";
            document.body.style.webkitUserSelect = "none";
            document.body.style.webkitTextSizeAdjust = "none";
            document.body.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
            document.ontouchmove = function(e){ e.preventDefault(); }; // 禁止了所有的滑动事件，慎用。
        }

        // 初始化进度显示
        that.container = Q.getDOM("container");
        that.progress = Q.createDOM('div', {
            style: {
                width: that.width + 'px',
                textAlign: 'center',
                color: '#777',
                position: 'absolute',
                left: 0,
                top: (that.height >> 1) + "px"
            }
        });
        that.progress.innerHTML = '正在启动..';
        that.container.appendChild(that.progress);

        // 加载资源
        var loader = new Q.ImageLoader();
        loader.addEventListener("loaded", that.onLoadLoaded.bind(that));
        loader.addEventListener("complete", that.onCompleteLoaded.bind(that));
        loader.load(that.res);
    };


    // 加载资源过程
    game.onLoadLoaded = function (e) {
        var value = Math.round(e.target.getLoadedSize() / e.target.getTotalSize() * 100);
        this.progress.innerHTML = '稍等片刻.. ' + value + '%';
    };


    // 加载资源完成
    game.onCompleteLoaded = function (e) {
        var that = this;
        that.images = e.images;
        that.container.removeChild(that.progress);

        // 初始化上下文&创建舞台
        that.context = new Quark.DOMContext({canvas: that.container});
        that.stage = new Q.Stage({context: that.context, width: that.width, height: that.height});

        that.build();
    };


    // 创建游戏
    game.build = function (skip) {
        var that = this;

        // 初始化计时器
        that.timer = new Q.Timer(1000 / that.fps);
        that.timer.addListener(that.stage);
        that.timer.addListener(Q.Tween);
        that.timer.start();

        // 注册事件
        var em = new Q.EventManager();
        that.events = Q.supportTouch ? ["touchend"] : ["mouseup"];
        em.registerStage(that.stage, that.events, true, true);

        // 初始化元素
        that.bg = new that.Bg();
        that.gift = new that.Gift();
        that.bike = new that.Bike({ x: 320, y: 380, autoSize: true});
        that.title = new that.Title({ id: 'title', x: 0, y: 0, autoSize: true});
        that.alert = new that.Alert({ id: 'alert', x: 24, y: 0, autoSize: true});
        that.btn = new that.Btn({id: 'btn', x: 70, y: 220, autoSize:true});

        // 置入舞台
        that.stage.addChild(
            that.bg,
            that.title,
            that.bike,
            that.gift,
            that.alert,
            that.btn
        );

        if(skip) that.play();
    };


    game.play = function () {
        var that = this;

        that.stage.removeChildById('btn');
        that.stage.removeChildById('title');

        that.bike.run = true;
        that.bg.run = true;

        setTimeout(function () {
            that.alert.show = true;
        }, 300);
    };


    game.replay = function (skip) {
        this.timer.stop();
        this.stage.removeAllChildren();

        this.build(skip);
    };


    /**
     * 游戏结局
     * @param state 1.抓住了 2.没抓住
     */
    game.over = function (state) {
        var str;

        switch (state) {
            case 1:
                str = '啊，恭喜您抓住了红包，新的一年您一定会快快乐乐的！';
                break;
            case 2:
                str = '啊哦，没有抓住呢，再来一次吧！！';
                break;

            default :
                // 没有隐藏结局啦..
        }

        this.timer.stop();
        confirm(str) ? this.replay(true) : this.replay();
    };


    game.init();
})();