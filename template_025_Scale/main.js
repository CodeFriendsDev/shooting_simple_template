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

    var spr = new Sprite(32, 32);
    spr.image = core.assets["images/nasu.png"];
    spr.x = cX;
    spr.y = cY;
    spr.scaleX = 5.0;
    spr.scaleY = 5.0;
    scene.addChild(spr);

    //==========
    // ここまで
    //==========
};

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
