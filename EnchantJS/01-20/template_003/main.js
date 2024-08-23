
var assets = [
    "images/title.png",// タイトル
];

function gameStart(){
    var scene = new Scene();
    core.replaceScene(scene); core.resume();

    //==========
    // ここから
    //==========
    
    scene.backgroundColor = "silver";

    // プレイヤー
    var player = new Sprite(32, 32);
    player.backgroundColor = "black";
    player.x = scene.width/2;
    player.y = scene.height/2;
    scene.addChild(player);

    // 弾グループ
    var shotGroup = new Group();
    scene.addChild(shotGroup);

    // プレイヤーの操作
    core.keybind(87, "w");    // Wキー有効
    core.keybind(65, "a");    // Aキー有効
    core.keybind(83, "s");    // Sキー有効
    core.keybind(68, "d");    // Dキー有効
    core.keybind(32, "space");// Spaceキー有効
    var speed = 4;// 速度
    player.on(Event.ENTER_FRAME, function(){
        // WASD
        if(core.input.w == true){// Wキー
            player.y -= speed;
        }
        if(core.input.a == true){// Aキー
            player.x -= speed;
        }
        if(core.input.s == true){// Sキー
            player.y += speed;
        }
        if(core.input.d == true){// Dキー
            player.x += speed;
        }
        // 弾
        if(core.input.space == true){
            console.log("space");
            // 弾スプライト
            var bullet = new Sprite(8, 8);
            bullet.backgroundColor = "orange";
            bullet.centerX = player.centerX;
            bullet.centerY = player.centerY;
            bullet.tl.moveBy(0, -230, 20);
            bullet.tl.removeFromScene();
            shotGroup.addChild(bullet);
        }
    });

    // 敵グループ
    var enemyGroup = new Group();
    scene.addChild(enemyGroup);

    // 定期的に実行
    scene.tl.then(function(){
        // 敵スプライト
        var enemy = new Sprite(8, 8);
        enemy.backgroundColor = "blue";
        enemy.centerX = Math.random() * scene.width;
        enemy.centerY = 0;
        enemy.tl.moveBy(0, 230, 160);
        enemy.tl.removeFromScene();
        enemyGroup.addChild(enemy);

        enemy.addCollision(shotGroup);// 敵 x 弾
        enemy.on(Event.COLLISION, function(e){
            this.remove();// 敵を消す
            e.collision.target.remove();// 弾を消す
        });
    });
    scene.tl.delay(16);
    scene.tl.loop();

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