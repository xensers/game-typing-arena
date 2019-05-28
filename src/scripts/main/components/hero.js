function Hero(elemHero)  {

    const activeActions = [];

    this.state = {
        action: null,
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

    const getNextPositions = (position, boost, speed, direction, max, min) => {
        speed = Math.abs(speed) < 1 ? 0 : speed;
        boost = boost <= 0 ? 0 : boost;

        if (boost > 0) {
            boost -= 1 + (Math.abs(boost) / 100);
            speed += 1 + (Math.abs(boost) / 100);
        }
        else if (speed !== 0 && speed > 0) {
            speed -= 1 + (Math.abs(speed) / 100);
        } else if (speed !== 0 && speed < 0) {
            speed += 1 + (Math.abs(speed) / 100);
        }

        position = position + speed / 10 * direction;

        if (position > max) {
            direction = speed > 0 ? -1 : 1;
        } else if (position < min) {
            direction = speed > 0 ? 1 : -1;
        }

        return {
            position: position,
            boost : boost,
            speed : speed,
            direction : direction
        }
    };

    animationsLoop.push((time) => {
        let nextPositionsX = getNextPositions(
            this.state.positionX,
            this.state.boostX,
            this.state.speedX,
            this.state.direction,
            arena.xMax,
            arena.xMin);

        this.state.positionX = nextPositionsX.position;
        this.state.boostX = nextPositionsX.boost;
        this.state.speedX = nextPositionsX.speed;
        this.state.direction = nextPositionsX.direction;

        let nextPositionsY = getNextPositions(
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

        elemHero.style.transform = `translate(${this.state.positionX}%, ${-this.state.positionY}%) scaleX(${this.state.direction})`;

    });

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
        if (direction === 1 || direction === -1) {
            if (direction !== this.state.direction) {
                this.state.direction = direction;
                this.state.speedX = 0;
            }
        }

        const action = actions[actionName] ? actions[actionName] : false;
        if (!action) return this;
        if (activeActions.indexOf( actionName ) !== -1 ) return this;
        activeActions.push(actionName);

        let delay = 0;
        action.map((actionStep, index) => {
            setTimeout(actionStep.action, delay);
            delay += actionStep.duration ? actionStep.duration : 0;
        });

        setTimeout(() => {
            activeActions.splice(activeActions.indexOf(actionName, 1));
        }, delay);
        return this;
    };

    const actions = {
        'jump': [
            {
                name: 'JumpStart',
                duration: 300,
                action: () => {
                    if (!this.state.positionY > 0) this.state.speedY = 60;
                }
            }
        ],
        'down' : [
            {
                name: 'DownStart',
                duration: 500,
                action: () => {
                    this.setPose('down');;
                }
            },
            {
                name: 'DownEnd',
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
        ]
    };

    return this;
}
