
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
    
    scene.backgroundColor = "whitesmoke";

    // 中心座標
    var cX = scene.width/2;
    var cY = scene.height/2;
    var pX = 50;
    var color = "firebrick";

    // 4つのラベル
    var lbl1 = createLabel(scene, "2", cX-pX*1.7, cY, 64, color);
    scene.addChild(lbl1);
    var lbl2 = createLabel(scene, "0", cX-pX*0.7, cY, 64, color);
    scene.addChild(lbl2);
    var lbl3 = createLabel(scene, "2", cX+pX*0.3, cY, 64, color);
    scene.addChild(lbl3);
    var lbl4 = createLabel(scene, "4", cX+pX*1.3, cY, 64, color);
    scene.addChild(lbl4);

    var msg = createLabel(scene, " HAPPY NEW YEAR!!", cX, cY+80, 16, "black");
    scene.addChild(msg);

    // スプライト
    var nasu = new Sprite(32, 32);
    nasu.backgroundColor = "purple";
    nasu.x = cX - nasu.width/2;
    nasu.y = cY - 80;
    scene.addChild(nasu);

    nasu.tl.rotateBy(360, 64);
    nasu.tl.then(function(){
        console.log("end");
    });
    nasu.tl.loop();

    jumpLabel(lbl1, 50, 8);
    jumpLabel(lbl2, 60, 8);
    jumpLabel(lbl3, 70, 8);
    jumpLabel(lbl4, 80, 8);
    
    //==========
    // ここまで
    //==========
};

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
    core = gameManager.createCore(320, 480);
    core.preload(assets);
    core.onload = function(){titleStart();};
    core.start();
};