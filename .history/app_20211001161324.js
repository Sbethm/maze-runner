const { Engine, World, Runner, Render, Bodies, MouseConstraint, Mouse} = Matter;

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

World.add(world, MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
}));

//====== Random Shapes
const shape = [
    Bodies.rectangle(50, 200, 50, 50),
    Bodies.rectangle(100, 200, 50, 50),
    Bodies.rectangle(120, 200, 50, 50),
    Bodies.circle(450, 200, 50, 50),
    Bodies.rectangle(430, 200, 50, 50),
    Bodies.rectangle(430, 200, 50, 50),
    Bodies.rectangle(430, 200, 50, 50),
    Bodies.rectangle(430, 200, 50, 50),
    Bodies.circle(633, 200, 50, 50),
    Bodies.rectangle(630, 200, 50, 50),
    Bodies.rectangle(630, 200, 50, 50),
    Bodies.polygon(630, 200, 50, 50, 50),
    Bodies.rectangle(630, 200, 50, 50),
    Bodies.circle(750, 200, 50, 50),
    Bodies.rectangle(200, 200, 50, 50),
    Bodies.rectangle(200, 200, 50, 50),
    Bodies.rectangle(200, 200, 50, 50),
    Bodies.rectangle(200, 200, 50, 50),
    Bodies.rectangle(200, 200, 50, 50),
]

//====== Walls
const walls = [
    Bodies.rectangle(400, 0, 800, 50, {isStatic: true}),
    Bodies.rectangle(800, 300, 50, 600, {isStatic: true}),
    Bodies.rectangle(400, 600, 800, 50, {isStatic: true}),
    Bodies.rectangle(0, 300, 50, 600, {isStatic: true})
];


World.add(world, shape);
World.add(world, walls);