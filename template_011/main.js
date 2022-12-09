
var assets = [
    "images/title.png",// タイトル
];

function gameStart(){
    var scene = new Scene();
    core.replaceScene(scene); core.resume();

    //==========
    // ここから
    //==========
    
    scene.backgroundColor = "gray";

    var rows = 10;// 行
    var cols = 10;// 列
    var pad  = 16;// サイズ
    var size = pad - 2;

    for(var r=0; r<rows; r++){
        for(var c=0; c<cols; c++){
            var tile = new Sprite(size, size);
            tile.backgroundColor = "white";
            tile.x = pad * c;
            tile.y = pad * r;
            scene.addChild(tile);
        }
    }

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