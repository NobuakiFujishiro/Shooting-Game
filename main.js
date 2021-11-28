//デバッグのフラグ
const DEBUG = true;

let drawCount=0;
let fps=0;
let lastTime=Date.now();

// スムージング
const SMOOTHING = false;

// ゲームスピード
const GAME_SPEED = 1000/60;
// 画面サイズ
const SCREEN_W = 320;
const SCREEN_H = 320;
// キャンバスサイズ
const CANVAS_W = SCREEN_W*2;
const CANVAS_H = SCREEN_H*2;

// フィールドサイズ
const FIELD_W = SCREEN_W*2;
const FIELD_H = SCREEN_H*2;


// キャンバス
let can = document.getElementById("can");
let con = can.getContext("2d");
can.width = CANVAS_W;
can.height = CANVAS_H;
// 画像解像度をあげる
con.mozimageSmoothingEnagbled   = SMOOTHING;
con.webkitimageSmoothingEnabled = SMOOTHING;
con.msimageSmoothingEnabled     = SMOOTHING;
con.imageSmoothingEnabled       = SMOOTHING;

con.font="20px 'Impact'";

// フィールド(仮想画面)
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");
vcan.width = FIELD_W;
vcan.height = FIELD_H;

// カメラ座標
let camera_x = 0;
let camera_y = 0;

// 
let gameOver = false;
let score =0;

//キーボードの状態
let key=[];




let teki=[
// new Teki (8, 200<<8, 200<<8, 0, 0)
];
let teta=[];

let expl=[];

let jiki = new Jiki();
//ファイルを読み込み
let spriteImage = new Image();
spriteImage.src = "sprite.png";




// ゲーム初期化
function gameInit() {  

    
    setInterval(gameLoop, GAME_SPEED);
}
// オブジェクトをアップデート

// オブジェクトの描画

//オブジェクトをアップデート
function updateObj( obj )
{
	for(let i=obj.length-1;i>=0;i--)
	{
		obj[i].update();
		if(obj[i].kill)obj.splice( i,1 );
	}
}

//オブジェクトを描画
function drawObj( obj )
{
	for(let i=0;i<obj.length;i++)obj[i].draw();
}

// 移動の処理
function updateAll()
{
    //updateObj(star);
    updateObj(tama);
    updateObj(teta);
    updateObj(teki);
    if(!gameOver) jiki.update();
}

// 描画の処理
function drawAll()
{
    vcon.fillStyle=(!gameOver && jiki.damage)?"red":"aqua";
    vcon.fillRect(camera_x,camera_y,SCREEN_W, SCREEN_H);
    
    drawObj(tama);
    drawObj(teta);
    if(!gameOver) jiki.draw();
    drawObj(teki);

    // 自機の範囲 0 ～ FIELD_W
	// カメラの範囲 0 ～ (FIELD_W-SCREEN_W)
	
	camera_x = (jiki.x>>8)/FIELD_W * (FIELD_W-SCREEN_W);
	camera_y = (jiki.y>>8)/FIELD_H * (FIELD_H-SCREEN_H);
    // 仮想画面から実際のキャンバスにコピー
    con.drawImage(vcan, camera_x, camera_y, SCREEN_W, SCREEN_H,
        0, 0, CANVAS_W, CANVAS_H);

}

// 情報の表示
function putInfo()
 {
    
    con.fillStyle = "black";
    
    if (gameOver)
    {
        let s = "GAME OVER";
        let w = con.measureText(s).width;
        let x = CANVAS_W/2-w/2;
        let y = CANVAS_H/2-20;
        con.fillText(s,x,y)

        s = "Bボタンを押してもう一度チャレンジ";
        w = con.measureText(s).width;
        x = CANVAS_W/2-w/2;
        y = CANVAS_H/2-20+60;
        con.fillText(s,x,y)

        let a = "あなたのレベル：初心者";
        let b = "あなたのレベル：中級者";
        let c = "あなたのレベル：達人級";
        w = con.measureText(a).width;
        x = CANVAS_W/2-w/2;
        y = CANVAS_H/2-20+20;
        
        if(score>5000)
        {
            con.fillText(c,x,y)
        }
        else if(score>2000)
        {
            con.fillText(b,x,y)
        }
        else 
        {
            con.fillText(a,x,y)
        }
        

    }
    if (DEBUG) 
    {
              
        con.fillText("HP: "+jiki.hp, 20, 40);
        con.fillText("Score: "+score, 20, 60);
    }
}

// ゲームループ
function gameLoop() {

    // 敵を出す
    if(rand(0,50)==1)
    teki.push( new Teki(7, rand(0, FIELD_W)<<8, 0, 0, rand(300, 1200)));
    updateAll();
    drawAll();
    putInfo();    

}

// オンロードでゲーム開始
window.onload=function()
{
    gameInit();
}