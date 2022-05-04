function Spot(maze,i,j,wall, blocksize){
    this.gen = 0;
    this.i=i;
    this.j=j;
    this.f=0;
    this.g=0;
    this.h=0;
    this.prev = undefined;
    this.wall = wall;

    this.neightbors = [];

    this.wallRand = (difficulty)=>{
        if (random(1)<0.1*difficulty && !(this.i==maze.start.x && this.j==maze.start.y)
        && !(this.i==maze.end.x && this.j==maze.end.y) ){
            this.wall=true; //except if it is the end
    
        }
    }

    this.show = (color)=>{
        fill(color)
        stroke(0)
        rect(this.i*blocksize,this.j*blocksize,blocksize-1,blocksize-1)
        if (this.blocksizeall){
            fill(0)
            stroke(0)
            rect(this.i*blocksize,this.j*blocksize,blocksize-1,blocksize-1)
            textAlign(CENTER, CENTER);
        }
    }

    this.textShow = (thetext)=>{
        fill(50);
        text(thetext, this.i*blocksize,this.j*blocksize,blocksize-1,blocksize-1);
    }

    this.addNeighbors = (grid)=>{
        // str8 and ka8eta
        if (this.i<maze.width-1){
            this.neightbors.push(grid[this.i+1][this.j])
        }
        if (this.i>0){
            this.neightbors.push(grid[this.i-1][this.j])
        }
        if (this.j<maze.width-1){
            this.neightbors.push(grid[this.i][this.j+1])
        }
        if (this.j>0){
            this.neightbors.push(grid[this.i][this.j-1])
        }

        // diagonals
        /*
        if (this.i>0 && this.j>0){
            this.neightbors.push(grid[this.i-1][this.j-1])
        }

        if (this.i < maze.width-1 && this.j>0){
            this.neightbors.push(grid[this.i+1][this.j-1])
        }

        if (this.i<maze.width-1 && this.j<maze.width-1){
            this.neightbors.push(grid[this.i+1][this.j+1])
        }

        if (this.j < maze.width-1 && this.i>0){
            this.neightbors.push(grid[this.i-1][this.j+1])
        }
        */
        

    }
}
