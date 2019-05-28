const elemHero1 = document.querySelector('.hero');

const objHero = new Hero(elemHero1);

objHero.setSkin('man');

document.addEventListener('keydown', (event) => {
    // console.log(event.key, event.keyCode);
    switch (event.keyCode) {
          case 87:
              event.preventDefault();
              objHero.runAction('jump');
              break;
          case 83:
              event.preventDefault();
              objHero.runAction('down');
              break;
          case 68:
              event.preventDefault();
              objHero.runAction('move', 1);
              break;
          case 65:
              event.preventDefault();
              objHero.runAction('move', -1);
              break;
    }
}, false);

