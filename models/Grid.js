class Grid {
    cells;
    width;
    height;
    generation;
    numberOfCellsV;
    numberOfCellsG;
    ctx;
    widthOfCell;
    isGameOver;

    constructor(width, height, ctx, generation = 1, cells, widthOfCell = 10) {
        this.width = width;
        this.height = height;
        this.generation = generation;
        this.ctx = ctx;
        this.widthOfCell = widthOfCell;
        this.isGameOver = false;

        if (cells) {
            this.cells = cells;
            return;
        }
        this.cells = [];
        this.numberOfCellsG = this.getNumberOfCells(widthOfCell, this.width);
        this.numberOfCellsV = this.getNumberOfCells(widthOfCell, this.height);

        this.getCells();
        this.draw();
        this.update(100);
    };

    update = (delay) => {
        setInterval(() => {
            this.getNewGenerationOfCells();
            this.ctx.clearRect(0, 0, this.width, this.height)
            this.draw();
            console.log("This is generation #" + this.generation)
            this.generation += 1
        }, delay)
    }

    getNewGenerationOfCells = () => {
        const neighbours = [
            [-1, -1],
            [0, -1],
            [1, -1],
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 1],
            [-1, 0],
            [-1, -1]
        ];
        const newCells = this.cells.map((xValues, y) => {
            if (xValues) {
                return xValues.map((cell, x) => {
                    const neighboursForStat = [];
                    let aliveNeighbours = 0;
                    neighbours.forEach((coordDiff) => {
                        if (y + coordDiff[1] < this.cells.length && y + coordDiff[1] >= 0 && x + coordDiff[0] >= 0 && x + coordDiff[0] < xValues.length) {
                            if (this.cells[y + coordDiff[1]][x + coordDiff[0]].isAlive) {
                                neighboursForStat.push(this.cells[y + coordDiff[1]][x + coordDiff[0]])
                                aliveNeighbours++;
                            }
                        }
                    })
                    switch (aliveNeighbours) {
                        case 2:
                            cell.isAlive ? cell.isAlive = true : cell.isAlive = false;
                            break;
                        case 3:
                            cell.isAlive = true;
                            break;
                        default:
                            cell.isAlive = false;
                            break;
                    }
                    // console.log(cell, neighboursForStat)
                    return cell;
                });
            }
        });
    };

    getCells = () => {
        this.cells = [];
        for (let i = 0; i < this.numberOfCellsV; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.numberOfCellsG; j++) {
                this.cells[i][j] = new Cell(Math.random() > 0.5 ? true : false, i, j);
            }
        }
    };

    draw = () => {
        this.cells.forEach((xValues, y) => {
            if (xValues) {
                xValues.forEach((e, x) => {
                    if (this.cells[y][x].isAlive) {
                        this.ctx.beginPath();
                        this.ctx.fillRect(this.widthOfCell * x * 1.1, this.widthOfCell * y * 1.1, this.widthOfCell, this.widthOfCell);
                    }
                });
            }
        });
    };

    getNumberOfCells = (cellWidth, length) => (length - length % cellWidth * 1.1) / (cellWidth * 1.1);
}