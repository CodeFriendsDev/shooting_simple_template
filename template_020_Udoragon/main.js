var assets = [
    "images/title.png",// タイトル
    "images/fuji.png",
    "images/nasu.png",
    "images/udragon.png",
    "images/donkey.png",
    "images/dog.png",
    "images/cat.png",
    "images/chicken.png",
    "images/kirby.png",
    "images/prin.png",
    "images/minibu.png",
    "images/dokuro.png",
    "images/futomaki.png",
    "images/udon_shodai.png",
    "images/udon_nidaime.png",
    "images/tank.png",
    "images/ika.png",
    "images/bakemono.png",
];

function gameStart(){
    var scene = new Scene();
    core.replaceScene(scene); core.resume();

    //==========
    // ここから
    //==========

    scene.backgroundColor = "gray";

    // 中心座標
    var cX = scene.width/2;
    var cY = scene.height/2;
    var pX = 50;
    var color = "tomato";

    // 富士山
    var fuji = new Sprite(320, 320);
    fuji.image = core.assets["images/fuji.png"];
    fuji.centerX = cX;
    fuji.centerY = cY;
    scene.addChild(fuji);

    var gasho = new Label("=めでたいな!!=");
    gasho.color = "white";
    gasho.font = "32px 'PixelMplus10'";
    gasho.x = scene.width/2 - gasho._boundWidth/2;
    gasho.y = 20;
    scene.addChild(gasho);

    var msg = createLabel(scene, " HAPPY NEW YEAR!!", cX, cY+40, 16, "black");
    scene.addChild(msg);

    // 茄子
    var nasuA = createSprite(32, 32, cX-120, cY-32, "images/nasu.png");
    scene.addChild(nasuA);
    nasuA.tl.rotateBy(360, 64);
    nasuA.tl.then(function(){});
    nasuA.tl.loop();

    var nasuB = createSprite(32, 32, cX+120, cY-32, "images/nasu.png");
    scene.addChild(nasuB);
    nasuB.tl.rotateBy(360, 64);
    nasuB.tl.then(function(){});
    nasuB.tl.loop();

    // ミニ部さん
    var minibu = createSprite(160, 160, 30, cY+100, "images/minibu.png");
    scene.addChild(minibu);

    // ブレーメン
    var donkey = createSprite(75, 75, cX-100, cY+100, "images/donkey.png");
    scene.addChild(donkey);
    var dog = createSprite(50, 50, cX-90, cY+80, "images/dog.png");
    scene.addChild(dog);
    var cat = createSprite(50, 50, cX-90, cY+40, "images/cat.png");
    scene.addChild(cat);
    var chicken = createSprite(50, 50, cX-80, cY+15, "images/chicken.png");
    scene.addChild(chicken);

    // カービィ
    var kirby = createSprite(100, 100, cX+100, cY+100, "images/kirby.png");
    scene.addChild(kirby);

    // プリン
    var prin = createSprite(24, 24, cX, cY+20, "images/prin.png");
    prin.frame = [0, 1, 2, 3];
    scene.addChild(prin);

    // ドクロ
    var dokuro = createSprite(32, 32, 320-40, cY+50, "images/dokuro.png");
    scene.addChild(dokuro);

    // ふとまき
    var futomaki = createSprite(100, 80, 320-40, 60, "images/futomaki.png");
    scene.addChild(futomaki);

    // 初代
    var shodai = createSprite(48, 48, cX-30, 280, "images/udon_shodai.png");
    scene.addChild(shodai);

    // 二代目
    var nidaime = createSprite(64, 64, cX+30, 280, "images/udon_nidaime.png");
    scene.addChild(nidaime);

    // タンク
    var tank = createSprite(96, 64, 32, 64, "images/tank.png");
    scene.addChild(tank);

    // イカ
    var ika = createSprite(64, 64, 180, 64, "images/ika.png");
    scene.addChild(ika);

    // ばけもの
    var bake = createSprite(32, 32, 240, 180, "images/bakemono.png");
    scene.addChild(bake);

    // 4つのラベル
    var lbl1 = createLabel(scene, "2", cX-pX*1.7, cY-20, 64, color);
    scene.addChild(lbl1);
    var lbl2 = createLabel(scene, "0", cX-pX*0.7, cY-20, 64, color);
    scene.addChild(lbl2);
    var lbl3 = createLabel(scene, "2", cX+pX*0.3, cY-20, 64, color);
    scene.addChild(lbl3);
    var lbl4 = createLabel(scene, "4", cX+pX*1.3, cY-20, 64, color);
    scene.addChild(lbl4);

    jumpLabel(lbl1, 50, 8);
    jumpLabel(lbl2, 60, 8);
    jumpLabel(lbl3, 70, 8);
    jumpLabel(lbl4, 80, 8);

    // スプライト
    var dragon = new Sprite(32, 64);
    dragon.image = core.assets["images/udragon.png"];
    dragon.x = cX - dragon.width/2;
    dragon.y = cY - 80;
    dragon.frame = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,];
    scene.addChild(dragon);
    dragon.tl.rotateBy(360, 10);
    dragon.tl.then(function(){});
    dragon.tl.loop();

    //==========
    // ここまで
    //==========
};

function createSprite(w, h, x, y, image){
    var spr = new Sprite(w, h);
    spr.image = core.assets[image];
    spr.centerX = x;
    spr.centerY = y;
    return spr;
}

function createLabel(scene, text, x, y, size, color){
    var lbl = new Label(text);
    lbl.x = x - lbl._boundWidth / 2;
    lbl.y = y - lbl._boundHeight / 2;
    lbl.color = color;
    lbl.font = size + "px 'PixelMplus10'";
    return lbl;
}

function jumpLabel(lbl, height, frame){
    // https://easings.net/ (大文字にする事!!)
    // https://atmarkit.itmedia.co.jp/ait/articles/1304/25/news034_3.html
    lbl.tl.moveBy(0, -height, frame, enchant.Easing.QUAD_EASEOUT);
    lbl.tl.moveBy(0, height, frame, enchant.Easing.QUAD_EASEIN);
    lbl.tl.then(function(){
        console.log("end");
    });
    lbl.tl.delay(8);
    lbl.tl.loop();
}

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
