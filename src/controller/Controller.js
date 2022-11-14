import { Model } from "../model/Model";

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
            const index = model.doorList.findIndex(door => {
                if(model.level.ninjase.row === door.row -1  && model.level.ninjase.column === door.column){
                    return door.color === model.currentKey;
                } else if(model.level.ninjase.row === door.row + 1 && model.level.ninjase.column === door.column){
                    return door.color === model.currentKey;
                } else if(model.level.ninjase.row === door.row && model.level.ninjase.column === door.column +1){
                    return door.color === model.currentKey;
                } else if(model.level.ninjase.row === door.row && model.level.ninjase.column === door.column -1){
                    return door.color === model.currentKey;
                }
            })
            // const idx = model.doorList.findIndex(function (doorList) {
            //     return model.doorList.color === model.currentKey && door.row === model.level.ninjase.row && door.column === model.level.ninjase.column;
            // })
            if(index > -1){
                if(model.level.ninjase.row === door.row -1  && model.level.ninjase.column === door.column){
                    model.doorList.splice(index, 1);
                    model.currentKey = null;
                } else if(model.level.ninjase.row === door.row + 1 && model.level.ninjase.column === door.column){
                    model.doorList.splice(index, 1);
                    model.currentKey = null;
                } else if(model.level.ninjase.row === door.row && model.level.ninjase.column === door.column +1){
                    model.doorList.splice(index, 1);
                    model.currentKey = null;
                } else if(model.level.ninjase.row === door.row && model.level.ninjase.column === door.column -1){
                    model.doorList.splice(index, 1);
                    model.currentKey = null;
                }
            }
    })
    if(model.doorList.length === 0){
        alert("You have sucessfully completed the level!")
        model.doorList.push("Victory");
    }
    model.availableDoor();
    return model.copy(); //time to redraw
}