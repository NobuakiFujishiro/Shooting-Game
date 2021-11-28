//弾クラス
class Tama extends CharBase
{
    constructor( x, y, vx,vy )
	{
		super(5, x, y, vx, vy);
        this.w = 4;
		this.h = 6;
        this.r = 2;
        // 
	}
    update()
    {
        super.update();

        // 当たり判定
        for( let i=0; i<teki.length ;i++)
		{
			if( !teki[i].kill )
			{
				
				if( !gameOver && checkHit(
				
					this.x, this.y, this.r,
					teki[i].x, teki[i].y, teki[i].r
				
				) )
				{
					
					teki[i].kill=true;
					
					this.kill=true;
					score+= teki[i].score
					/*
					if((jiki.hp -= 30)<=0)
					{
						gameOver=true;
					}
					*/
					                   
					break;
				}
				
			}
		}
    }

    draw()
    {
        super.draw();
    }
	
}
let tama=[];

//自機クラス
class Jiki
{
	constructor()
	{
		this.x = (FIELD_W/2)<<8;
		this.y = ((FIELD_H)*7/8)<<8;
        this.mhp = 5;
		this.hp = this.mhp;
		this.speed = 700;
		this.anime = 0;
        this.reload=0;
        this.relo2 =0;
        this.r =20;
        this.damage = 0;
		
	}
	
	//自機の移動
	update()
	{
        if(this.damage)this.damage--;
        if( key[32] && this.reload==0)
		{
			 /*tama.push( new Tama(this.x,this.y,  0,-2000 ) );  */ 
           
            tama.push( new Tama(this.x+(4<<8),this.y-(10<<8),  0,-2000 ) );
			tama.push( new Tama(this.x-(4<<8),this.y-(10<<8),  0,-2000 ) );
			tama.push( new Tama(this.x+(8<<8),this.y-(10<<8), 80,-2000 ) );
			tama.push( new Tama(this.x-(8<<8),this.y-(10<<8),-80,-2000 ) );
           
            
            this.reload =4;
            if (++this.relo2==4) {
                this.reload=20;
                this.relo2=0;
                
            }
        }
        if( !key[32] ) this.reload= this.relo2=0;
       
        if (this.reload>0) this.reload--; 
  
        if (key[37]) this.x-= this.speed;
        if (key[38]) this.y-= this.speed;      
        if (key[39]) this.x+= this.speed;
		if (key[40]) this.y+= this.speed;

        //ここで範囲チェックする
		if(this.x<0)this.x=0;
		if(this.x>=(FIELD_W<<8))this.x=(FIELD_W<<8)-1;
		if(this.y<0)this.y=0;
		if(this.y>=(FIELD_H<<8))this.y=(FIELD_H<<8)-1;
	}
	
	//描画
	draw()
	{
		drawSprite(2 + this.anime, this.x, this.y );
	}
}