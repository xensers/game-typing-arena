const elemHero1 = document.querySelector('.hero');

const objHero = new Hero(elemHero1);

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  // console.log(event.key);
  const keyName = event.key;
  if (keyName === 'ArrowUp') {
      objHero.action.jump();
  }

  if (keyName === 'ArrowDown') {
      objHero.action.down();
  }

    if (keyName === 'ArrowRight') {
        objHero.action.move(1);
    }
    if (keyName === 'ArrowLeft') {
        objHero.action.move(-1);
    }
}, false);

function Hero(elemHero) {

    let actionTimer;

    this.state = {
        action: null,
        pose: null,
        direction: 1,
        positionX: 0,
        positionY: 0,
    };

    this.setPosition = (x, y, direction) => {
        if (!x && typeof(x) !== 'number') x = this.state.positionX;
        if (!y && typeof(y) !== 'number') y = this.state.positionY;
        if (!direction && typeof(direction) !== 'number') direction = this.state.direction;

        if (direction !== this.state.direction) {
            elemHero.style.transition = 'none 0s ease 0s';
            elemHero.style.transform = `translate(${this.state.positionX * 100}%, ${this.state.positionY * 100}%) scaleX(${direction})`;
            this.state.direction = direction;
        }

        setTimeout(() => {
            requestAnimationFrame(()=>
            {
                if (x < 0) x = 0;
                if (x > 9) x = 9;
                if (y > 1) y = 0;
                if (y < -2) y = -2;

                elemHero.style.transition = '';
                this.state.positionX = x;
                this.state.positionY = y;
                elemHero.style.transform = `translate(${x * 100}%, ${y * 100}%) scaleX(${this.state.direction})`;
            });
        }, 0);

    };

    this.setPose = (pose) => {
        elemHero.classList.remove('hero_' + this.state.pose);
        this.state.pose = pose;
        if (pose) {
            elemHero.classList.add('hero_' + pose);
        }
        return this;
    };

    const action = {
        'start': () => {},
        'end': () => {},
        'reset': () => {},
        'play': (timeout) => {
            requestAnimationFrame(() => {
                if (!timeout) timeout = 300;
                action.reset();
                clearTimeout(actionTimer);
                requestAnimationFrame(action.start);
                actionTimer = setTimeout(() => {
                    requestAnimationFrame(action.end);
                    this.state.action = false;
                }, timeout);
            })
        }
    };

    this.action = {
        'jump' : (direction) => {
            if (this.state.action === 'jump') return false;
            this.state.action  = 'jump';
            action.reset();

            let timer;
            action.start = () => {
                this.setPose('jump');

                if (typeof(direction) !== 'number' && direction === 1) {
                    this.setPosition(this.state.positionX + 1, -1.5, direction);
                } else if (typeof(direction) !== 'number' && direction === -1) {
                    this.setPosition(this.state.positionX - 1, -1.5, direction);
                } else {
                    this.setPosition(false, -1.5);
                }

                timer = setTimeout(() => {
                    this.setPosition(false, 0.1);
                    this.setPose('landed');
                }, 400);
            };
            action.end = action.reset = () => {
                clearTimeout(timer);
                this.setPosition(false, 0);
                this.setPose(null);
            };
            action.reset = () => {
                clearTimeout(timer);
                this.setPosition(false, 0);
                console.log('reset jump');
            };
            action.play(800);
        },
        'down' : () => {
            if (this.state.action === 'down') return false;
            this.state.action  = 'down';
            action.reset();
            action.start = () => {
                this.setPosition(false, 0.1);
                this.setPose('down');
            };
            action.end = () => {
                this.setPosition(false, 0);
                this.setPose(false);
                console.log('reset down');
            };
            action.reset = () => {
                this.setPosition(false, 0);
            };
            action.play(500);
        },
        'move' : (direction) => {
            if (this.state.action === 'move') return false;
            this.state.action = 'move';
            let timer;
            action.reset();
            if (!direction && typeof(direction) !== 'number') direction = this.state.direction;
            action.start = () => {
                clearTimeout(timer);
                if (direction === 1) {
                    this.setPosition(this.state.positionX + 1, false, direction);
                }
                if (direction === -1) {
                    this.setPosition(this.state.positionX - 1, false, direction);
                }
                elemHero.classList.add('hero_move');
                if (!this.state.pose)
                {
                    console.log(this.state.pose);
                    this.setPose('step-2');
                    timer = setTimeout(() => {
                        elemHero.classList.remove('step-2');
                        this.setPose('step-1');
                    }, 300);
                }
            };
            action.reset = () => {
                elemHero.classList.remove('hero_move');
                clearTimeout(timer);
                this.setPose(null);
            };
            action.end  = action.reset;
            action.play(600);
        },
        'stop' : () => {
            action.reset();
            action.start = () => {
                this.setPose(null);
            };
            action.end = () => {};
            action.reset = () => {};
            action.play(0);
        }
    };

    return this;
}
