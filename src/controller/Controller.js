export function moveNinja(model, direction) {
    model.ninjase.move(model.ninjase, direction)
    model.updateMoveCount(+1);
    return model.copy(); //time to redraw
}