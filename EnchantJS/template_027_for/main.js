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

    // グループを用意
    let someGroup = new Group();
    scene.addChild(someGroup);

    // グループにスプライトを配置(5個配置した)
    for(let i=0; i<5; i++){
        let spr = new Sprite(16, 16);
        spr.backgroundColor = "orange";
        spr.x = getRandom(0, scene.width);
        spr.y = getRandom(0, scene.height);
        someGroup.addChild(spr); 
    }

    // グループの配列
    console.log(someGroup.childNodes);

    // 0, 1, 2, 3, 4という風に配列の要素にアクセス可能!!
    let spr = someGroup.childNodes[0];
    spr.tl.moveBy(100, 0, 16);

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
