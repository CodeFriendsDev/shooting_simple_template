
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

    // 未使用の弾
    var bullets = [];
    for(let i=0; i<100; i++){
        var bullet = new Sprite(2, 8);// 弾スプライト
        bullet.backgroundColor = "silver";
        bullet.moveX = 0;// 速度も0に!! <- 重要!!
        bullet.moveY = 0;
        bullets.push(bullet);// マガジンに追加
    }

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
            if(isOutside(this)){
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

    // 敵1
    createEnemy(32, 32, "red",
        scene.width / 2 - 40, scene.height * 0.2,
        40, 40, 32);

    // 敵2
    createEnemy(32, 32, "green",
        scene.width / 2 + 0, scene.height * 0.2 + 40,
        30, 20, 24);

    // 敵3
    createEnemy(32, 32, "blue",
        scene.width / 2 + 40, scene.height * 0.2,
        20, 30, 16);

    // 敵を作る関数
    function createEnemy(w, h, color, x, y, dX, dY, f){
        // 敵
        var enemy = new Sprite(w, h);
        enemy.backgroundColor = color;
        enemy.x = x;
        enemy.y = y;
        enemyGroup.addChild(enemy);// グループに追加

        enemy.tl.moveBy(-dX, -dY, f);
        enemy.tl.moveBy(dX, dY, f);
        enemy.tl.loop();
    }

    // マガジンから取り出す
    function getBullet(){
        if(bullets.length <= 0) return null;// マガジンに無い場合はnull
        return bullets.pop();// マガジンから1つ取り出す
    }

    // マガジンに戻す
    function returnBullet(bullet){
        bullet.centerX = Math.random() * 20;// とりま画面の左上
        bullet.centerY = Math.random() * 20;
        bullet.moveX   = 0;// 速度も0に!!
        bullet.moveY   = 0;
        bullet.clearEventListener(Event.ENTER_FRAME);
        bullets.push(bullet);// マガジンに戻す
    }

    // 画面外判定
    function isOutside(spr){
        if(spr.centerX < 0) return true;
        if(spr.centerY < 0) return true;
        if(scene.width < spr.centerX) return true;
        if(scene.height < spr.centerY) return true;
        return false;
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