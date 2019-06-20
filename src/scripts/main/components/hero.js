function Hero(elemHero) {
    const activeActions = [];
    const elemDirection = elemHero.querySelector('.hero__direction');
    const elemUi = elemHero.querySelector('.ui');


    const elemUiHealth = document.createElement('div');
    elemUiHealth.className = 'hero__health';
    elemHero.appendChild(elemUiHealth);

    this.state = {
        action: false,
        nextAction: false,
        health: 100,
        damage: 0,
        pose: null,
        direction: 1,
        directionY: 1,
        positionX: 0,
        positionY: 0,
        speedX: 0,
        boostX: 0,
        speedY: 0,
        boostY: 0
    };

    this.setPose = (pose) => {
        if (this.state.pose) {
            requestAnimationFrame(() => {
                elemHero.classList.remove('hero_' + this.state.pose);
            });
        }

        if (pose) {
            this.state.pose = pose;
            requestAnimationFrame(() => {
                elemHero.classList.add('hero_' + pose);
            });
        }

        return this;
    };

    this.unsetPose = (pose) => {
        this.state.pose = null;
        requestAnimationFrame(() => {
                elemHero.classList.remove('hero_' + pose);
                // TODO: Возможно нужно будет возвращать предыдущую позу
        });
        return this;
    };

    this.setSkin = (skin) => {
        elemHero.classList.remove('hero_' + this.state.skin);
        this.state.skin = skin;
        if (skin) {
            elemHero.classList.add('hero_' + skin);
        }
        return this;
    };

    this.runAction = (actionName, direction) => {
        if (this.state.health <= 0 || animationsLoop.paused) return this;
        if (direction === 1 || direction === -1) {
            if (direction !== this.state.direction) {
                this.state.direction = direction;
                this.state.speedX = 0;
            }
        }

        if (activeActions.indexOf( actionName ) !== -1 ) {
            this.state.nextAction = [actionName, direction];
            return this;
        }

        const action = actions[actionName] ? actions[actionName] : false;
        if (!action) return this;

        activeActions.push(actionName);

        let delay = 0;
        action.map((actionStep, index) => {
            setTimeout(actionStep.action, delay);
            delay += actionStep.duration ? actionStep.duration : 0;
        });

        setTimeout(() => {
            activeActions.splice(activeActions.indexOf(actionName, 1));

            if(this.state.nextAction) {
                this.runAction(this.state.nextAction[0], this.state.nextAction[1]);
                this.state.nextAction = false;
            }
        }, delay);

        return this;
    };

    const actions = {
        'jump': [
            {
                name: 'jump-start',
                duration: 1500,
                action: () => {
                    if (!this.state.positionY > 0) {
                        this.state.speedY = 60;
                        this.state.boostX = 40;
                    }
                }
            }
        ],
        'down' : [
            {
                name: 'down-start',
                duration: 500,
                action: () => {
                    this.setPose('down');;
                }
            },
            {
                name: 'down-end',
                action: () => {
                    this.unsetPose('down');
                }
            }
        ],
        'move' : [
            {
                name: 'Step1',
                duration: 300,
                action: () => {
                    this.state.boostX = 35;
                    if (!this.state.pose) this.setPose('step-1');
                }
            },
            {
                name: 'Step2',
                duration: 300,
                action: () => {
                    this.unsetPose('step-1');
                    if (!this.state.pose) this.setPose('step-2');
                }
            },
            {
                name: 'stop',
                action: () => {
                    this.unsetPose('step-2');
                }
            }
        ],
        'damage' : [
            {
                name: 'takeDamageStart',
                duration: 300,
                action: () => {
                    this.setPose('damage');
                    this.state.health -= this.state.damage;
                    this.state.damage = 0;
                }
            },
            {
                name: 'takeDamageEnd',
                action: () => {
                    this.unsetPose('damage');
                    if (this.state.health <= 0) setTimeout(setDefault, 3000);
                }
            }
        ],
        'hit' : [
            {
                name: 'hit1',
                duration: 300,
                action: () => {
                    this.setPose('hit-1');
                }
            },
            {
                name: 'hit2',
                duration: 300,
                action: () => {
                    this.unsetPose('hit-1');
                    this.setPose('hit-2');
                    let changedDirection = false;
                    for (var key in gameObjects) {
                      if (gameObjects[key] !== this) {
                          let distance =  gameObjects[key].state.positionX - this.state.positionX;
                          let distanceY = gameObjects[key].state.positionY - this.state.positionY;

                          if (Math.abs(distance) <= 200 && Math.abs(distanceY) < 100) {
                              if (!changedDirection) {
                                  if (distance > 0) {
                                      this.state.direction = 1;
                                      gameObjects[key].state.direction = -1;
                                  } else {
                                      this.state.direction = -1;
                                      gameObjects[key].state.direction = 1;
                                  }
                                  changedDirection = true;
                              }

                              if (this.state.direction + gameObjects[key].state.direction === 0
                                  && distance * this.state.direction > 0) {
                                  gameObjects[key].state.speedX = -50;
                                  gameObjects[key].state.damage += 10;
                              }

                          }
                      }
                    }
                }
            },
            {
                name: 'hitEnd',
                action: () => {
                    this.unsetPose('hit-2');
                }
            }
        ]
    };

    animationsLoop.push((time) => {
        let nextPositionsX = physics(
            this.state.positionX,
            this.state.boostX,
            this.state.speedX,
            this.state.direction,
            arena.xMax,
            arena.xMin);

        if (this.state.damage > 0) {
            this.runAction('damage');
        }

        if (this.state.health <= 0) {
            this.state.health = 0;
            elemUiHealth.style.color = '#222';
            this.setPose('dead');
            elemUi.style.display = 'none';
        } else {
            this.unsetPose('dead');
             elemUi.style.display = '';
        }

        if (this.state.health > 0 && this.state.health <= 30) {
            elemUiHealth.style.color = '#f00';
        } else if (this.state.health > 30 &&  this.state.health <= 60) {
            elemUiHealth.style.color = '#ff0';
        } else if (this.state.health > 60) {
            elemUiHealth.style.color = '#0f0';
        }

        this.state.positionX = nextPositionsX.position;
        this.state.boostX = nextPositionsX.boost;
        this.state.speedX = nextPositionsX.speed;
        this.state.direction = nextPositionsX.direction;

        let nextPositionsY = physics(
            this.state.positionY,
            this.state.boostY,
            this.state.speedY,
            this.state.directionY,
            arena.yMax,
            arena.yMin);

        this.state.positionY = nextPositionsY.position;
        this.state.boostY = nextPositionsY.boost;
        this.state.speedY = nextPositionsY.speed;
        this.state.directionY = nextPositionsY.direction;

        if (this.state.speedY === 0 && this.state.positionY > 0) {
            this.state.directionY = -1;
        }

        if (this.state.directionY === -1) {
            this.state.speedY += 3;
        }

        if (this.state.positionY <= 0 && this.state.speedY < 80) {
            this.state.boostY = 0;
            this.state.speedY = 0;
            this.state.positionY = 0;
            this.state.directionY = 1;
            if (this.state.pose === 'jump') {
                this.setPose('landed');
                setTimeout(() => {
                    this.unsetPose('landed');
                    this.unsetPose('jump');
                },300);
            }
        }

        if (this.state.speedY > 0) {
            if (!this.state.pose) this.setPose('jump');
        } else {
            this.unsetPose('jump');
        }

        elemHero.style.transform = `translate(${this.state.positionX}%, ${-this.state.positionY}%)`;
        elemDirection.style.transform = `scaleX(${this.state.direction})`;
        elemUiHealth.innerText = this.state.health;
    });

    return this;
}
