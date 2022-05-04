

function getRandomMap(size, density){
    
    const map=' ';
    for (let i=0;i<size*size-1;i++){
        map += (Math.random()<density) ? '*' : ' ';
    };
    map+=' ';
    
   return {
        start: {x: 0, y: 0},
        end: {x: size-1, y: size-1},
        width: size,
        height: size,
        map
    }
}