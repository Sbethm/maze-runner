const { Engine, World, Runner, Render, Bodies} = Matter;

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

const shape = Bodies.rectangle(200, 200, 50, 50, {
    // isStatic: true
});

//====== Walls
const bottom = Bodies.rectangle(0, 600, 800, 50, {
    isStatic: true
});
const left = Bodies.rectangle(0, 300, 50, 600, {
    isStatic: true
});
const right = Bodies.rectangle(800, 300, 50, 600, {
    isStatic: true
});
const sky = Bodies.rectangle(0, 0, 1600, 50, {
    isStatic: true
});

World.add(world, shape);
World.add(world, bottom);
World.add(world, left);
World.add(world, right);
World.add(world, sky);