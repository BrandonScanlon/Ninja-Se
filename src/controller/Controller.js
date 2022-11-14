import { Model } from "../model/Model";
import { drawTiles } from '../boundary/Boundary.js';

export function moveNinja(model, direction) {
    let ninjase = model.level.ninjase;
    if(direction === "Up"){
        ninjase.row -= 1;
        model.numMoves += 1;
    }
    if(direction === "Down"){
        ninjase.row += 1;
        model.numMoves += 1;    
    }
    if(direction === "Right"){
        ninjase.column += 1;
        model.numMoves += 1;    
    }
    if(direction === "Left"){
        ninjase.column -= 1;
        model.numMoves += 1;    
    }
    
    return model.copy(); //time to redraw
}

export function pickupKey(model) {
    model.keyList.forEach(key => {
        if(model.level.ninjase.row === key.row && model.level.ninjase.column === key.column){
            model.currentKey = key.color;
            const index = model.keyList.findIndex(key => {
                return key.color === model.currentKey;
            })
            if(index > -1){
                model.keyList.splice(index, 1);
            }
        }
    })
    return model.copy(); //time to redraw
}

export function resetLevel(level) {
    level.ninjase.row = level.start.row; 
    level.ninjase.column = level.start.column;

    return new Model(level); //time to redraw
}

export function unlockDoor(model) {
    model.doorList.forEach(door => {
        if(model.availableDoor()){
            const index = model.doorList.findIndex(door => {
                return door.color === model.currentKey;
            })
            if(index > -1){
                model.doorList.splice(index, 1);
            }
            model.currentKey = null;
        }
    })
    console.log(model.doorList)
    if(model.doorList === null){
        alert("Victory");
    }
    return model.copy(); //time to redraw
}