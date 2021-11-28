// 敵の弾クラス
class Teta extends CharBase
{
    constructor(sn,x,y,vx,vy)
	{
		super(sn,x,y,vx,vy);
		this.r = 4;
	}
	
	update()
	{
		super.update();
		
		if(!jiki.damage && checkHit(this.x, this.y, this.r,
					jiki.x, jiki.y, jiki.r) )
		{
			this.kill   =true;
            if((jiki.hp -= 1)<=0)
					{
						gameOver=true;
					}
             else
            {
                jiki.damage = 10;
             }
            
            
		}
		
	}
    

}

//敵クラス
class Teki extends CharBase
{
    constructor( snum, x, y, vx, vy )
	{
		super(snum, x, y, vx, vy);
        
        this.w = 40;
        this.h = 40;
        this.r = 20;
        this.score = 100;
        this.flag = false;
	}
    update()
    {
        super.update();
        if (!this.flag)
        {
            if(jiki.x > this.x && this.vx<100)this.vx+=4;
            else if(jiki.x < this.x && this.vx>-100)this.vx-=4;
        }
        else
        {
            if(jiki.x < this.x && this.vx<400)this.vx+=4;
            else if(jiki.x > this.x && this.vx>-400)this.vx-=4;
        }
        if (!gameOver&& Math.abs(jiki.y-this.y)<130<<8 && !this.flag)
        {
           
            this.flag = true;
            let an, dx, dy;
            an = Math.atan2 ( jiki.y-this.y , jiki.x- this.x );
            // 乱数を使って10度から-10度ランダムにずらしながら打つ
            an += rand(-10, 10)*Math.PI/180
            dx = Math.cos( an )*1000;
            dy = Math.sin( an )*1000;
            teta.push(new Teta( 5, this.x, this.y, dx, dy));
            
        }

        if (this.flag && this.vy>-800) this.vy-=50;
        
        if(!jiki.damage && checkHit(this.x, this.y, this.r,
            jiki.x, jiki.y, jiki.r) )
        {
            this.kill   =true;
            
                              

            jiki.damage = 10;
        }
    
    }

    draw()
    {
        super.draw();
    }

}