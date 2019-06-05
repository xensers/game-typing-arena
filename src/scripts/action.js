const config = {
  lengthPhrasesForActions : {
     move : 2,
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

const elemHero1 = document.querySelector('#player1 .hero');
const elemHero2 = document.querySelector('#player2 .hero');

gameObjects.player1 = new Hero(elemHero1);
gameObjects.player2 = new Hero(elemHero2);



gameObjects.player1.setSkin('man');
// gameObjects.player2.setPose('damage');
gameObjects.player1.state.positionX = 100;

gameObjects.player2.setSkin('zombie');
gameObjects.player2.state.positionX = 800;
gameObjects.player2.state.direction = -1;


let charCounter = 0;
let found = -1;
document.addEventListener('keydown', (event) => {
    event.preventDefault();
    // console.log(event.key);
    ui.found(event.key);

    switch (event.keyCode) {
          case 16:
              event.preventDefault();
              gameObjects.player2.runAction('hit');
              break;
          case 38:
              event.preventDefault();
              gameObjects.player2.runAction('jump');
              break;
          case 40:
              event.preventDefault();
              gameObjects.player2.runAction('down');
              break;
          case 37:
              event.preventDefault();
              gameObjects.player2.runAction('move', -1);
              break;
          case 39:
              event.preventDefault();
              gameObjects.player2.runAction('move', 1);
              break;
    }
}, false);

