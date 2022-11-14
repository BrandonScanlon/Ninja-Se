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

    /** Determines if any piece in the puzzle covers given coordinate. */
    isCovered(coord) {
        let idx = this.tile.findIndex(piece => piece.contains(coord));
        
        // if we found a piece that covers coordinate, return true; otherwise false.
        return idx >= 0; 
    }
    
    availableMoves(level, doorList, ninjase) {
        let moves = [];

        // Can we move left?
        let available = false;
        
        
        if(ninjase.column > 0) {
            available = true;
            for(let i = 0; i < doorList.length; i++) {
                let door = doorList[i];
                if(door.row === ninjase.row && door.column === ninjase.column - 1){
                    available = false;
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
                moves.push("Left");
             }
        

        // Can we move right?
        available = false;
        if(ninjase.column < this.numColumns-1) {
            available = true;
            for(let i = 0; i < doorList.length; i++) {
                let door = doorList[i];
                if(door.row === ninjase.row && door.column === ninjase.column + 1){
                    available = false;
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
            moves.push("Right");
        }

        // Can we move up?
        available = false;
        if(ninjase.row > 0) {
            available = true;
            for(let i = 0; i < doorList.length; i++) {
                let door = doorList[i];
                if(door.row === ninjase.row - 1 && door.column === ninjase.column){
                    available = false;
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
            moves.push("Up");
        }

        // Can we move down?
        available = false;
        if(ninjase.row +1 < this.numRows) {
            available = true;
            for(let i = 0; i < doorList.length; i++) {
                let door = doorList[i];
                if(door.row === ninjase.row + 1 && door.column === ninjase.column){
                    available = false;
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
            moves.push("Down");
        }
        
        if(doorList === null){
            alert("You have completed this level!");
        }

        return moves;
    }

    onKey(level, keyList) {
        let onAKey = false;
        keyList.forEach(key => {
            if(level.ninjase.row === key.row &&  level.ninjase.column === key.column){
                onAKey = true;
            }
        })
        return onAKey;
    }

    nearDoor(level, doorList, currentKey) {
        let nearDoor = false;
        doorList.forEach(door => {
            if(door.color === currentKey){
                if(level.ninjase.row === (door.row+1) &&  level.ninjase.column === door.column){ /** UP */
                    nearDoor = true;
                } else if(level.ninjase.row === (door.row-1) &&  level.ninjase.column === door.column){ /** DOWN */   
                    nearDoor = true;
                } else if(level.ninjase.row === door.row && level.ninjase.column === (door.column+1)){ /** LEFT */
                    nearDoor = true;
                } else if(level.ninjase.row === door.row && level.ninjase.column === (door.column-1)){ /** RIGHT */
                    nearDoor = true;
                }
            }
        })
        return nearDoor;
    }

    copy() {
        let p = new Tile(this.width, this.height, this.isWinner, this.label);
        p.place(this.row, this.column);
        return p;
    }
    clone() {
        let copy = new Tile(this.numRows, this.numColumns);
        return copy;
    }
}

export class NinjaSe {
    constructor(level){
       this.initialize(level);
    }
    initialize(level){
        this.startingRow = level.ninjase.row;
        this.startingColumn = level.ninjase.column;
    }
}

export class Key {
    constructor(row, column, color) {
        this.initialize(row, column, color);
    }
    initialize(row, column, color) {
        this.row = row;
        this.column = column;
        this.color = color;
    }
}

export class Door {
    constructor(row, column, color) {
        this.initialize(row, column, color);
    }
    initialize(row, column, color) {
        this.row = row;
        this.column = column;
        this.color = color;
        this.unlocked = false;
    }
}

// Model knows the level (you need 3). Knows the Tile
export class Model {
    constructor(level) {
        this.initialize(level);
        this.level = level;
    }

    initialize(level) {
        let numRows = level.rows;
        let numColumns = level.columns
        this.numMoves = 0;
        this.tile = new Tile(numRows, numColumns);
        this.victory = false;
        this.keyList = [];
        this.doorList = [];
        this.currentKey = null;
        this.startRow = level.start.row;
        this.startColumn = level.start.column;
        level.keys.forEach(key => {
            this.keyList.push(new Key(key.row, key.column, key.color));
        })
        level.doors.forEach(door => {
            this.doorList.push(new Door(door.row, door.column, door.color));
        })
        
    }

    updateMoveCount() {
        this.numMoves += 1;
    }

    copy() {
        let m = new Model(this.level);                 
        m.numRows = this.numRows;
        m.numColumns = this.numColumns;
        m.numMoves = this.numMoves;
        m.tile = this.tile.clone();
        m.victory = this.victory;
        m.keyList = this.keyList;
        m.doorList = this.doorList;
        m.currentKey = this.currentKey;
        m.tempKey = this.tempKey
        m.startRow = this.startRow;
        m.startColumn = this.startColumn;
        return m;
    }

    available(direction) {
        let allMoves = this.tile.availableMoves(this.level, this.doorList, this.level.ninjase);
        return allMoves.includes(direction);
    }

    availableKey() {
        let onKey = this.tile.onKey(this.level, this.keyList);
        return onKey;
                
    }

    availableDoor(currentKey) {
        let nearDoor = this.tile.nearDoor(this.level, this.doorList, this.currentKey);
        return nearDoor;
    }
}