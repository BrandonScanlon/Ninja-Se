export class MoveType {
    constructor(dr, dc) {
        this.deltar = dr;
        this.deltac = dc;
    }
    
    static parse(s) {
        if ((s === "down")  || (s === "Down"))   { return Down; }
        if ((s === "up")    || (s === "Up"))     { return Up; }
        if ((s === "left")  || (s === "Left"))   { return Left; }
        if ((s === "right") || (s === "Right"))  { return Right; }
        
        return NoMove;
    }
}

export const Down = new MoveType(1, 0, "down");
export const Up = new MoveType(-1, 0, "up");
export const Left = new MoveType(0, -1, "left");
export const Right = new MoveType(0, 1, "right");
export const NoMove = new MoveType(0, 0, "*");  // no move is possible

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

    updateMoveCount(delta) {
        this.numMoves += delta;
    }

    // available(direction) {
    //     // if no piece selected? Then none are available.
    //     if (direction === NoMove) { return false; }
        
    //     // HANDLE WINNING CONDITION. MUST BE AVAILABLE!
    //     if (this.puzzle.selected.row === this.puzzle.destination.row && 
    //         this.puzzle.selected.column === this.puzzle.destination.column && 
    //         this.puzzle.finalMove === direction) {
    //         return true;
    //     }

    //     let allMoves = this.puzzle.availableMoves();
    //     return allMoves.includes(direction);
    // }

    
    whichLevel(currentLevel) {
        let str = "";
        if(currentLevel === this.level){
            str = "Level 1";
            return str;
        }
        
  }
}