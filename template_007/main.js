
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
    var player = new Sprite(32, 32);
    player.backgroundColor = "black";
    player.x = scene.width/2;
    player.y = scene.height * 0.8;
    scene.addChild(player);

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
    });

    // 弾グループ
    var shotGroup = new Group();
    scene.addChild(shotGroup);

    // マガジンに弾丸を用意しておく
    var bullets = [];
    for(let i=0; i<100; i++){
        // 弾スプライト
        var bullet = new Sprite(8, 8);
        bullet.backgroundColor = "white";
        bullet.centerX = Math.random() * 120;
        bullet.centerY = Math.random() * 120;
        bullets.push(bullet);// マガジンに追加
        shotGroup.addChild(bullet);
    }

    // 定期的に実行
    scene.tl.then(function(){

        if(bullets.length <= 0) return;// マガジンに無い場合はストップ
        let bullet = bullets.pop();// マガジンから1つ取り出す
        bullet.centerX = player.centerX;
        bullet.centerY = player.y;
        bullet.tl.clear();
        bullet.tl.moveBy(Math.random()*30, -300, 16);
        bullet.tl.then(function(){
            // マガジンに戻す
            bullet.centerX = Math.random() * 120;
            bullet.centerY = Math.random() * 120;
            bullets.push(bullet);// マガジンに戻す
        });
    });
    scene.tl.delay(2);
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