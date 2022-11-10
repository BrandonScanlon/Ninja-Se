//redraw the Board so I can see it

//Scaling constants for Canvas
var BOXSIZE = 100;
const OFFSET = 4;

/** Represents a Tile. */
export class Tile {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
}

export function computeTile(cell) {
    return new Tile(BOXSIZE*cell.column + OFFSET,
                    BOXSIZE*cell.row + OFFSET,
                    BOXSIZE - 2*OFFSET,
                    BOXSIZE - 2*OFFSET);
}

export function drawTiles(ctx, model) {
    let numRows = model.level.rows;
    let numColumns = model.level.columns;
    let cell = null;
    let tile = null;
    let visits = 0;
    //console.log("numRows,numCols = " + numRows + ", " + numColumns)

        for(let r = 0; r < numRows; r++) {
            for(let c = 0; c < numColumns; c++) {
                cell = model.board.cells[r][c]
                tile = computeTile(cell)           
                /** DRAW ALL WHITE */
                ctx.beginPath()
                ctx.lineWidth = 4
                ctx.fillStyle = "white"
                ctx.fillRect(tile.x, tile.y, tile.size, tile.size)
                ctx.rect(tile.x, tile.y, tile.size, tile.size)
                ctx.stroke()


                /** DRAW NINJA-SE */
                if(r === model.level.ninjase.row && c === model.level.ninjase.column){
                    const ninjaSe = document.getElementById("Ninja-Se");
                    ctx.beginPath()
                    ctx.lineWidth = 4
                    ctx.fillStyle = "purple"
                    
                    // ctx.drawImage(ninjaSe, tile.x, tile.y);
                    ctx.fillRect(tile.x, tile.y, tile.size, tile.size)
                    ctx.rect(tile.x, tile.y, tile.size, tile.size)
                    ctx.stroke()
                }
                /** DRAW WALLS */
                model.level.walls.forEach(wall => {
                    //console.log("walls.row, walls.column, r, c === (" + wall.row + ", " + wall.column + ", " + r + ", " + c + ")")
                    
                    if(wall.row === r && wall.column === c){
                        console.log("HERE")
                        console.log("walls.row, walls.column, r, c === (" + wall.row + ", " + wall.column + ", " + r + ", " + c + ")")
                        visits++
                        console.log("Visits: " + visits)
                        
                        ctx.beginPath()
                        ctx.lineWidth = 4
                        ctx.fillStyle = "black"
                        ctx.fillRect(tile.x, tile.y, tile.size, tile.size)
                        ctx.rect(tile.x, tile.y, tile.size, tile.size)
                        ctx.stroke()
                    }
                })
                /** DRAW DOORS */
                model.level.doors.forEach(door => {
                    //console.log("walls.row, walls.column, r, c === (" + wall.row + ", " + wall.column + ", " + r + ", " + c + ")")
                    
                    if(door.row === r && door.column === c){
                        ctx.beginPath()
                        ctx.lineWidth = 4
                        let doorColor = String(door.color);
                        ctx.fillStyle = doorColor
                        ctx.fillRect(tile.x, tile.y, tile.size, tile.size)
                        ctx.rect(tile.x, tile.y, tile.size, tile.size)
                        ctx.stroke()
                    }
                })
                /** DRAW KEYS */
                model.level.keys.forEach(key => {
                    //console.log("walls.row, walls.column, r, c === (" + wall.row + ", " + wall.column + ", " + r + ", " + c + ")")
                    
                    if(key.row === r && key.column === c){
                        ctx.beginPath()
                        ctx.lineWidth = 4
                        let keyColor = String(key.color);
                        //if(keyColor === "red"){}
                        ctx.fillStyle = keyColor
                        ctx.fillRect(tile.x, tile.y, tile.size, tile.size)
                        ctx.rect(tile.x, tile.y, tile.size, tile.size)
                        ctx.stroke()
                    }
                })
       5}
    }
}

/** Redraw entire canvas from moddel/ */
export function redrawCanvas(model, canvasObj, appObj) {
    const ctx = canvasObj.getContext('2d');
    if(ctx === null){ return; } //Testing purposes
  
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);

    if(model.level) {
        //Showing outermost information
        drawTiles(ctx, model);    
    }
}