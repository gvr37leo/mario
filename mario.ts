

class Mario{

    health:number = 3
    sprite:Sprite

    constructor(public hitbox:PhysicsBody){

    }

    draw(ctxt:CanvasRenderingContext2D){
        this.hitbox.draw(ctxt)
    }
}