class Space{
	constructor(canvas, ctx){
		this.canvas = canvas;
		this.ctx = ctx;		
		this.mouseDown;	
		this.cursor;
		this.mouseDownPos;		
		this.target;
		this.arrow;
		this.powerbar;
		this.score = 0;
	}

	init(){		
		this.mouseDown = false;
		this.cursor = new Point(0,0);
		this.mouseDownPos = new Point(0,0);
		this.target = new Target(this, this.ctx);
		this.arrow = new Arrow(this, this.ctx);
		this.powerbar = new Powerbar(this.ctx);
		this.target.move();
	}

	draw(){
	
		this.ctx.shadowBlur = 1;
		this.ctx.shadowColor="#373737";	

		// target
		if(this.mouseDown){
			this.ctx.beginPath();
			this.ctx.shadowBlur = 0;
			this.ctx.lineWidth = 1;			
			this.ctx.strokeStyle = "black";
			this.ctx.setLineDash([2, 5]);
			this.ctx.moveTo(this.cursor.x, this.cursor.y);
			this.ctx.lineTo(this.mouseDownPos.x, this.mouseDownPos.y);
			this.ctx.stroke();
			this.ctx.setLineDash([1, 0]);			
		}
		
		//powerbar
		this.powerbar.draw(this.arrow.power);

		//target
		this.target.draw();

		//score
		this.ctx.fillStyle = "white";	
		this.ctx.shadowBlur = 1;	
		this.ctx.font = "80px sans-serif";
		this.ctx.fillText(this.score, this.canvas.width/2, 80);

		//arrow
		this.arrow.checkCollission(this.target);
		this.arrow.draw();	
		this.arrow.checkBoundary(canvas);
		


	}

	reset(){
		this.target.move();
		this.score = 0;
		this.arrow.reset();
		this.target.deadArrows = [];			
		
	}

}