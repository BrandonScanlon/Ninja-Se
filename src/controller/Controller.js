import {Up, Down, Left, Right } from '../model/Model.js';

export function moveNinja(model, direction) {
    // model.tile.move(direction)
    let ninjase = model.level.ninjase;
    if(direction === Up){
        ninjase.row -= 1;
    }
    if(direction === Down){
        ninjase.row += 1;
    }
    if(direction === Right){
        ninjase.column += 1;
    }
    if(direction === Left){
        ninjase.column -= 1;
    }
    model.updateMoveCount(+1);
    return model.copy(); //time to redraw
}