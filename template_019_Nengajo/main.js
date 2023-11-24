
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

    // 中心座標
    var cX = scene.width/2;
    var cY = scene.height/2;
    var pX = 50;

    // 4つのラベル
    var lbl1 = createNumber(scene, "2", cX-pX*1.5, cY, 64, "orange");
    scene.addChild(lbl1);
    var lbl2 = createNumber(scene, "0", cX-pX*0.5, cY, 64, "orange");
    scene.addChild(lbl2);
    var lbl3 = createNumber(scene, "2", cX+pX*0.5, cY, 64, "orange");
    scene.addChild(lbl3);
    var lbl4 = createNumber(scene, "4", cX+pX*1.5, cY, 64, "orange");
    scene.addChild(lbl4);
    
    //==========
    // ここまで
    //==========
};

function createNumber(scene, text, x, y, size, color){
    var lbl = new Label(text);
    lbl.x = x - lbl._boundWidth;
    lbl.y = y- lbl._boundHeight;
    lbl.color = color;
    lbl.font = size + "px 'PixelMplus10'";
    return lbl;
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