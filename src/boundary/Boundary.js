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



//Scaling constants for Canvas
var BOXSIZE = 100;
const OFFSET = 4;

/** Represents a Tile. */
export class Square {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
}

export function computeTile(cell) {
    return new Square(BOXSIZE*cell.column + OFFSET,
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
                cell = model.tile.cells[r][c]
                tile = computeTile(cell)           
                
                /** DRAW ALL WHITE */
                ctx.beginPath()
                ctx.lineWidth = 4
                ctx.fillStyle = "white"
                ctx.fillRect(tile.x, tile.y, tile.size, tile.size)
                ctx.rect(tile.x, tile.y, tile.size, tile.size)
                ctx.stroke()

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
                model.doorList.forEach(door => {
                    if(door.row === r && door.column === c){
                        const doorWidth = 97;
                        const doorHeight = 97;
                        let image = new Image();
                        if(door.color === "red" && model.doorList.includes(door.color)) {
                            model.doorList.push(door.color);
                            image.src = redDoor;
                            image.onload = function() {
                            ctx.drawImage(image, door.column*100, door.row*100, doorWidth, doorHeight);
                            }
                        
                        }
                        if(door.color === "green" && model.doorList.includes(door.color)) {
                            model.doorList.push(door.color);
                            image.src = greenDoor;
                            image.onload = function() {
                            ctx.drawImage(image, door.column*100, door.row*100, doorWidth, doorHeight);
                            }
                        }
                        if(door.color === "blue" && model.doorList.includes(door.color)) {
                            model.doorList.push(door.color);
                            image.src = blueDoor;
                            image.onload = function() {
                            ctx.drawImage(image, door.column*100, door.row*100, doorWidth, doorHeight);
                            }
                        }
                        if(door.color === "yellow" && model.doorList.includes(door.color)) {
                            model.doorList.push(door.color);
                            image.src = yellowDoor;
                            image.onload = function() {
                            ctx.drawImage(image, door.column*100, door.row*100, doorWidth, doorHeight);
                            }
                        }
                    }
                })
                  /** DRAW DOORS */
                  model.doorList.forEach(door => {
                    if(door.row === r && door.column === c){
                        let image = new Image();
                        if(door.color === "red") {
                            image.src = redDoor;
                            image.onload = function() {
                            ctx.drawImage(image,(door.column*100)+4, (door.row*100)+4, 92, 92);
                            }
                        } else if(door.color === "green") {
                            image.src = greenDoor;
                            image.onload = function() {
                            ctx.drawImage(image,(door.column*100)+4, (door.row*100)+4, 92, 92);
                            }
                        } else if(door.color === "blue") {
                            image.src = blueDoor;
                            image.onload = function() {
                            ctx.drawImage(image,(door.column*100)+4, (door.row*100)+4, 92, 92);
                            }
                        } else if(door.color === "yellow") {
                            image.src = yellowDoor;
                            image.onload = function() {
                            ctx.drawImage(image,(door.column*100)+4, (door.row*100)+4, 92, 92);
                            }
                        } 
                    }    
                  })
                    
                /** DRAW KEYS */
                for(let i = 0; i < model.keyList.length; i++){
                    if(model.keyList[i].row === r && model.keyList[i].column === c){
                        let image = new Image();
                        if(model.keyList[i].color === "red") {
                            image.src = redKey;
                            image.onload = function() {
                            ctx.drawImage(image,(model.keyList[i].column*100)+4, (model.keyList[i].row*100)+4, 92, 92);
                            }
                        } else if(model.keyList[i].color === "green") {
                            image.src = greenKey;
                            image.onload = function() {
                            ctx.drawImage(image,(model.keyList[i].column*100)+4, (model.keyList[i].row*100)+4, 92, 92);
                            }
                        } else if(model.keyList[i].color === "blue") {
                            image.src = blueKey;
                            image.onload = function() {
                            ctx.drawImage(image,(model.keyList[i].column*100)+4, (model.keyList[i].row*100)+4, 92, 92);
                            }
                        } else if(model.keyList[i].color === "yellow") {
                            image.src = yellowKey;
                            image.onload = function() {
                            ctx.drawImage(image,(model.keyList[i].column*100)+4, (model.keyList[i].row*100)+4, 92, 92);
                            }
                        } 
                    }
                }
                /** DRAW NINJA-SE */
                if(model.currentKey === 'red') {
                    let image = new Image();
                    image.src = redSe;
                    image.onload = function() {
                    ctx.drawImage(image,(model.level.ninjase.column*100)+4, (model.level.ninjase.row*100)+4, 92, 92);
                    }
                } else if(model.currentKey === 'green') {
                    let image = new Image();
                    image.src = greenSe;
                    image.onload = function() {
                    ctx.drawImage(image,(model.level.ninjase.column*100)+4, (model.level.ninjase.row*100)+4, 92, 92);
                    }
                } else if(model.currentKey === 'blue') {
                    let image = new Image();
                    image.src = blueSe;
                    image.onload = function() {
                    ctx.drawImage(image,(model.level.ninjase.column*100)+4, (model.level.ninjase.row*100)+4, 92, 92);
                    }
                } else if(model.currentKey === 'yellow') {
                    let image = new Image();
                    image.src = yellowSe;
                    image.onload = function() {
                    ctx.drawImage(image,(model.level.ninjase.column*100)+4, (model.level.ninjase.row*100)+4, 92, 92);
                    }
                } else if(r === model.level.ninjase.row && c === model.level.ninjase.column && model.currentKey === null) {
                    let image = new Image();
                    image.src = ninjase;
                    image.onload = function() {
                    ctx.drawImage(image,(model.level.ninjase.column*100)+4, (model.level.ninjase.row*100)+4, 92, 92);
                    }
                }
            }        
       }
}

export function updateTiles(ctx, model) {

}

/** Redraw entire canvas from moddel/ */
export function redrawCanvas(model, canvasObj, appObj, key) {
    const ctx = canvasObj.getContext('2d');
    if(ctx === null){ return; } //Testing purposes
  
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);

    if(model.level) {
        //Showing outermost information
        drawTiles(ctx, model, model.keyList, model.doorList);    
    }
}