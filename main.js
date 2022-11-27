const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");


ctx.imageSmoothingEnabled = false;

const gridWidth = canvas.clientWidth;
const gridHeight = canvas.clientHeight;

const getNumberOfCells = (length, cellWidth) => (length - length % cellWidth) / cellWidth;

const numberOfCellsG = getNumberOfCells(gridWidth, 5);
const numberOfCellsV = getNumberOfCells(gridHeight, 5);

const grid = new Grid(gridWidth, gridHeight, ctx)

grid.getNewGenerationOfCells();
grid.draw();

console.log(gridHeight, gridWidth);

console.log(numberOfCellsG, numberOfCellsV)