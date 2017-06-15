class Powerbar{
	constructor(ctx){
		this.ctx = ctx;
		this.pos = new Point(20, canvas.height-20);
		this.max = 100;		
		this.padding = 2;
		this.width = 100;
		this.height = 10;
		this.background = "whitesmoke";
		this.foreground = "gray";
		this.border = "black";
	}

	draw(power){

		this.ctx.shadowBlur=1;
		this.ctx.shadowColor="#373737";	

		//background
		this.ctx.beginPath();
		this.ctx.fillStyle = this.background;
		this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
		this.ctx.fill();

		//foreground
		if(power > 0){
			this.ctx.fillStyle = this.foreground;
			this.ctx.fillRect(this.pos.x + this.padding, this.pos.y + this.padding, (this.width/this.max)*power - 2*this.padding, this.height - 2*this.padding);
			this.ctx.fill();
		}

	}
}