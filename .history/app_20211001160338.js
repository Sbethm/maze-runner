const { Engine, World, Runner, Render, Bodies, Mouseconstraint, Mouse} = Matter;

const engine = Engine.create();
const {world} = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);


//
const shape = Bodies.rectangle(200, 200, 50, 50, {
    // isStatic: true
});

//====== Walls
const walls = [
    Bodies.rectangle(400, 0, 800, 50, {isStatic: true}),
    Bodies.rectangle(800, 300, 50, 600, {isStatic: true}),
    Bodies.rectangle(400, 600, 800, 50, {isStatic: true}),
    Bodies.rectangle(0, 300, 50, 600, {isStatic: true})
];


World.add(world, shape);
World.add(world, walls);