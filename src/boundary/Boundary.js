//redraw the Puzzle so I can see it

//Scaling constants for Canvas
var BOXSIZE = 100;
const OFFSET = 8;

/** Represents a Tile. */
export class Tile {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
}

export function computeTile(cell) {
    return new Tile(BOXSIZE*cell.column + OFFSET, BOXSIZE*cell.row + OFFSET, BOXSIZE - 2*OFFSET, BOXSIZE - 2*OFFSET);
}

/** Redraw entire canvas from moddel/ */
export function redrawCanvas(model, canvasObj) {
    const ctx = canvasObj.getContext('2d');
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);

    //Showing outermost information
    let numRows = model.puzzle.numRows;
    let numColumns = model.puzzle.numColumns;

    ctx.fillStyle = 'black'

    for(let r = 0; r < numRows; r++) {
        for(let c = 0; c < numColumns; c++) {
            let cell = model.puzzle.cells[r][c]
            let tile = computeTile(cell)

            //Here is where you draw everything about the cell
            ctx.beginPath()
            ctx.rect(tile.x, tile.y, tile.size, tile.size)
            ctx.stroke()
        }
    }
}