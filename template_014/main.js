
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

    // プレイヤー
    var player = new Player(16, 16, scene);
    player.setPosX(scene.width / 2);
    player.setPosY(scene.height / 2);
    scene.addChild(player);

    scene.on(Event.TOUCH_START, function(e){
        console.log(e.x, e.y);
        player.setPosX(e.x);
        player.setPosY(e.y);
        //player.startDance();
    });

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