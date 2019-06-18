function AI(hero) {
    setInterval(() => {
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
    }, 1200);


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