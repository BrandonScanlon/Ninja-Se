import { Key, Model } from "../model/Model";

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
    

    model.keyList.forEach(key => { //holds the original list of Key Objects 
        if(model.level.ninjase.row === key.row && model.level.ninjase.column === key.column){ //Checks if Ninja-se is on a key
            if(model.currentKey === null){ // if not holding a key
                model.currentKey = key.color; // "pickup key"

                const index = model.keyList.findIndex(key => { //find index of the key "picked up"
                    if(model.level.ninjase.row === key.row && model.level.ninjase.column === key.column){
                        return key.color === model.currentKey;
                    }
                })
                if(index > -1){ //if found
                    model.keyList.splice(index, 1); //splice, thus delete that key from the keyList (thus no rendering, etc.)
                }
            } else{  
                let tempKey = model.currentKey; // sets to current key if any 
                model.currentKey = key.color; //switch colors
                const index = model.keyList.findIndex(key => { //find index of the key "picked up"
                    if(model.level.ninjase.row === key.row && model.level.ninjase.column === key.column){
                        return key.color === model.currentKey;
                    }
                })
                if(index > -1){ //if found
                    let newKey = new Key(model.level.ninjase.row, model.level.ninjase.column, tempKey) //create a newKey at current location and held key (idea is to be the swapped key)
                    model.keyList.splice(index, 1); // delete picked up key
                    model.keyList.unshift(newKey); //push the newKey that resembles the "dropped" key in current location
                }   
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