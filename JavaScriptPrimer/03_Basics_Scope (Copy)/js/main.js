"use strict"

console.log("Hello, JavaScript!!");

// 次世代のJavaScriptは、
// 名前が"ECMA-Script"に変わります!!
//
// 何が変わったか!! (色々変わった!!)
//
//   1, varは辞めてletかconstを使う事!!
//      letは変数(値の変更可!!)
//      constは定数(値の変更不可!!)

// 例(let)
let hoge = "hohoho";
console.log(hoge);
hoge = "ufufufu";// 値の変更
console.log(hoge);

// 例(const)
const fuga = "bububu";
console.log(fuga);

//fuga = "bobobo";// 値の変更(エラー)
//console.log(fuga);

// スコープとは!?
// { と }の間の事!!

// グローバル変数という!!
let piyo = "arayo";
console.log(piyo);

// 関数を作る
function myFunc(){
    console.log("myFunc");
    // スコープの外の変数にはアクセス可
    console.log(piyo);
    // スコープの中で変数を作る
    // myFunc()が実行される都度一時的に存在する
    // ローカル変数という!!
    let poyo = "hoisa";
}

// 関数を実行する
myFunc();
myFunc();
myFunc();

// スコープの外からpoyoにアクセス(エラー)
console.log(poyo);