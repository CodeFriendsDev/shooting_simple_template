var assets = [
    "images/sc_aka.png",
    "images/sc_ao.png",
    "images/sc_goal.png",
    "images/sc_hiru.png",
    "images/sc_ho1.png",
    "images/sc_ho2.png",
    "images/sc_ho3.png",
    "images/sc_nin.png",
    "images/sc_ttate.png",
    "images/sc_tyoko.png",
];

//****************
//*** ゲーム画面 ***
//****************
function gameStart(){
    var scene = new Scene();
    scene.backgroundColor = "black";
    core.replaceScene(scene);

    var stageGroup = new Group();
    scene.addChild(stageGroup);
    var backGroup = new Group();
    stageGroup.addChild(backGroup);
    var enemyGroup = new Group();
    stageGroup.addChild(enemyGroup);
    var itemGroup = new Group();
    stageGroup.addChild(itemGroup);
    var goalGroup = new Group();
    stageGroup.addChild(goalGroup);
    var playerGroup = new Group();
    stageGroup.addChild(playerGroup);
    var enemyShotGroup = new Group();
    stageGroup.addChild(enemyShotGroup);
    var playerShotGroup = new Group();
    stageGroup.addChild(playerShotGroup);

    //*************
    //*** ここから ***
    //*************

    // 背景
    var haikei = new Sprite(320*3, 320);
    haikei.image = core.assets["images/sc_hiru.png"];
    backGroup.addChild(haikei);

    // プレイヤー
    var player = new Sprite(32, 32);
    player.image = core.assets["images/sc_nin.png"];
    player.x = 100;
    player.y = 100;
    playerGroup.addChild(player);

    // トンネル
    var tn1 = new Sprite(48, 320);
    tn1.image = core.assets["images/sc_ttate.png"];
    tn1.x = 240;
    tn1.y = -240;
    enemyGroup.addChild(tn1);

    var tn2 = new Sprite(48, 320);
    tn2.image = core.assets["images/sc_ttate.png"];
    tn2.x = 240;
    tn2.y = 240;
    enemyGroup.addChild(tn2);

    var tn3 = new Sprite(48, 320);
    tn3.image = core.assets["images/sc_ttate.png"];
    tn3.x = 420;
    tn3.y = -240;
    enemyGroup.addChild(tn3);

    var tn4 = new Sprite(48, 320);
    tn4.image = core.assets["images/sc_ttate.png"];
    tn4.x = 420;
    tn4.y = 240;
    enemyGroup.addChild(tn4);

    // 鬼
    var oni1 = new Sprite(40, 48);
    oni1.image = core.assets["images/sc_aka.png"];
    oni1.x = 330;
    oni1.y = 40;
    enemyGroup.addChild(oni1);

    oni1.tl.moveBy(0, 200, 64);
    oni1.tl.delay(16);
    oni1.tl.moveBy(0, -200, 64);
    oni1.tl.delay(16);
    oni1.tl.loop();

    var oni2 = new Sprite(40, 48);
    oni2.image = core.assets["images/sc_ao.png"];
    oni2.x = 520;
    oni2.y = 240;
    enemyGroup.addChild(oni2);

    oni2.tl.moveBy(0, -200, 64);
    oni2.tl.delay(16);
    oni2.tl.moveBy(0, 200, 64);
    oni2.tl.delay(16);
    oni2.tl.loop();

    // アイテム１
    var item1 = new Sprite(24, 24);
    item1.image = core.assets["images/sc_ho1.png"];
    item1.x = 250;
    item1.y = 150;
    itemGroup.addChild(item1);

    var item2 = new Sprite(24, 24);
    item2.image = core.assets["images/sc_ho2.png"];
    item2.x = 430;
    item2.y = 150;
    itemGroup.addChild(item2);

    // ゴール
    var goal = new Sprite(78, 112);
    goal.image = core.assets["images/sc_goal.png"];
    goal.x = 600;
    goal.y = 80;
    goalGroup.addChild(goal);

    goal.tl.moveBy(0, 50, 8);
    goal.tl.delay(4);
    goal.tl.moveBy(0, -50, 8);
    goal.tl.delay(4);
    goal.tl.loop();

    //*************
    //*** ここまで ***
    //*************

    // プレイヤーの移動
    scene.on(Event.ENTER_FRAME, function() { 
        player.x = player.x + 3;
        stageGroup.x = stageGroup.x - 3;
    });

    // 落下速度
    player.ay = 0;
    // 落下
    scene.on(Event.ENTER_FRAME, function() { 
        if (player.ay < 24) {
            player.ay = player.ay + 2;
        }
        player.y = player.y + player.ay;
    });
    scene.on(Event.TOUCH_START, function() {
        player.ay = -12
    });

    // 敵との衝突
    player.addCollision(enemyGroup);
    player.on(Event.COLLISION, function(e) {
        if (e.collision.target.parentNode != enemyGroup) return;
        resultStart("GAME OVER");
    });

    // アイテムとの衝突
    player.addCollision(itemGroup);
    player.on(Event.COLLISION, function(e) {
        if (e.collision.target.parentNode != itemGroup) return;
        e.collision.target.remove();
        scoreLabel.addScore(1);
    });

    // ゴールとの衝突
    player.addCollision(goalGroup);
    player.on(Event.COLLISION, function(e) {
        if (e.collision.target.parentNode != goalGroup) return;
        resultStart("CLEAR");
    });

    // 上がりすぎ
    scene.on(Event.ENTER_FRAME, function() { 
        if (player.y < -32) {
            resultStart("GAME OVER");
        }
    });

    // 下がりすぎ
    scene.on(Event.ENTER_FRAME, function() { 
        if (player.y > 320) {
            resultStart("GAME OVER");
        }
    });

    // 得点表示
    var scoreLabel = new Label();
    scoreLabel.width = 90;
    scoreLabel.x = 220;
    scoreLabel.y = 10;
    scoreLabel.font = "14px serif";
    scoreLabel.color = "white";
    scoreLabel.textAlign = "right";
    scoreLabel.score = 0;
    scoreLabel.text = 0;
    scoreLabel.addScore = function(num) {
        this.score = this.score + num;
        scoreLabel.text = this.score;
    }
    scene.addChild(scoreLabel);

}

//*****************
//*** タイトル画面 ***
//*****************
function titleStart(){
    var scene = new Scene();
    core.replaceScene(scene);
    
    // 背景色
    scene.backgroundColor = "black";

    // 文字を表示
    var title = new Label();
    title.width = 320;
    title.x = 0;
    title.y = 150;
    title.color = "white";
    title.textAlign = "center";
    title.text = "TAP TO START";
    scene.addChild(title);

    // 画面をクリックしたとき
    scene.on(enchant.Event.TOUCH_START, function(){
        // ゲーム画面を表示
        gameStart();
    });
}

//***************
//*** 結果画面 ***
//***************
function resultStart(message){
    var scene = new Scene();
    core.pushScene(scene);
    // 文字を表示    
    var result = new Label();
    result.width = 320;
    result.x = 0;
    result.y = 150;
    result.textAlign = "center";
    result.text = message;
    scene.addChild(result);
    scene.tl.delay(16).then(function() {
        // 画面をクリックしたとき
        scene.on(enchant.Event.TOUCH_START, function(){
            // タイトル画面を表示
            titleStart();
        });
    });    
}

var core;
enchant();
window.onload = function(){
    core = new Core(320, 320);
    core.fps = 24;
    core.preload(assets);
    core.onload = function(){
        titleStart();
    };
    core.start();
};