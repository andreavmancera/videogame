class Ingredient {
    constructor (ctx, x, y, type) { //luego img
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.lastY = y;
        this.height = 55;
        this.isCatched = false;
        this.isFalling = true;
        this.type = type;
        
        this.horizontalFrames = 4;
	    this.verticalFrames = 1;
	    this.xFrame = 0;
	    this.yFrame = 3;
        this.img = new Image();
        this.img.src = `./images/falling/${this.type}.png`;
        this.isReady = false;
	    this.img.onload = () => {
			this.isReady = true;
            this.width = this.height * (this.img.width / this.img.height);
        }

        this.vy = 4;
        this.tick = 0;
    }


    draw () {
        
        if (this.isReady) {
            if (this.isFalling ) {
            
                this.ctx.drawImage(
                    this.img,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                )   
            }
        }
        this.tick++;
    }

    move () {
        this.lastY = this.y;
        this.y += this.vy;
    }


}


