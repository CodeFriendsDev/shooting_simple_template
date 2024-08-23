
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
    var bkg = new Sprite(320, 480);
    bkg.image = core.assets["images/bkg_320x480.png"];
    bkg.x = 0;
    bkg.y = 0;
    scene.addChild(bkg);

    var counter = 0;// カウンター
    bkg.tl.moveTo(0, 480, 128);
    bkg.tl.then(function(){
        counter++;// カウントアップ
        bkg.y = -480;// 背景を上に戻す

         // 新敵登場(カウンターの数だけ増える)
        for(let i=0; i<counter; i++){
            var x = Math.random() * scene.width;
            var y = Math.random() * 200;
            enemyGroup.addChild(
                createEnemy(32, 32, "orange",
                    x, y, 40, 40, 32));
        }
    });
    bkg.tl.loop();

    // プレイヤー
    var player = new Sprite(16, 16);
    player.backgroundColor = "white";
    player.centerX = scene.width / 2 - 100;
    player.centerY = scene.height - 100;
    scene.addChild(player);

    player.tl.moveBy(200, 0, 64);
    player.tl.moveBy(-200, 0, 64);
    player.tl.loop();

    var enemyGroup = new Group();// 敵グループ
    scene.addChild(enemyGroup);

    var bltGrpPlayer = new Group();// 弾グループ(プレイヤー)
    scene.addChild(bltGrpPlayer);

    var bltGrpEnemy  = new Group();// 弾グループ(敵)
    scene.addChild(bltGrpEnemy);

    // 射撃開始(プレイヤー)
    bltGrpPlayer.tl.delay(4);
    bltGrpPlayer.tl.then(function(){
        var bullet = getBullet();
        if(!bullet) return;
        bullet.backgroundColor = "white";
        bullet.centerX = player.centerX;
        bullet.centerY = player.centerY;
        bullet.moveX   = 0;
        bullet.moveY   = -8;

        bullet.on(Event.ENTER_FRAME, function(){
            this.centerX += this.moveX;// 移動
            this.centerY += this.moveY;

            // 画面外
            if(isOutside(scene, this)){
                returnBullet(this);// マガジンに戻す
                return;
            }

            // 敵グループと衝突
            for(var enemy of enemyGroup.childNodes){
                if(bullet.intersect(enemy)){
                    returnBullet(this);// マガジンに戻す
                    return;
                }
            }
        });
        bltGrpPlayer.addChild(bullet);// グループに追加
    });
    bltGrpPlayer.tl.loop();

    /*
    // 敵1
    enemyGroup.addChild(
        createEnemy(32, 32, "red",
            scene.width / 2 - 40, scene.height * 0.2,
            40, 40, 32));

    // 敵2
    enemyGroup.addChild(
        createEnemy(32, 32, "green",
            scene.width / 2 + 0, scene.height * 0.2 + 40,
            30, 20, 24));

    // 敵3
    enemyGroup.addChild(
        createEnemy(32, 32, "blue",
            scene.width / 2 + 40, scene.height * 0.2,
            20, 30, 16));
    */

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