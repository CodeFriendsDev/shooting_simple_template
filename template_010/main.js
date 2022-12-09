
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

    // 弾グループ
    var bltGrpPlayer = new Group();// プレイヤーの弾
    scene.addChild(bltGrpPlayer);
    var bltGrpBoss  = new Group(); // ボスの弾
    scene.addChild(bltGrpBoss);

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

    // ボス
    var boss = new Sprite(32, 32);
    boss.backgroundColor = "black";
    boss.x = scene.width / 2 + 100;
    boss.y = scene.height * 0.2;
    scene.addChild(boss);

    boss.tl.moveBy(-200, 0, 32);
    boss.tl.moveBy(200, 0, 32);
    boss.tl.loop();

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
            // 画面外かボスと衝突
            if(isOutside(this) || this.intersect(boss)){
                // マガジンに戻す
                this.centerX = Math.random() * 20;// とりま画面の左上
                this.centerY = Math.random() * 20;
                this.moveX   = 0;// 速度も0に!!
                this.moveY   = 0;
                bullet.clearEventListener(Event.ENTER_FRAME);
                bullets.push(this);// マガジンに戻す
            }
        });
        bltGrpPlayer.addChild(bullet);// グループに追加
    });
    bltGrpPlayer.tl.loop();

    // 射撃開始(ボス)
    bltGrpBoss.tl.delay(18);
    bltGrpBoss.tl.then(function(){
        var bullet = getBullet();
        if(!bullet) return;
        bullet.backgroundColor = "black";
        bullet.centerX = boss.centerX;
        bullet.centerY = boss.centerY;
        bullet.moveX   = 0;
        bullet.moveY   = 4;

        bullet.on(Event.ENTER_FRAME, function(){
            this.centerX += this.moveX;// 移動
            this.centerY += this.moveY;
            // 画面外かプレイヤーと衝突
            if(isOutside(this) || this.intersect(player)){
                // マガジンに戻す
                this.centerX = Math.random() * 20;// とりま画面の左上
                this.centerY = Math.random() * 20;
                this.moveX   = 0;// 速度も0に!!
                this.moveY   = 0;
                bullet.clearEventListener(Event.ENTER_FRAME);
                bullets.push(this);// マガジンに戻す
            }
        });
        bltGrpBoss.addChild(bullet);// グループに追加
    });
    bltGrpBoss.tl.loop();

    function getBullet(){
        if(bullets.length <= 0) return null;// マガジンに無い場合はnull
        return bullets.pop();// マガジンから1つ取り出す
    }

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