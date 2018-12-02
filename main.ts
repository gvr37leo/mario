/// <reference path="utils.ts" />
/// <reference path="vector.ts" />
/// <reference path="rect.ts" />
/// <reference path="node_modules/eventsystemx/EventSystem.ts" />
/// <reference path="physicsbody.ts" />
/// <reference path="physicsWorld.ts" />
/// <reference path="mario.ts" />
/// <reference path="sprite.ts" />
/// <reference path="graphics.ts" />
/// <reference path="camera.ts" />
/// <reference path="scene.ts" />
/// <reference path="keymapper.ts" />
/// <reference path="scenes/mainScene.ts" />
/// <reference path="scenes/secondScene.ts" />
/// <reference path="scenes/menuScene.ts" />



//voor mario is nodig
//camera
//sprite en animaties
//enemy class

var screensize = new Vector(1600,500)
var crret = createCanvas(screensize.x,screensize.y)
var canvas = crret.canvas
var ctxt = crret.ctxt
var graphics = new Graphics(ctxt)
var sceneManager = new SceneManager(new MainScene())
var groundSprite
start()
async function start(){
    groundSprite = await Sprite.fromString("images/ground.jpg")
    
    loop((dt) => {
        // dt /= 1000
        dt = 0.016

        sceneManager.currentScene.loop(dt)

        
    })
}


