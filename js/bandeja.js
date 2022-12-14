class Bandeja {
  constructor(ctx, x, y, width, height) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.topY = y;
    this.width = width;
    this.height = height;
    this.slices = [];

  }

  draw() {
    this.slices.forEach((slice) => {
      slice.draw();
    });
  }

  move(playerX) {
    this.x = playerX;
    this.slices.forEach((slice) => {
      slice.move(this.x);
    });
  }

  isColliding(ingredient) {
    return (
      this.x < ingredient.x + ingredient.width &&
      this.x + this.width > ingredient.x &&
      this.topY < ingredient.y + ingredient.height &&
      this.topY + this.height > ingredient.y &&
      ingredient.lastY + ingredient.height <= this.topY
    );
  }
}
