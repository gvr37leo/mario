/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/rect3x/rect.ts" />
/// <reference path="node_modules/eventsystemx/EventSystem.ts" />
/// <reference path="physicsbody.ts" />
/// <reference path="physicsWorld.ts" />

//voor mario is nodig

//physicsworld met bodys
//isGrounded
//ray en boxcasting collisions en still and moving cast


//camera
//sprite en animaties
//keybindings
//mario/player class
//enemy class




var crret = createCanvas(500,500)
var canvas = crret.canvas
var ctxt = crret.ctxt

loop((dt) => {
    ctxt.clearRect(0,0,500,500)

    ctxt.fillRect(10,10,10,10)
})
