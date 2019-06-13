function physics(position, boost, speed, direction, posMax, posMin) {
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

    if (position > posMax) {
        direction = speed > 0 ? -1 : 1;
    } else if (position < posMin) {
        direction = speed > 0 ? 1 : -1;
    }

    return {
        position: position,
        boost : boost,
        speed : speed,
        direction : direction
    }
};
