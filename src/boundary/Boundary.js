import ninjase from '../images/Ninja-Se.jpg';

import blueDoor from '../images/Blue Door.jpg';
import redDoor from '../images/Red Door.jpg';
import greenDoor from '../images/Green Door.jpg';
import yellowDoor from '../images/Yellow Door.jpg';
import blueKey from '../images/Blue Key.jpg';
import redKey from '../images/Red Key.jpg';
import greenKey from '../images/Green Key.jpg';
import yellowKey from '../images/Yellow Key.jpg';
import blueSe from '../images/Blue-Se.jpg';
import redSe from '../images/Red-Se.jpg';
import greenSe from '../images/Green-Se.jpg';
import yellowSe from '../images/Yellow-Se.jpg';

//redraw the Tile so I can see it

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

        for(let r = 0; r < numRows; r++) {
            for(let c = 0; c < numColumns; c++) {
                cell = model.Tile.cells[r][c]
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
                    let image = new Image();
                    image.src = ninjase;
                    image.onload = function() {
                    ctx.drawImage(image,(model.level.ninjase.column*100)+4, (model.level.ninjase.row*100)+4, 92, 92);
                    }
                }
                /** DRAW WALLS */
                model.level.walls.forEach(wall => {
                    if(wall.row === r && wall.column === c){
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
                    if(door.row === r && door.column === c){
                        const doorWidth = 97;
                        const doorHeight = 97;
                        if(door.color === "red") {
                            let image = new Image();
                            image.src = redDoor;
                            image.onload = function() {
                            ctx.drawImage(image, door.column*100, door.row*100, doorWidth, doorHeight);
                            }
                        
                        }
                        if(door.color === "green") {
                            let image = new Image();
                            image.src = greenDoor;
                            image.onload = function() {
                            ctx.drawImage(image, door.column*100, door.row*100, doorWidth, doorHeight);
                            }
                        }
                        if(door.color === "blue") {
                            let image = new Image();
                            image.src = blueDoor;
                            image.onload = function() {
                            ctx.drawImage(image, door.column*100, door.row*100, doorWidth, doorHeight);
                            }
                        }
                        if(door.color === "yellow") {
                            let image = new Image();
                            image.src = yellowDoor;
                            image.onload = function() {
                            ctx.drawImage(image, door.column*100, door.row*100, doorWidth, doorHeight);
                            }
                        }
                    }
                })
                /** DRAW KEYS */
                model.level.keys.forEach(key => {
                    if(key.row === r && key.column === c){
                        if(key.color === "red") {
                            let image = new Image();
                            image.src = redKey;
                            image.onload = function() {
                            ctx.drawImage(image,(key.column*100)+4, (key.row*100)+4, 92, 92);
                            }
                        }
                        if(key.color === "green") {
                            let image = new Image();
                            image.src = greenKey;
                            image.onload = function() {
                            ctx.drawImage(image,(key.column*100)+4, (key.row*100)+4, 92, 92);
                            }
                        }
                        if(key.color === "blue") {
                            let image = new Image();
                            image.src = blueKey;
                            image.onload = function() {
                            ctx.drawImage(image,(key.column*100)+4, (key.row*100)+4, 92, 92);
                            }
                        }
                        if(key.color === "yellow") {
                            let image = new Image();
                            image.src = yellowKey;
                            image.onload = function() {
                            ctx.drawImage(image,(key.column*100)+4, (key.row*100)+4, 92, 92);
                            }
                        }
                        
                        
                        
                        ctx.beginPath()
                        ctx.lineWidth = 4
                        let keyColor = String(key.color);
                        //if(keyColor === "red"){}...
                        ctx.fillStyle = keyColor
                        ctx.fillRect(tile.x, tile.y, tile.size, tile.size)
                        ctx.rect(tile.x, tile.y, tile.size, tile.size)
                        ctx.stroke()
                    }
                })
       }
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