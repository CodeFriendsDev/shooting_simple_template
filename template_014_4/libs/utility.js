console.log("Hello Utility!!");

//==========
// 画面外判定処理

// 画面外判定
function isOutside(scene, spr){
    if(spr.centerX < 0) return true;
    if(spr.centerY < 0) return true;
    if(scene.width < spr.centerX) return true;
    if(scene.height < spr.centerY) return true;
    return false;
}

//==========
// マガジンの処理

var bullets = [];// 未使用の弾を格納するマガジン

// マガジンに弾を用意する
function readyBullet(total){
    for(let i=0; i<total; i++){
        var bullet = new Sprite(2, 8);// 弾スプライト
        bullet.backgroundColor = "silver";
        bullet.moveX = 0;// 速度も0に!! <- 重要!!
        bullet.moveY = 0;
        bullets.push(bullet);// マガジンに追加
    }
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

//==========
// 敵を作る処理

// 敵を作る関数
function createEnemy(w, h, color, x, y, dX, dY, f){
    // 敵
    var enemy = new Sprite(w, h);
    enemy.backgroundColor = color;
    enemy.x = x;
    enemy.y = -200;
    enemy.tl.moveTo(x, y, 16);

    //enemy.tl.moveBy(-dX, -dY, f);
    //enemy.tl.moveBy(dX, dY, f);
    //enemy.tl.loop();
    return enemy;
}