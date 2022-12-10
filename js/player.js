class Player {
    constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
	this.height = 230;
	this.horizontalFrames = 2;
	this.verticalFrames = 1;
	this.xFrame = 1;
	this.yFrame = 0;

    this.img = new Image();
	this.img.src = "images/player2.png";
	this.isReady = false;
	this.img.onload = () => {
			this.isReady = true;
            this.width = this.height * ((this.img.width / 2) / this.img.height);
        }

    this.speed = 3;
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.bandeja = new Bandeja(this.ctx, this.x, this.y, 110, 10);

    }
    
    draw() {
        if (this.isReady) {
            //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
            this.ctx.drawImage(
                this.img,
				this.img.width / this.horizontalFrames * this.xFrame,
				this.img.height / this.verticalFrames * this.yFrame,
				this.img.width / this.horizontalFrames,
				this.img.height / this.verticalFrames,
				this.x,
				this.y,
				this.width,
				this.height
                );
                
        };
        this.bandeja.draw() 
    };

    move() {
        if(this.isMovingRight){
            this.x += this.speed;
            this.speed += 0.07;
        }

        if(this.isMovingLeft){
            this.x -= this.speed;
            this.speed += 0.07;
        }
        
        if (this.x > this.ctx.canvas.width - this.width) {
			this.x = this.ctx.canvas.width - this.width;
			this.isMovingRight = false;
		}

        if (this.x < 0) {
			this.x = 0;
			this.isMovingLeft = false;
		}

        this.bandeja.move(this.x)
	}

    onKeyDown(event) {
		if (event.keyCode === 39) {
			this.isMovingRight = true;
		}

        if (event.keyCode === 37) {
			this.isMovingLeft = true;
		}
	}

    onKeyUp(event) {
		if (event.keyCode === 39) {
			this.isMovingRight = false;
            this.speed = 1;
		}
        if (event.keyCode === 37) {
			this.isMovingLeft = false;
            this.speed = 1;
		}
	}



};