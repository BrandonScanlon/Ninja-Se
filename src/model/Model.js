

export class Cell {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
}
export class Board {
    constructor(numRows, numColumns) {
        this.numRows = numRows;
        this.numColumns = numColumns;

        this.cells = []
        for(let r = 0; r < numRows; r++) {
            this.cells[r] = [];
            for(let c = 0; c < 5; c++) {
                this.cells[r][c] = new Cell(r, c);
            }
        }
    }
}

// Model knows the level (you need 3). Knows the board
export class Model {

    constructor(level) {
        this.level = level;

        let numRows = level.rows;
        let numColumns = level.columns
        this.numMoves = 0;
        this.board = new Board(numRows, numColumns);
    }
}