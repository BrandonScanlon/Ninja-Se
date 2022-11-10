export function movePiece(model, direction) {
    let selected = model.puzzle.selected;
    if (!selected) { return model; }

    if (model.puzzle.hasWon() && direction === model.puzzle.finalMove) {
        model.puzzle.pieces = model.puzzle.pieces.filter(p => p !== selected);
        model.puzzle.selected = null;  // GONE!
        model.victorious();
    } else {
        selected.move(direction);
    }

    model.updateMoveCount(+1);
    return model.copy();
}