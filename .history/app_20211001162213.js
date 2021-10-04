const { Engine, World, Runner, Render, Bodies, MouseConstraint, Mouse} = Matter;

const width = 800;
const height = 600;

const engine = Engine.create();
const {world} = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width,
        height
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);

World.add(world, MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
}));

//====== Random Shapes
for(let i = 0; i < 20; i++) {
    World.add(world, Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50));
    World.add(world, Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50));
}

//====== Walls
const walls = [
    Bodies.rectangle(400, 0, 800, 50, {isStatic: true}),
    Bodies.rectangle(800, 300, 50, 600, {isStatic: true}),
    Bodies.rectangle(400, 600, 800, 50, {isStatic: true}),
    Bodies.rectangle(0, 300, 50, 600, {isStatic: true})
];

World.add(world, walls);