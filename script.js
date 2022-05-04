console.log("m: ",maze2)

let openSet = []
let closeSet = []
let maze = maze2
let grid;

function setup(){
    

    let width=600, height=600;
    let canvas = createCanvas(width,height)
    canvas.parent("c");
    frameRate(20)

    blocksize = width/maze.width;

    loadMaze(maze,blocksize,openSet)

}

function loadMaze(maze, blocksize,openSet){
    grid = createGridFromMaze(maze, blocksize)

    start=grid[maze.start.x][maze.start.y]
    end = grid[maze.end.x][maze.end.y]

    openSet.push(start);
    background(10)


    for (let i=0;i<maze.width;i++){
        for (let j=0;j<maze.width;j++){
            grid[i][j].show(color(254))
        }
    }

}


function createGridFromMaze(maze,blocksize){
    const grid =[];

    for (let i=0;i<maze.width;i++){
        grid[i] = new Array(maze.width)
    }


    for (var i = 0; i < maze.map.length; i++) {
        const temp = maze.map.charAt(i)
        if (temp=='*'){
            // wall
            grid[Math.floor(i/maze.width)][ i%maze.width ] 
            = new Spot(maze,Math.floor(i/maze.width),i%maze.width,true, blocksize)
        }else{
            // free
            grid[Math.floor(i/maze.width)][ i%maze.width ] 
            = new Spot(maze,Math.floor(i/maze.width),i%maze.width,false, blocksize)
        }
    }

    for (let i=0;i<maze.width;i++){
            for (let j=0;j<maze.width;j++){
                console.log(i,j)
                grid[i][j].addNeighbors(grid)
        }
    }

    return grid;
}


// Painting purposes
let best=null;
let steps=0;

function draw(){

    steps++;
    // the a* path algorithm
    if(openSet.length>0){
        // keep going

        best=openSet[0]
        // find the best considerable spot
        openSet.forEach(spot=>{
            if (spot.f < best.f){
                best = spot;
            }
        })

        // check if over
        if (best==end){ // not right way to writte it bro
            console.log("Done, in ", steps, )
            console.log("Path: ", path)
            noLoop()
            return ;
        }

        // manage the best
        closeSet.push(best);
        // antikatestise me tin etimi
        openSet = openSet.filter(function(el) { return el != best; }); 

        // act on the best considerable spot
        best.neightbors.forEach(n=>{
            let gen = best.gen+1;

            // if it has not been explored, if it has -> continue
            if (!closeSet.includes(n) && !n.wall){
                let tempG = best.g+1;

                let newPath=false;
                // if it is already in
                if (openSet.includes(n)){
                    if (tempG < n.g){
                        n.g = tempG;
                        n.gen = gen;
                        newPath=true;
                    } 
                } else{
                    n.g = tempG;
                    n.gen = gen;
                    newPath=true;
                    openSet.push(n)
                }

                if (newPath){
                    n.h = heuristic(n,end);
                    n.f = n.g + n.h-n.gen;
                    n.prev = best;
                }
               
            }
        })
        if(best.neightbors[0]){
            best.neightbors-=10
        }

    }else{
        // no solution
        console.log('no solution');
        noLoop()

        return;
    }

    // find the current path
    path= []
    let temp = best;
    path.push(best)
    while (temp.prev){
        path.push(temp.prev);
        temp = temp.prev;
    }
    
    // paint the board
    for (let i=0;i<maze.width;i++){
        for (let j=0;j<maze.width;j++){
            grid[i][j].show(color(254))
        }
    }

    paintIt()
}

function paintIt(){
    openSet.forEach( spot =>{
        spot.show(color(255,255,0))
    })
    path.forEach( spot => {
        spot.show(color(255,0,0))
    })
    start.show(color(60,250,0))
    start.textShow('start')
    end.show(color(60,250,0))
    end.textShow('end')
}

function heuristic(a,b){
    return dist(a.i,a.j,b.i,b.j)
    //return Math.abs(a.i-b.i) + Math.abs(a.j-b.j);

}