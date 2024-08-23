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

    // 茄子
    var nasuA = createSprite(32, 32, cX-120, cY-32, "images/nasu.png");
    scene.addChild(nasuA);
    nasuA.tl.rotateBy(360, 64);
    nasuA.tl.then(function(){});
    nasuA.tl.loop();

    var nasuB = createSprite(32, 32, cX+120, cY-32, "images/nasu.png");
    scene.addChild(nasuB);
    nasuB.tl.rotateBy(360, 64);
    nasuB.tl.then(function(){});
    nasuB.tl.loop();

    //==========
    // ここまで
    //==========
};

function createSprite(w, h, x, y, image){
    var spr = new Sprite(w, h);
    spr.image = core.assets[image];
    spr.centerX = x;
    spr.centerY = y;
    return spr;
}

function createLabel(scene, text, x, y, size, color){
    var lbl = new Label(text);
    lbl.x = x - lbl._boundWidth / 2;
    lbl.y = y - lbl._boundHeight / 2;
    lbl.color = color;
    lbl.font = size + "px 'PixelMplus10'";
    return lbl;
}

function jumpLabel(lbl, height, frame){
    // https://easings.net/ (大文字にする事!!)
    // https://atmarkit.itmedia.co.jp/ait/articles/1304/25/news034_3.html
    lbl.tl.moveBy(0, -height, frame, enchant.Easing.QUAD_EASEOUT);
    lbl.tl.moveBy(0, height, frame, enchant.Easing.QUAD_EASEIN);
    lbl.tl.then(function(){
        console.log("end");
    });
    lbl.tl.delay(8);
    lbl.tl.loop();
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
