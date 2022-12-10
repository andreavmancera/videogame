class Slice {
  constructor(ctx, x, y, type) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.type = type;
    this.isBread = false;
    
    this.img = new Image();
    this.img.src = `./images/setted/${this.type}.png`;
    this.isReady = false;
    this.img.onload = () => {
      this.isReady = true;
      this.height = this.width * this.img.height / this.img.width;
    };

  }

  draw() {
    if (this.isReady) {
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      // this.stackedY -= this.height
    }


  }

  move(bandejaX) {
    this.x = bandejaX + 4;
  }
}
