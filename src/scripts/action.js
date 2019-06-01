const config = {
  lengthPhrasesForActions = {
     move : 2,
     jump : 2,
     hit  : 4
  }
};

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
    console.log(event.key);
    if (found < 0) {
        uiElements.map((uiElement, index) => {
            if (uiElement.symbols[charCounter] === event.key) {
                uiElement.elemSymbols[charCounter].classList.remove('fadeIn');
                uiElement.elemSymbols[charCounter].classList.add('fadeOutDown');
                uiElement.elemText.style.transform = 'scale(1.5)';
                found = index;
            } else {
                uiElement.elem.style.opacity = '0';
            }
        });
        charCounter++;
    } else if (uiElements[found].symbols[charCounter] === event.key) {
        uiElements[found].elemSymbols[charCounter].classList.remove('fadeIn');
        uiElements[found].elemSymbols[charCounter].classList.add('fadeOutDown');
        charCounter++;
    } else {
        uiElements[found].setText(makePhrase(4));
        found = -1;
        charCounter = 0;
    }

    if (found >= 0 && uiElements[found].symbols.length === charCounter) {
        uiElements[found].setText(makePhrase(4));
        console.log(uiElements[found].action , uiElements[found].direction);
        gameObjects.player1.runAction(uiElements[found].action , +uiElements[found].direction);
        found = -1;
        charCounter = 0;
    } else if (found >= 0 ) {
        uiElements[found].elemSymbols[charCounter].classList.add('symbol_selected');
    }

    if (found < 0){
        uiElements.map((uiElement, index) => {
            uiElement.elem.style.opacity = '1';
            uiElement.elemText.style.transform = '';
        });
        found = -1;
        charCounter = 0;
    }



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

