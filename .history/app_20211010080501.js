
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
const { Engine, World, Runner, Render, Bodies, Body, Events} = Matter;

//====== Config Variables
let n = 0;
const cellsHorizontal = 6 + n;
const cellsVertical = 4 + n;
const width = window.innerWidth;
const height = window.innerHeight;
const wallsThickness = 5;
const boarderThickness = 10;
const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const engine = Engine.create();
    //Turn off gravity
    engine.world.gravity.y = 0;
const {world} = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width,
        height
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);

//====== Walls of Canvas
const walls = [
    Bodies.rectangle(width / 2, 0, width, boarderThickness, {isStatic: true}),
    Bodies.rectangle(width, height / 2, boarderThickness, height, {isStatic: true}),
    Bodies.rectangle(width / 2, height, width, boarderThickness, {isStatic: true}),
    Bodies.rectangle(0, height / 2, boarderThickness, height, {isStatic: true})
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

const grid = Array(cellsHorizontal).fill(null).map(()=> Array(cellsVertical).fill(false));
const verticals = Array(cellsVertical).fill(null).map(()=> Array(cellsHorizontal - 1).fill(false));
const horizontals = Array(cellsVertical - 1).fill(null).map(()=> Array(cellsHorizontal).fill(false));

startRow = Math.floor(Math.random() * cellsVertical);
startColumn  = Math.floor(Math.random() * cellsHorizontal);

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
        if(nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal) {
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
console.log(verticals);
console.log(horizontals);

horizontals.forEach((row, rowIndex) => {
    row.forEach((open, colIndex) => {
        if (open){
            return;
        }

        const wall = Bodies.rectangle(colIndex * unitLengthX + unitLengthX / 2, rowIndex * unitLengthY + unitLengthY, unitLengthX, wallsThickness, 
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'magenta'
                }
            });
        World.add(world, wall);
    });
});

verticals.forEach((row, rowIndex) => {
    row.forEach((open, colIndex) => {
        if (open){
            return;
        }
        const wall = Bodies.rectangle(colIndex * unitLengthX + unitLengthX, rowIndex * unitLengthY + unitLengthY / 2, wallsThickness, unitLengthY, 
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'magenta'
                }
            });
        World.add(world, wall);
    });
});

//====== Goal & Player Piece
const radius = Math.min(unitLengthX, unitLengthY) / 4;
const goal =Bodies.circle(width - unitLengthX / 2, height - unitLengthY / 2, radius, 
    {
        label: 'goal',
        isStatic: true,
        render: {
            fillStyle: 'red'
        }
    });
const playerPiece =Bodies.circle(unitLengthX / 2, unitLengthY / 2, radius,
    {
        label: 'player',
        render: {
            fillStyle: 'blue'
        }
    });

World.add(world, goal);
World.add(world, playerPiece);

//====== Player Controls
document.addEventListener('keydown', event => {
    const { x, y } = playerPiece.velocity;
    if(event.keyCode === 87) {
        Body.setVelocity(playerPiece, { x, y: y - 5 });
    }
    if(event.keyCode === 68) {
        Body.setVelocity(playerPiece, { x: x + 5, y });
    }
    if(event.keyCode === 83) {
        Body.setVelocity(playerPiece, { x, y: y + 5 });
    }
    if(event.keyCode === 65) {
        Body.setVelocity(playerPiece, { x: x - 5, y });
    }
})

//====== Win Condition
const

Events.on(engine, 'collisionStart', event => {
    event.pairs.forEach((collision) => {
        const label = ['goal', 'player'];
        if( label.includes(collision.bodyA.label) && label.includes(collision.bodyB.label)) {
            world.gravity.y = 1;
            world.bodies.forEach((body) => {
                if(body.label === 'wall') {
                    Body.setStatic(body, false);
                }
            })



            setTimeout(() => {
                location.reload();
            }, 3000)
            
        }
    });
});



//======