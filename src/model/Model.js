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

export class Coordinate {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
}
export class Tile {
    constructor(numRows, numColumns) {
        this.numRows = numRows;
        this.numColumns = numColumns;

        this.cells = []
        for(let r = 0; r < numRows; r++) {
            this.cells[r] = [];
            for(let c = 0; c < 5; c++) {
                this.cells[r][c] = new Coordinate(r, c);
            }
        }
    }

    place(row, col) {
        this.row = row;
        this.column = col;
    }
    
    move(direction) {
        this.row += direction.deltar;
        this.column += direction.deltac;
    }
    
    location() {
        return new Coordinate(this.row, this.column);
    }
    
    // return all coordinates for this piece
    *coordinates() {
        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                yield new Coordinate(this.row + r, this.column + c);
            } 
        }
    }
    
    contains(coord) {
        let cs = [...this.coordinates()];   // javascript one liner.... turn all of those yield into a list.
        for (let c of cs) {
            if (c.row === coord.row && c.column === coord.column) { 
                return true; 
            } 
        }
        
        return false;
    }
    
    // used for solving
    copy() {
        let p = new Tile(this.width, this.height, this.isWinner, this.label);
        p.place(this.row, this.column);
        return p;
    }
    clone() {
        let copy = new Tile(this.numRows, this.numColumns);
        copy.cells = [];
        for (let c of this.cells) {
            let dup = c.copy();
            copy.cells.push(dup);
        }
        
        return copy;
    }
}

// Model knows the level (you need 3). Knows the Tile
export class Model {

    constructor(level) {
        this.level = level;

        let numRows = level.rows;
        let numColumns = level.columns
        this.numMoves = 0;
        this.Tile = new Tile(numRows, numColumns);
        this.victory = false;
    }

    updateMoveCount(delta) {
        this.numMoves += delta;
    }

    copy() {
        let m = new Model(this.level);                 
        m.level = this.level.clone();
        m.numRows = this.numRows;
        m.numColumns = this.numColumns;
        m.victory = this.victory;
        return m;
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
}