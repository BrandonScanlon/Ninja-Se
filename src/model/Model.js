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
    
    move(ninjase, direction) {
        ninjase.row += direction.deltar;
        ninjase.column += direction.deltac;
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

    /** Determines if any piece in the puzzle covers given coordinate. */
    isCovered(coord) {
        let idx = this.tile.findIndex(piece => piece.contains(coord));
        
        // if we found a piece that covers coordinate, return true; otherwise false.
        return idx >= 0; 
    }
    
    availableMoves(level, ninjase) {
        let moves = [];

        // Can we move left?
        let available = false;
        let openDoor = false;
        
        
        if(ninjase.column > 0) {
            available = true;
            for(let i = 0; i < level.doors.length; i++) {
                let door = level.doors[i];
                if(door.row === ninjase.row && door.column === ninjase.column - 1){
                    available = false;
                    openDoor = true;
                }
            }
            for(let i = 0; i < level.walls.length; i++) {
                let wall = level.walls[i];
                if(wall.row === ninjase.row && wall.column === ninjase.column - 1){
                    available = false;
                }
            }
        }
            if(available) {
                moves.push(Left);
             }
        

        // Can we move right?
        available = false;
        if(ninjase.column < this.numColumns) {
            available = true;
            for(let i = 0; i < level.doors.length; i++) {
                let door = level.doors[i];
                if(door.row === ninjase.row && door.column === ninjase.column + 1){
                    available = false;
                    openDoor = true;
                }
            }
            for(let i = 0; i < level.walls.length; i++) {
                let wall = level.walls[i];
                if(wall.row === ninjase.row && wall.column === ninjase.column + 1){
                    available = false;
                }
            }
        }
        if(available) {
            moves.push(Right);
        }

        // Can we move up?
        available = false;
        if(ninjase.row > 0) {
            available = true;
            for(let i = 0; i < level.doors.length; i++) {
                let door = level.doors[i];
                if(door.row === ninjase.row - 1 && door.column === ninjase.column){
                    available = false;
                    openDoor = true;
                }
            }
            for(let i = 0; i < level.walls.length; i++) {
                let wall = level.walls[i];
                if(wall.row === ninjase.row - 1 && wall.column === ninjase.column){
                    available = false;
                }
            }
        }
        if(available) {
            moves.push(Up);
        }

        // Can we move down?
        available = false;
        if(ninjase.row +1 < this.numRows) {
            available = true;
            for(let i = 0; i < level.doors.length; i++) {
                let door = level.doors[i];
                if(door.row === ninjase.row + 1 && door.column === ninjase.column){
                    available = false;
                    openDoor = true;
                }
            }
            for(let i = 0; i < level.walls.length; i++) {
                let wall = level.walls[i];
                if(wall.row === ninjase.row + 1 && wall.column === ninjase.column){
                    available = false;
                }
            }
        }
        if(available) {
            moves.push(Down);
        }
        return moves;
    }

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
        this.tile = new Tile(numRows, numColumns);
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

    available(direction) {
        if (direction === NoMove) { return false; }

        let allMoves = this.tile.availableMoves(this.level, this.level.ninjase);
        console.log(allMoves.includes(direction))
        return allMoves.includes(direction);
    }
}