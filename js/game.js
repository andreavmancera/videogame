class Game {
    constructor(canvasId, level){
        this.canvas = document.getElementById(canvasId);
        this.level = level;
        this.ctx = this.canvas.getContext("2d");
        this.player = new Player(this.ctx, this.ctx.canvas.width / 2, this.ctx.canvas.height - 230);
        this.bg = new Background(this.ctx);
        this.ingredients = [];
        this.whoops = new Whoops(this.ctx, (this.ctx.canvas.width / 2)  - 130, 30);
        this.tick = 0;
        this.frames = 0;
        this.levelUpImg = new Image();
        this.levelUpImg.src = "./images/level-up.png";
        this.scoreCount = 0;
        //this.restartBoard = document.querySelector('#restartBoard')
    }

    start() {
        this.intervalId = setInterval(() => {

			this.clear();
            this.draw();
            this.move();
            this.checkCollisions();
            this.tick++;
            if (this.tick % 150 === 0) {
				this.addIngredient();
			}
            this.frames++;
        
            if (this.frames % 1200 === 0) {
                ingredients.push("bread");
        
            }
            
            // if (this.frames % 5 === 0) {
            //     this.drawYummy();
            // }
		}, 1000 / 60); //añadir bread después de tanto tiempo.
    }

    levelUp() {
        this.level += 1;
        clearInterval(this.intervalId);
        this.ctx.drawImage(this.levelUpImg, 0, 0, this.canvas.width, this.canvas.height)
        //this.restartBoard.show();



        if (this.level === 1) {
            this.ingredients.vy === 3;
        }
        if (this.level === 2) {
            this.ingredients.vy === 3.5;
        }
        if (this.level === 3) {
            this.ingredients.vy === 4;
        }
    }

    draw() {
        this.bg.draw();
        this.player.draw();
        this.ingredients.forEach(ing => {
            ing.draw();
            if (ing.y > (this.canvas.height - ing.height)) {
                ing.isFalling = false;
                ing.isCatched = true;
            }
        }); 

        this.drawScore()
    }

    addIngredient() {
        const randomIngredient =  ingredients[Math.floor(Math.random() * ingredients.length)]
        this.ingredients.push(new Ingredients(this.ctx, Math.floor(Math.random() * 470), -50, randomIngredient));
    }

    move() {
        this.player.move();
        this.ingredients.forEach(ing => ing.move());
    }

    clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ingredients = this.ingredients.filter(ing => ing.isFalling);
	};

    drawYummy() {
        this.yummy = new Image();
        this.yummy.src = "./images/yummy.png";
        this.isReady = false;
	    this.ctx.drawImage(
            this.yummy,
            (this.ctx.canvas.width / 2)  - 130,
            30,
            300,
            this.yummy.width * (this.yummy.height / this.yummy.width)
        )

    }

    checkCollisions() {
        this.ingredients.some(ingredient => {
            if (this.player.bandeja.isColliding(ingredient)) {
                    ingredient.isCatched = true;
                    ingredient.isFalling = false;
                    this.ingredients.slice(ingredient.index, ingredient.index + 1); //creo que esto no hace nada

                    const slice = new Slice(this.ctx, this.player.bandeja.x, this.player.bandeja.topY - 14.85, ingredient.type)
                    this.player.bandeja.topY = slice.y
                    this.player.bandeja.slices.push(slice);

                    if (ingredient.type === "tomato" || ingredient.type === "lettuce" || ingredient.type === "cheese" || ingredient.type === "bacon") {
                        this.scoreCount += 100;
                    };

                    if (ingredient.type === "toxicSauce") {
                        this.scoreCount -= 50;
                    };

                    if (ingredient.type === "bread") {
                        setTimeout(() => {
                            this.levelUp();
                          }, 500)
                        //this.levelUp(); //lo que tengo que hacer es pasar una variable a true cuando el pan sea sety de ahí level up
                    };
                 };  
            
        })
    }


    onKeyDown(event) {
        this.player.onKeyDown(event);
    }

    onKeyUp(event) {
        this.player.onKeyUp(event);
    }

    drawScore() {
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(0, 0, 300, 50);
        this.ctx.fillRect(0, 0, 300, 50);
        this.ctx.lineWidth = 8;

        this.ctx.fillStyle = 'black';
        this.ctx.font = '32px Comic Neue';
        this.ctx.fillText(`Score:`, 15, 35);
        this.ctx.font = 'bold 32px Comic Neue';
        this.ctx.fillText(`${this.scoreCount}`, 115, 35);
    }

}