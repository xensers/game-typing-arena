function AI(hero) {
    this.time = 1600;
    this.interval = setInterval(this.action, this.time);

    this.setTime = (time) => {

        clearInterval(this.interval);

        this.time = time > 400 ? time : 400;
        if (this.time < 800) {
            hero.setSkin('man');
        } else if (this.time < 1000 && this.time >= 800) {
            hero.setSkin('niga');
        } else if (this.time < 1400 && this.time >= 1000) {
            hero.setSkin('boy');
        } else if (this.time < 1800 && this.time >= 1400) {
            hero.setSkin('girl');
        } else {
            hero.setSkin('zombie');
        }

        this.interval = setInterval(this.action, this.time);

        return this;
    }

    this.action = () => {
        let i;
        for (var key in gameObjects) {
            if (gameObjects[key] !== hero) {
                let distance = gameObjects[key].state.positionX - hero.state.positionX;

                if (Math.abs(distance) <= 200) {
                    if (Math.round(Math.random()) === 0) {
                        switchAction(0);
                    } else {
                        let actionIndex = Math.floor(Math.random() * 3 + 1);
                        switchAction(actionIndex);
                    }
                } else {
                    let actionIndex = Math.floor(Math.random() * 3 + 1);
                    switchAction(actionIndex);
                }
            }
        }
    }


    const switchAction = (index) => {
        switch (index) {
            case 0:
                hero.runAction('hit');
                break;
            case 1:
                hero.runAction('move', 1);
                break;
            case 2:
                hero.runAction('move', -1);
                break;
            case 3:
                hero.runAction('jump');
                break;
        }
    }
}
