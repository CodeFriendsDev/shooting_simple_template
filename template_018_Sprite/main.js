
// スプライトを継承したオリジナルクラス
const MySprite = enchant.Class.create(enchant.Sprite, {
    // 初期化関数
    initialize: function(w, h){
        enchant.Sprite.call(this, w, h);
        this.backgroundColor = "white";
    },
    // ランダムで左右か上下か選ぶs
    randomMove: function(dX, dY, time){
        const rdm = Math.random();
        if(rdm < 0.4){
            this.moveLeftRight(dX, dY, time);
        }else if(rdm < 0.8){
            this.moveUpDown(dX, dY, time);
        }else{
            this.rotate(dX, dY, time);
        }
    },
    // 左右に揺れる命令
    moveLeftRight: function(dX, dY, time){
        console.log("moveLeftRight!!");
        this.tl.moveBy(dX, 0, time);
        this.tl.moveBy(dX*-1, 0, time);
        this.tl.then(function(){
            console.log("Finish!!");
            this.randomMove(dX, dY, time);// ランダム
        });
    },
    // 上下に揺れる命令
    moveUpDown: function(dX, dY, time){
        console.log("moveUpDown!!");
        this.tl.moveBy(0, dY, time);
        this.tl.moveBy(0, dY*-1, time);
        this.tl.then(function(){
            console.log("Finish!!");
            this.randomMove(dX, dY, time);// ランダム
        });
    },
    // 回転する命令
    rotate: function(dX, dY, time){
        console.log("moveUpDown!!");
        let rot = Math.random() * 360;
        if(Math.random() < 0.5) rot *= -1;
        this.tl.rotateBy(rot, time);
        this.tl.then(function(){
            console.log("Finish!!");
            this.randomMove(dX, dY, time);// ランダム
        });
    }
});

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

    var mySpr = new MySprite(50, 50);
    mySpr.x = 100;
    mySpr.y = 100;
    mySpr.randomMove(100, 100, 16);// 動作開始!!
    scene.addChild(mySpr);

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