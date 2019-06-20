const config = {
  lengthPhrasesForActions : {
     move : 1,
     jump : 2,
     hit  : 3
  }
};

const ui = new Ui();

const animationsLoop = new AnimationsLoop();
animationsLoop.play();

const gameObjects = {};

const arena =  {
    xMin : 0,
    xMax : 900,
    yMin: 0,
    yMax: 300
};

raund.innerText = -1;
playerScore.innerText = -1;
enemyScore.innerText  = -1;

const elemPlayer = document.querySelector('#player .hero');
gameObjects.player = new Hero(elemPlayer);
const elemEnemy = document.querySelector('#enemy .hero');
gameObjects.enemy = new Hero(elemEnemy);

const ai = new AI(gameObjects.enemy);

const setDefault = () => {
    raund.innerText = +raund.innerText + 1;

    if (gameObjects.player.state.health > 0) {
      playerScore.innerText = +playerScore.innerText + 1;
    }

    if (gameObjects.enemy.state.health > 0) {
      enemyScore.innerText = +enemyScore.innerText + 1;
    }

    gameObjects.player.setSkin('man');
    gameObjects.player.state.health = 100;
    gameObjects.player.state.positionY = 0;
    gameObjects.player.state.positionX = 100;
    gameObjects.player.state.direction = 1;

    gameObjects.enemy.setSkin('niga');
    gameObjects.enemy.state.health = 100;
    gameObjects.enemy.state.positionY = 0;
    gameObjects.enemy.state.positionX = 800;
    gameObjects.enemy.state.direction = -1;


    let time = 2000 - (+playerScore.innerText - enemyScore.innerText) * 200;
    ai.setTime(time);
};
setDefault();


// let soundClick = new Audio();
// soundClick.src = '../media/click.mp3';


let charCounter = 0;
let found = -1;
document.addEventListener('keydown', (event) => {
    // console.log(event.key);
    if (ui.found(event.key)) {
      event.preventDefault();
      // soundClick.pause();
      // soundClick.currentTime = 0;
      // soundClick.play();
    }

/*    switch (event.keyCode) {
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
    }*/
}, false);

