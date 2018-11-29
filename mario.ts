

class Mario{
    speed:number = 400
    jumpforce:number = -500
    jumpMaxAmmo = 2
    jumpAmmo = this.jumpMaxAmmo
    health:number = 3
    sprite:Sprite

    constructor(public physicsBody:PhysicsBody){
        input.keys[Key.Space].onchange.listen(v => {
            if(v && this.jumpAmmo > 0){
                this.physicsBody.vel.overwrite(new Vector(0,this.jumpforce))
                this.jumpAmmo--
            }
        })
    }

    update(dt:number){
        if(this.physicsBody.grounded.y == 1){
            this.jumpAmmo = this.jumpMaxAmmo
        }
    }

    draw(ctxt:CanvasRenderingContext2D){
        this.physicsBody.draw(ctxt)
    }
}