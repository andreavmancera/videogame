class Whoops {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.width = 300;
    
        this.img = new Image();
        this.img.src = "./images/whoops.png"

        this.isReady = false;
	    this.img.onload = () => {
			this.isReady = true;
            this.height = this.width * (this.img.height / this.img.width);
        }
        
    }
    

    //esto tiene que ser un estado. Dentro del set interval de game, 

    draw() {
        this.drawWhoops = setInterval(() => {
			this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.width,
                this.height
            )
            
		}, 1000 / 60);

        this.clearWhoops = setInterval(() => {
			this.drawWhoops = clearInterval(); 
		}, 3000);
        
    }
}