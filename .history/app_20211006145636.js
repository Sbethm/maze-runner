
// //====== Building Canvas
// const { Engine, World, Runner, Render, Bodies, MouseConstraint, Mouse} = Matter;

// const width = 800;
// const height = 600;

// const engine = Engine.create();
// const {world} = engine;
// const render = Render.create({
//     element: document.body,
//     engine: engine,
//     options: {
//         // wireframes: false,
//         width,
//         height
//     }
// });
// Render.run(render);
// Runner.run(Runner.create(), engine);

// World.add(world, MouseConstraint.create(engine, {
//     mouse: Mouse.create(render.canvas)
// }));

// //====== Random Shapes in Canvas
// for(let i = 0; i < 20; i++) {
//     if(Math.random() > 0.5) {
//         World.add(world, Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50));
//     } else {
//         World.add(world, Bodies.circle(Math.random() * width, Math.random() * height, 30, {
//             render: {
//                 fillStyle: 'yellow'
//             }
//         }));
//     }  
// }

// //====== Walls of Canvas
// const walls = [
//     Bodies.rectangle(400, 0, 800, 50, {isStatic: true}),
//     Bodies.rectangle(800, 300, 50, 600, {isStatic: true}),
//     Bodies.rectangle(400, 600, 800, 50, {isStatic: true}),
//     Bodies.rectangle(0, 300, 50, 600, {isStatic: true})
// ];

// World.add(world, walls);



//====== Building Canvas
const { Engine, World, Runner, Render, Bodies} = Matter;

//====== Config Variables
const cells = 3;
const width = 600;
const height = 600;

const unitLength = width / cells;

const engine = Engine.create();
const {world} = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        //wireframes: false,
        width,
        height
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);

//====== Walls of Canvas
const walls = [
    Bodies.rectangle(width / 2, 0, width, 50, {isStatic: true}),
    Bodies.rectangle(width, height / 2, 50, height, {isStatic: true}),
    Bodies.rectangle(width / 2, height, width, 50, {isStatic: true}),
    Bodies.rectangle(0, height / 2, 50, height, {isStatic: true})
];

World.add(world, walls);

//====== Maze Generation
const shuffle = (arr) => {
    let counter = arr.length;

    while(counter > 0) {
        const index = Math.floor(Math.random() * counter);
        counter--;
        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }

    return arr;
}

const grid = Array(cells).fill(null).map(()=> Array(cells).fill(false));
const verticals = Array(cells).fill(null).map(()=> Array(cells - 1).fill(false));
const horizontals = Array(cells - 1).fill(null).map(()=> Array(cells).fill(false));

startRow = Math.floor(Math.random() * cells);
startColumn  = Math.floor(Math.random() * cells);

const iteratingMazeWalls = (row, column) => {
    //If have visited cell before, return
    if(grid[row][column]) {
        return;
    }
    //Mark cell as true for having visited
    grid[row][column] = true;
    //Assembly random list of neighboring cells
    const neighbors = shuffle([
        [row - 1, column, 'up'],
        [row, column + 1, 'right'],
        [row, column - 1, 'left'],
        [row + 1, column, 'down']
    ]);

    //For each neighbor...
    for(neighbor of neighbors) {
        const [nextRow, nextColumn, direction] = neighbor;
    //See if that neighbor is out of bounds
        if(nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells) {
            continue;
        }
    //if we have visited that neighbor, continue to next neighbor
        if(grid[nextRow][nextColumn]) {
            continue;
        }
    //remove wall from either horizontals or verticals
        if(direction === 'right') {
            verticals[row][column] = true;
        } else if (direction === 'left') {
            verticals[row][column - 1] = true;
        } else if (direction === 'up') {
            horizontals[row - 1][column] = true;
        } else {
            horizontals[row][column] = true;
        }
        iteratingMazeWalls(nextRow, nextColumn);
    }
    
}

iteratingMazeWalls(startRow, startColumn);

console.log(grid);


// for(horizontal of horizontals) {
//     horizontal.forEach(() => {
//         if(false) {
            
//         }
//     })
// }

horizontals.forEach((row, rowIndex) => {
    row.forEach((open, colIndex) => {
        if (open){
            return;
        }

        const wall = Bodies.rectangle(colIndex * unitLength + unitLength / 2, rowIndex * unitLength + unitLength, unitLength, 10, {isStatic: true});
        World.add(world, wall);
    });
});

verticals.forEach((row, rowIndex) => {
    row.forEach((open, colIndex) => {
        if (open){
            return;
        }

        const wall = Bodies.rectangle( rowIndex * unitLength + unitLength, 10, unitLength, {isStatic: true});
        World.add(world, wall);
    });
});