var assets = [
    "images/title.png",// タイトル
    "images/nasu.png"
];

function gameStart(){
    var scene = new Scene();
    core.replaceScene(scene); core.resume();

    //==========
    // ここから
    //==========

    scene.backgroundColor = "gray";

    // 中心座標
    var cX = scene.width/2;
    var cY = scene.height/2;
    var pX = 50;
    var color = "tomato";

    // クラスを使ってみよう
    var nasuA = new MyNasu(32, 32, cX-40, cY);
    nasuA.roll();// 回転させる!!
    scene.addChild(nasuA);

    var nasuB = new MyNasu(32, 32, cX+40, cY);
    nasuB.urouro();// 左右にウロウロ!!
    scene.addChild(nasuB);

    //==========
    // ここまで
    //==========
};

// スプライトを継承したMyNasuクラス!!
class MyNasu extends enchant.Sprite{

    constructor(w, h, x, y){
        super(w, h);
        this.centerX = x;
        this.centerY = y;
        this.image = core.assets["images/nasu.png"];
    }

    // 回転させる!!
    roll(){
        this.tl.rotateBy(360, 64);
        this.tl.then(function(){});
        this.tl.loop();
    }

    // ウロウロ!!
    urouro(){
        this.tl.moveBy(100, 0, 32);
        this.tl.moveBy(-100, 0, 32);
        this.tl.then(function(){});
        this.tl.loop();
    }
}

function titleStart(){// タイトル画面
    var scene = gameManager.createTitleScene();
    core.replaceScene(scene); core.pause();
    scene.on(enchant.Event.TOUCH_START, function(){gameStart();});
}

//==========
//EnchantJS
enchant();
var gameManager;
var core;
var scene;
window.onload = function(){
    gameManager = new common.GameManager();
    core = gameManager.createCore(320, 320);
    core.preload(assets);
    core.onload = function(){titleStart();};
    core.start();
};
