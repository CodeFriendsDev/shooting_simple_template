console.log("Hello Utility!!");

//==========
// プレイヤークラス

class Player extends enchant.Sprite{

    constructor(w, h, scene){
        super(w, h);
        this.scene = scene;// シーン
        this.backgroundColor = "white";
    }

    setPosX(x){
        this.centerX = x;
    }

    setPosY(y){
        this.centerY = y;
    }

    startDance(){
        // 定期的にどこかへ移動する
        this.tl.clear();
        this.tl.delay(32);
        this.tl.then(function(){
            let x = Math.random() * this.scene.width;
            let y = Math.random() * this.scene.height;
            this.setPosX(x);
            this.setPosY(y);
        });
        this.tl.loop();
    }
}