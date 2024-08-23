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
    var color = "tomato";

    var spd = 2;
    var spdR2 = spd / Math.sqrt(2);
    var spdF2 = Math.floor(spdR2);

    var spr1 = new Sprite(16, 16);
    spr1.backgroundColor = "red";
    scene.addChild(spr1);

    var spr2 = new Sprite(16, 16);
    spr2.backgroundColor = "blue";
    scene.addChild(spr2);

    var spr3 = new Sprite(16, 16);
    spr3.backgroundColor = "green";
    scene.addChild(spr3);

    var spr4 = new Sprite(16, 16);
    spr4.backgroundColor = "pink";
    scene.addChild(spr4);

    var spr5 = new Sprite(16, 16);
    spr5.backgroundColor = "aqua";
    spr5.realX = 0;
    spr5.realY = 0;
    scene.addChild(spr5);

    scene.tl.then(function(){
        console.log("Test");
        spr1.x += spd;
        spr2.y += spd;
        spr3.x += spd;
        spr3.y += spd;
        spr4.x += spdR2;
        spr4.y += spdR2;

        spr5.realX += spdR2;
        spr5.realY += spdR2;
        spr5.x = Math.floor(spr5.realX);
        spr5.y = Math.floor(spr5.realY);
    });
    scene.tl.delay(2);
    scene.tl.loop();


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
