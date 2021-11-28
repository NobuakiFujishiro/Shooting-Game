// クラスマスター

class TekiMaster
{
constructor(tnum, r, hp, score)
{
	this.tnum=tnum;
	this.r =r;
	this.hp =hp;
	this.score =score;
}
}

//スプライトクラス
class Sprite
{
	constructor( x,y, w,h )
	{
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
}

//スプライト
let sprite = [
	new Sprite(  0, 0,22,42 ),//0,自機 左2
	new Sprite( 23, 0,33,42 ),//1,自機 左1
	new Sprite( 57, 0,43,42 ),//2,自機 正面
	new Sprite(101, 0,33,42 ),//3,自機 右1
	new Sprite(135, 0,21,42 ),//4,自機 右2

    new Sprite(  0,50, 3, 7 ),//5,弾1
	new Sprite(  4,50, 5, 5 ),//6,弾2

    new Sprite(  4, 74,42,46 ),//7,敵機 赤
	new Sprite( 60, 74,52,46 ),//8,敵機 青
	new Sprite( 3, 130,44,43 ),//9,敵機 緑
	new Sprite(122, 66,86,89 ),//10,敵機 灰色
];