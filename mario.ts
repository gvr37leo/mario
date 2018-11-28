

class Mario{
    speed:number = 400
    jumpforce:number = -500
    health:number = 3
    sprite:Sprite

    constructor(public physicsBody:PhysicsBody){

    }

    draw(ctxt:CanvasRenderingContext2D){
        this.physicsBody.draw(ctxt)
    }
}