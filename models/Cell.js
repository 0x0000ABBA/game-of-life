class Cell {
    isAlive;
    cX;
    cY;

    constructor(isAlive, cX, cY) {
        this.isAlive = isAlive;
        this.cX = cX;
        this.cY = cY;
    };

    switch = () => {
        this.isAlive = !this.isAlive
    }
}