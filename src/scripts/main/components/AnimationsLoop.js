function AnimationsLoop() {
    this.array = [];
    this.paused = false;

    const loop = (time) => {
        this.array.map(animate => {
            animate(time);
        });
        if (!this.paused) requestAnimationFrame(loop);
    };

    this.play = () => {
        this.paused = false;
        requestAnimationFrame(loop);
    };

    this.pause = () => {
        this.paused = true;
    };

    this.push = (elem) => {
        this.array.push(elem);
    };
}