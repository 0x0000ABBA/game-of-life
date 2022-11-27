class Grid {
    cells;
    width;
    height;
    generation;
    numberOfCellsV;
    numberOfCellsG;
    ctx;
    widthOfCell;

    constructor(width, height, ctx, generation = 0, cells, widthOfCell = 100) {
        this.width = width;
        this.height = height;
        this.generation = generation;
        this.ctx = ctx;
        this.widthOfCell = widthOfCell;

        if (cells) {
            this.cells = cells;
            return;
        }
        this.cells = [];
        this.numberOfCellsG = this.getNumberOfCells(widthOfCell, this.width);
        this.numberOfCellsV = this.getNumberOfCells(widthOfCell, this.height);

        this.getCells();
        this.draw();

        setInterval(()=> {
            this.getNewGenerationOfCells();
            this.draw();
            console.log("new gen")
            console.log(this.cells)
        }, 1000)
    };

    getNewGenerationOfCells = () => {
        const neighbours = [
            [-1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
            [-1, -1],
            [-1, 0]
        ];
        this.cells = this.cells.map((xValues, y) => {
            if (xValues) {
                xValues.map((cell, x) => {
                    let aliveNeighbours = 0;
                    neighbours.forEach(coords => {
                        if (y + coords[0] < this.cells.length && y + coords[0] > 0 && x + coords[1] > 0 && x + coords[1] < xValues.length) {
                            console.log(this.cells[y + coords[0]][x + coords[1]].isAlive)
                            if (this.cells[y + coords[0]][x + coords[1]].isAlive) {
                                aliveNeighbours++;
                            }
                        }
                    })
                    switch (aliveNeighbours) {
                        case 2:
                            if (cell.isAlive) cell.isAlive = true;
                            break;
                        case 3:
                            cell.isAlive = true;
                            break;
                        default:
                            cell.isAlive = false;
                            break;
                    }
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
                this.cells[i][j] = new Cell(true, i, j);
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

    getNumberOfCells = (cellWidth, length) => (length - length % cellWidth * 1.1) / cellWidth * 1.1;
}