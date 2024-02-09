class PathFinder {
    constructor(gridMap, srcPos, destPos) {
        this.gridMap = gridMap;
        this.srcPos = srcPos;
        this.destPos = destPos;
        this.maxRows = gridMap.length;
        this.maxCols = gridMap[0].length;
        this.direction = [ 
            [0, 1], [1, 0], [-1, 0], [0, -1]    
        ]
        this.visited = new Array(this.maxRows).fill(null).map(() => new Array(this.maxCols).fill(false));
        this.nodes = [];
        this.path = new Array(this.maxRows).fill(null).map(() => new Array(this.maxCols).fill(null));
        this.pathLength = 0;
    }

    isValidPosition(newDirX, newDirY) {
        if (
            ((newDirX < this.maxRows) && (newDirY < this.maxCols)) &&
            ((newDirX >= 0) && (newDirY >= 0)) &&
            !this.visited[newDirX][newDirY] &&
            this.gridMap[newDirX][newDirY] != 1
        ) return true;
        return false;
    }

    BFSTraversal() {
        const [startRow, startCol] = this.srcPos; 
        this.nodes.push(this.srcPos);
        this.visited[startRow][startCol] = true;

        while (this.nodes.length > 0) {
            const [srcRow, srcCol] = this.nodes.shift();

            if (srcRow === this.destPos[0] && srcCol === this.destPos[1]) {
                const result = this.constructPath(this.destPos);
                this.reset();
                return result;
            }
            
            for (let i = 0; i < this.direction.length; i++) {
                const [dirX, dirY] = this.direction[i];
                const newDirX = srcRow + dirX;
                const newDirY = srcCol + dirY;

                if (this.isValidPosition(newDirX, newDirY)) {
                    this.visited[newDirX][newDirY] = true;
                    this.nodes.push([newDirX, newDirY]);
                    this.path[newDirX][newDirY] = [srcRow, srcCol];
                }
            }
        }
        this.reset();
        return null;
    }

    DFSTraversal() {
        this.nodes.push(this.srcPos);
        
        while (this.nodes.length > 0) {
            const [srcRow, srcCol] = this.nodes.pop();
            if (!this.visited[srcRow][srcCol])
                this.visited[srcRow][srcCol]  = true;
            if (srcRow === this.destPos[0] && srcCol === this.destPos[1]) {
                const result = this.constructPath(this.destPos);
                this.reset();
                return result;
            }
    
            for (let i = 0; i < this.direction.length; i++) {
                const [dirX, dirY] = this.direction[i];
                const newDirX = srcRow + dirX;
                const newDirY = srcCol + dirY;
                if (this.isValidPosition(newDirX, newDirY)) {
                    this.nodes.push([newDirX, newDirY]);
                    this.path[newDirX][newDirY] = [srcRow, srcCol]; // Add this line
                }
            }
        }
        return null;
    }

    constructPath(destPos) {
        const path = [];
        let [row, col] = destPos;
        while (this.path[row][col] != null) {
            path.unshift([row, col]);
            [row, col] = this.path[row][col];
            this.pathLength++;
        }
        path.unshift(this.srcPos);
        this.pathLength++;
        return {path: path, pathLength: this.pathLength};
    }

    reset() {
        this.visited = new Array(this.maxRows).fill(null).map(() => new Array(this.maxCols).fill(false));
        this.nodes = [];
        this.path = new Array(this.maxRows).fill(null).map(() => new Array(this.maxCols).fill(null));
        this.pathLength = 0;
    }
}

maze = [
    [0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0],
    [1, 1, 0, 1, 0],
    [1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0]
]

const [srcPos, destPos] = [ [0, 0], [4, 4] ]
const pathfinder = new PathFinder(maze, srcPos, destPos);
const BFSPath = pathfinder.BFSTraversal(maze, srcPos, destPos);
const DFSPath = pathfinder.DFSTraversal(maze, srcPos, destPos);
console.log('BFS: ', BFSPath);
console.log('DFS: ', DFSPath);