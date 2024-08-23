
var assets = [
    "images/title.png",// タイトル
    "images/bkg_320x480.png"
];

function gameStart(){
    var scene = new Scene();
    core.replaceScene(scene); core.resume();

    //==========
    // ここから
    //==========
    
    scene.backgroundColor = "gray";

    readyBullet(100);// マガジンの準備

    // 背景スクロール
    // var bkg = new Sprite(320, 480);
    // bkg.image = core.assets["images/bkg_320x480.png"];
    // bkg.x = 0;
    // bkg.y = 0;
    // scene.addChild(bkg);

    var ball = new Sprite(50, 50);
    ball.x = 100;
    ball.y = 100;
    scene.addChild(ball);

    var surface = new Surface(50, 50);
    surface.context.beginPath();
    surface.context.arc(25, 25, 25, 0, Math.PI*2, false);
    surface.context.fill();
    ball.image = surface;

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
    core = gameManager.createCore(320, 480);
    core.preload(assets);
    core.onload = function(){titleStart();};
    core.start();
};