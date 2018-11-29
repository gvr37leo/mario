/// <reference path="../utils.ts" />
/// <reference path="../vector.ts" />
/// <reference path="../rect.ts" />
/// <reference path="../node_modules/eventsystemx/EventSystem.ts" />
/// <reference path="../physicsbody.ts" />
/// <reference path="../physicsWorld.ts" />
/// <reference path="../mario.ts" />
/// <reference path="../sprite.ts" />
/// <reference path="../camera.ts" />
/// <reference path="../scene.ts" />


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
document.addEventListener('keydown',e => {

})

var mainscene = new Scene(dt => {
    ctxt.clearRect(0,0,screensize.x,screensize.y)
})

var currentscene = mainscene

loop((dt) => {
    dt /= 1000
    dt = 0.007
    currentscene.loop(dt)
})
