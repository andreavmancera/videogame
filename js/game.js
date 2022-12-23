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
        this.showYummy = false;
        this.showWhoops = false;
        this.showSuper = false;
        this.messageFrames = 0;
        this.levelUpImg = new Image();
        this.levelUpImg.src = "./images/level-up.png";
        this.gameOverImg = new Image();
        this.gameOverImg.src = "./images/game-over.png";
        this.winnerImg = new Image();
        this.winnerImg.src = "./images/winner.png";
        this.scoreCount = 0;
        this.manyIngredients = 100;
        this.collisionY = 0;
        this.collisionX = 0;

        this.yummy = new Image();
        this.yummy.src = "./images/yummy.png";
        this.whoops = new Image();
        this.whoops.src = "./images/whoops.png";
        this.super = new Image();
        this.super.src = "./images/super.png";

        this.levelImg = new Image();
        this.levelImg.src = `./images/levels/${this.level}.png`;
    
        this.restartBoard = document.querySelector('#restart-button');
        this.restartBoard.addEventListener('click', () => {
            this.scoreCount = 0; 
            this.player.bandeja = new Bandeja(this.ctx, this.player.x, this.player.y, 110, 10);
            this.restartBoard.classList.add('hidden');
            this.start();
          });
    }

    start() {
        this.intervalId = setInterval(() => {

			this.clear();
            this.draw();
            this.move();
            this.checkCollisions();
            this.tick++;
            if (this.tick % this.manyIngredients === 0) {
				this.addIngredient();
			}

            this.messageFrames++;
        
            if (this.tick === 800) {
                ingredients.push("bread");
            }

            if (this.showYummy === true &&
            this.messageFrames < 30) {
                this.drawYummy();
            }

            if (this.showWhoops === true && this.messageFrames < 30) {
                this.drawWhoops();
            }
            
            // if (this.showSuper === true && this.messageFrames < 30) {
            //     this.drawSuper();
            //     if (this.messageframes < 300) {
            //         this.player.speedSpeed += 1.5;
            //     }
            //}
            

        
            
            // if (this.frames % 5 === 0) {
            //     this.drawYummy();
            // }
		}, 1000 / 60); //añadir bread después de tanto tiempo.
    }

    levelUp() {
        this.level += 1;
        this.tick = 0;
        clearInterval(this.intervalId);
        this.player.bandeja.slices = [];
        this.ingredients = [];
        ingredients.splice(ingredients.indexOf('bread'), 1);
        this.player.bandeja.topY = this.player.y;
        
        



        if (this.level === 1 || this.level === 2 || this.level === 3) {
            this.ctx.drawImage(this.levelUpImg, 0, 0, this.canvas.width, this.canvas.height);
            this.levelImg.src = `./images/levels/${this.level}.png`;
            this.drawMidScores();
            this.ingredients.vy += 0.5; //no funciona creo
            this.player.speedSpeed += 0.15;
            this.manyIngredients -= 20;
            setTimeout(() => {
                this.start();
            }, 3000)
        }

        // if (this.level === 2) {
        //     ingredients.push("egg");
        // }

        if (this.level === 4) {
            this.ctx.drawImage(this.winnerImg, 0, 0, this.canvas.width, this.canvas.height);
            this.drawFinalScore();
        }
        
    }

    
    draw() {
        this.bg.draw();
        this.player.draw();
        this.ingredients.forEach(ing => {
            ing.draw();
            if (ing.y > (this.canvas.height + ing.height)) {
                ing.isFalling = false;
                ing.isCatched = true;
            }
        }); 
        
        this.drawScore();
        this.drawLevel();
        
    }
    
    drawLevel() {
        this.ctx.drawImage(this.levelImg, this.canvas.width - 150, 15, 125, 125)
    }
    
    addIngredient() {
        const randomIngredient =  ingredients[Math.floor(Math.random() * ingredients.length)]
        this.ingredients.push(new Ingredient(this.ctx, Math.floor(Math.random() * 640), -50, randomIngredient));
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
        this.ctx.drawImage(
            this.yummy,
            this.collisionX + this.player.bandeja.width - 10,//this.player.bandeja.x + this.player.bandeja.width - 10,
            this.collisionY - 55, //this.player.bandeja.topY - 55,
            //(this.ctx.canvas.width / 2)  - 150,
            //50,
            140,
            140 * 1795 / 3098
            )
            
        }
        
        drawWhoops() {
            this.ctx.drawImage(
                this.whoops,
                this.collisionX + this.player.bandeja.width - 10,
                this.collisionY - 55,
                140,
                140 * 1795 / 3098
                )
                
            }

         drawSuper() {
                this.ctx.drawImage(
                    this.super,
                    this.collisionX + this.player.bandeja.width - 10,
                    this.collisionY - 55,
                    140,
                    140 * 1795 / 3049
                    )
                    
                }

            
            
            checkCollisions() {
                this.ingredients.some(ingredient => {
                    if (this.player.bandeja.isColliding(ingredient)) {
                        ingredient.isCatched = true;
                        ingredient.isFalling = false;
                        this.ingredients.slice(ingredient.index, ingredient.index + 1); //creo que esto no hace nada
                        
                        const slice = new Slice(this.ctx, this.player.bandeja.x, this.player.bandeja.topY - 14.85, ingredient.type)
                        this.player.bandeja.topY = slice.y;
                        this.player.bandeja.slices.push(slice);
                        this.collisionY = this.player.bandeja.topY;
                        this.collisionX = this.player.bandeja.x;
                        
                        if (ingredient.type === "tomato" || ingredient.type === "lettuce" || ingredient.type === "cheese" || ingredient.type === "bacon") {
                            this.scoreCount += 100;
                            this.showYummy = true;
                            this.showWhoops = false;
                            this.messageFrames = 0;
                            
                        };
                        
                        if (ingredient.type === "toxicSauce") {
                            this.scoreCount -= 50;
                            this.showYummy = false;
                            this.showWhoops = true;
                            this.messageFrames = 0;
                            this.player.xFrame = 1;
                            setTimeout(() => {
                                this.player.xFrame = 0;
                            }, 1250)
                        };
                        
                        if (ingredient.type === "egg") {
                            this.showSuper = true;
                            this.messageFrames = 0;
                        }

                        if (ingredient.type === "bread") {
                            setTimeout(() => {

                                this.levelUp();
                                localStorage.setItem('myScore', [this.scoreCount]);
                            }, 500)
                            
                        };
                    };  
                    
                    if (this.player.bandeja.topY <= 0) {
                        //console.log("game over")
                        this.gameOver();
                    };
                    
                    if (this.scoreCount < 0) {
                        this.showWhoops = false;
                        setTimeout(() => {
                            this.gameOver();
                            //this.ctx.fillText('0', 115, 35); hay que borrar el otro
                        }, 100)
                        
                    }
                    
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
                this.ctx.strokeRect(0, 0, 220, 55);
                this.ctx.fillRect(0, 0, 220, 55);
                this.ctx.lineWidth = 8;
                
                this.ctx.fillStyle = 'black';
                this.ctx.font = '35px Comic Neue';
                this.ctx.fillText(`Score:`, 15, 39);
                this.ctx.font = 'bold 40px Boogaloo';
                if (this.scoreCount >= 0) {
                    this.ctx.fillText(`${this.scoreCount}`, 115, 42)
                } else {
                    this.ctx.fillText('0', 115, 42)
                }
                
            }
            
            drawMidScores() {
                this.ctx.fillStyle = 'black';
                this.ctx.font = '70px Boogaloo';
                if (this.scoreCount >= 0) {
                    this.ctx.fillText(`${this.scoreCount}`, 610, 337)
                } else {
                    this.ctx.fillText('0', 610, 337)
                }
            }
            
            drawFinalScore() {
                this.ctx.fillStyle = 'black';
                this.ctx.font = '70px Boogaloo';
                if (this.scoreCount >= 0) {
                    this.ctx.fillText(`${this.scoreCount}`, (this.ctx.canvas.width / 2) - 20, 337)
                } else {
                    this.ctx.fillText('0', 480, 313)
                }
            }

            // drawTopScores() {
            //     this.ctx.fillStyle = 'black';
            //     this.ctx.font = '70px Boogaloo';
            //     this.ctx.fillText(`${scores}`, (this.ctx.canvas.width / 2) - 20, 337)
            // }
            
            gameOver() {
                const scores = JSON.parse(localStorage.getItem('myScores'));
                console.log(scores)
                // scores.push(this.scoreCount);
                // scores.sort((a, b) => b.score - a.score).splice(5);
        
                 //window.localStorage.setItem('myScores', JSON.stringify(scores));
                
                     //order
                     //splice
                // } else (if scores.forEach((score => score < this.ScoreCount))
                 // if for each element in scores, this.scoreCount >... 


                //if (no tengo 5 elementos) -> pushear y ordenar 
                // if (tengo 5 elementos && mi score actual es mayor que el ultimo elemento/primero) -> quito pongo 
                //localStorage.setItem('scores', scores);
                clearInterval(this.intervalId);
                this.ctx.drawImage(this.gameOverImg, 0, 0, this.canvas.width, this.canvas.height);
                this.level = 1;
                this.restartBoard.classList.remove('hidden');
                this.drawFinalScore();
                //this.drawTopScores();
            }
        
        }