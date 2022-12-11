const game = new Game("canvas", 1);
startBtn = document.getElementById("start-button");

window.onload = () => {
    startBtn.addEventListener('click', () => {
      game.start();
      startBtn.classList.add('hidden');
    });

    document.addEventListener('keydown', function(event) {
        game.onKeyDown(event);
      });
      
      document.addEventListener('keyup', function(event) {
        game.onKeyUp(event);
      });
} 