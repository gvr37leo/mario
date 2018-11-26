/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/rect3x/rect.ts" />
/// <reference path="node_modules/eventsystemx/EventSystem.ts" />
/// <reference path="physicsbody.ts" />
/// <reference path="physicsWorld.ts" />
/// <reference path="mario.ts" />
/// <reference path="sprite.ts" />
/// <reference path="camera.ts" />
/// <reference path="scene.ts" />


//voor mario is nodig

//physicsworld met bodys
//isGrounded
//ray en boxcasting collisions en still and moving cast


//camera
//sprite en animaties
//keybindings
//mario/player class
//enemy class
var screensize = new Vector(800,500)
var crret = createCanvas(screensize.x,screensize.y)
var canvas = crret.canvas
var ctxt = crret.ctxt
var camera = new Camera(new Vector(0, 0), new Vector(1,1))
var world = new PhysicsWorld([
    [0,0,0,1],
    [0,1,0,0],
    [0,1,0,0],
    [1,1,1,1],
], new Vector(50,50))
var mario = new Mario(new PhysicsBody(new Rect(new Vector(0,0), new Vector(40,40))))
world.physicsBodys.push(mario.hitbox)

world.gridTraversal(new Vector(10,420), new Vector(300,40))

var mainscene = new Scene(dt => {
    ctxt.clearRect(0,0,screensize.x,screensize.y)
    ctxt.setTransform(camera.scale.x,0,0,camera.scale.y,-camera.pos.x,-camera.pos.y)
    world.update(dt)
    mario.draw(ctxt)

    var rect = new Rect(new Vector(10,10), new Vector(100,100))
    var out:[number,number] = [1,1]
    var iscolliding = rect.collideLine(new Vector(1,1),new Vector(120,120),out)
})

var currentscene = mainscene

loop((dt) => {
    dt /= 1000
    currentscene.loop(dt)
})
