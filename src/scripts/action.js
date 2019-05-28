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

gameObjects.player2.setSkin('man');
gameObjects.player2.state.positionX = 100;

gameObjects.player1.setSkin('zombie');
gameObjects.player1.state.positionX = 800;
gameObjects.player1.state.direction = -1;

document.addEventListener('keydown', (event) => {
    // console.log(event.key, event.keyCode);
    switch (event.keyCode) {
          case 87:
              event.preventDefault();
              gameObjects.player2.runAction('jump');
              break;
          case 83:
              event.preventDefault();
              gameObjects.player2.runAction('down');
              break;
          case 68:
              event.preventDefault();
              gameObjects.player2.runAction('move', 1);
              break;
          case 65:
              event.preventDefault();
              gameObjects.player2.runAction('move', -1);
              break;
        case 38:
            event.preventDefault();
            gameObjects.player1.runAction('jump');
            break;
        case 40:
            event.preventDefault();
            gameObjects.player1.runAction('down');
            break;
        case 37:
            event.preventDefault();
            gameObjects.player1.runAction('move', -1);
            break;
        case 39:
            event.preventDefault();
            gameObjects.player1.runAction('move', 1);
            break;
    }
}, false);

