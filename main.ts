/// <reference path="utils.ts" />
/// <reference path="vector.ts" />
/// <reference path="rect.ts" />
/// <reference path="node_modules/eventsystemx/EventSystem.ts" />
/// <reference path="physicsbody.ts" />
/// <reference path="physicsWorld.ts" />
/// <reference path="mario.ts" />
/// <reference path="sprite.ts" />
/// <reference path="camera.ts" />
/// <reference path="scene.ts" />
/// <reference path="keymapper.ts" />



//voor mario is nodig

//physicsworld met bodys
//isGrounded
//ray en boxcasting collisions en still and moving cast


//camera
//sprite en animaties
//keybindings
//mario/player class
//enemy class
var screensize = new Vector(1600,500)
var crret = createCanvas(screensize.x,screensize.y)
var canvas = crret.canvas
var ctxt = crret.ctxt
var camera = new Camera(new Vector(0,0), new Vector(1,1))
enum Layers{Player,Enemies,Triggers}
var world = new PhysicsWorld([
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

], new Vector(50,50),[
    [0,1,0],
    [1,0,0],
    [1,0,0],
])
var mario = new Mario(new PhysicsBody(Rect.fromSize(new Vector(0,0), new Vector(50,50)),Layers.Player))
world.addPhysicsBody(mario.physicsBody)

var endlevelTrigger = new PhysicsBody(Rect.fromSize(new Vector(100,300), new Vector(50,50)),Layers.Triggers)
endlevelTrigger.gravity.overwrite(Vector.zero)
world.addPhysicsBody(endlevelTrigger)

endlevelTrigger.onCollission.listen(col => {
    col.onEnter.listen(() => {
        currentscene = secondScene
    })
})

var mainscene = new Scene(dt => {
    ctxt.setTransform(1,0,0,1,0,0)
    ctxt.clearRect(0,0,screensize.x,screensize.y)
    ctxt.setTransform(camera.scale.x,0,0,camera.scale.y,-camera.pos.x,-camera.pos.y)

    mario.beforeWorldUpdate(dt)
    world.update(dt)
    mario.afterWorldUpdate(dt)
    
    endlevelTrigger.rect.draw(ctxt)
    world.draw(ctxt)
    mario.draw(ctxt)
    
})

var secondScene = new Scene(dt => {
    ctxt.setTransform(1,0,0,1,0,0)
    ctxt.clearRect(0,0,screensize.x,screensize.y)

    ctxt.fillRect(10,10,10,10)
})

var currentscene = mainscene

loop((dt) => {
    dt /= 1000
    dt = 0.016
    currentscene.loop(dt)
})
