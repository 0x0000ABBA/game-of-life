const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

const gridWidth = canvas.clientWidth;
const gridHeight = canvas.clientHeight;

const grid = new Grid(gridWidth, gridHeight, ctx)


