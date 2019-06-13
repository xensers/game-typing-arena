const config = {
  lengthPhrasesForActions : {
     move : 1,
     jump : 2,
     hit  : 3
  }
};

const ui = new Ui();

const animationsLoop = [];
requestAnimationFrame(function loop(time) {
    animationsLoop.map(animate => {
        animate(time);
    });
    requestAnimationFrame(loop);
});

const gameObjects = {};

const arena =  {
    xMin : 0,
    xMax : 900,
    yMin: 0,
    yMax: 300
};

const elemPlayer = document.querySelector('#player .hero');
const elemEnemy = document.querySelector('#enemy .hero');

gameObjects.player = new Hero(elemPlayer);
gameObjects.enemy = new Hero(elemEnemy);

gameObjects.player.setSkin('man');
gameObjects.player.state.positionX = 100;

gameObjects.enemy.setSkin('zombie');
gameObjects.enemy.state.positionX = 800;
gameObjects.enemy.state.direction = -1;


let soundClick = new Audio();
soundClick.src = '../media/click.mp3';


let charCounter = 0;
let found = -1;
document.addEventListener('keydown', (event) => {
    // console.log(event.key);
    if (ui.found(event.key)) {
      event.preventDefault();
      soundClick.currentTime = 0;
      soundClick.play();
    }

    switch (event.keyCode) {
          case 16:
              event.preventDefault();
              gameObjects.enemy.runAction('hit');
              break;
          case 38:
              event.preventDefault();
              gameObjects.enemy.runAction('jump');
              break;
          case 40:
              event.preventDefault();
              gameObjects.enemy.runAction('down');
              break;
          case 37:
              event.preventDefault();
              gameObjects.enemy.runAction('move', -1);
              break;
          case 39:
              event.preventDefault();
              gameObjects.enemy.runAction('move', 1);
              break;
    }
}, false);

