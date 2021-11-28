

// キャラクターのベースクラス
class CharBase
{
    constructor( snum, x, y, vx,vy )
	{
		this.sn   = snum;
		this.x    = x;
		this.y    = y;
		this.vx   = vx;
		this.vy   = vy;
        this.kill = false;
	}
	
	update()
	{
		this.x += this.vx;
		this.y += this.vy;

        if( this.x<0 || this.x>FIELD_W<<8 
            || this.y<0 || this.y>FIELD_H<<8 )this.kill = true;

	}
	
	draw()
	{
		drawSprite( this.sn, this.x , this.y );
	}

}




//キーボードが押されたとき (keyCode要解決)
document.onkeydown = function(e)
{
	key[ e.keyCode ] = true;
    if(gameOver && e.keyCode==66 )
    {
        delete jiki;
        jiki = new Jiki();
        gameOver=false;
        score=0;
    }
}

//キーボードが離されたとき
document.onkeyup = function(e)
{
	key[ e.keyCode] = false;
}

//スプライトを描画する
function drawSprite( snum, x, y )
{
	let sx = sprite[snum].x;
	let sy = sprite[snum].y;
	let sw = sprite[snum].w;
	let sh = sprite[snum].h;
	
	let px = (x>>8) - sw/2;
	let py = (y>>8) - sh/2;
	
    if( px+sw<camera_x || px>=camera_x+SCREEN_W 
        || py+sh<camera_y || py>=camera_y+SCREEN_H )return;

	vcon.drawImage( spriteImage,sx,sy,sw,sh, px,py,sw,sh);
}

// 整数のランダムを創る
function rand(min, max)
{
    return Math.floor( Math.random()*(max-min+1))+min;
}

// 当たり判定
function checkHit( x1,y1,r1,  x2,y2,r2 )
{
	// 円同士の当たり判定
	let a = (x2-x1)>>8;
	let b = (y2-y1)>>8;
	let r = r1+r2;
	
	return (r*r >= a*a + b*b) ;
}





