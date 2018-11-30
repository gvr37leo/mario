

class Mario{
    accForce:number = 400 * 20

    jumpforce:number = 400
    jumpMaxAmmo = 1
    jumpAmmo = this.jumpMaxAmmo
    health:number = 3
    sprite:Sprite
    isWallHanging:Box<number> = new Box(0)

    constructor(public physicsBody:PhysicsBody){

        

        input.keys[Key.Space].onchange.listen(v => {
            if(v && this.physicsBody.grounded.y == 1 || this.isWallHanging.get() != 0){
                this.jump()
            }
            else if(v && this.jumpAmmo > 0){
                this.jump()
                this.jumpAmmo--
            }
        })

        this.isWallHanging.onchange.listen(v => {
            if(v){
                this.physicsBody.vel.y = min(this.physicsBody.vel.y, 0)
            }
        })
    }

    jump(){
        
        var jumpdirection = Vector.up.c()
        if(this.isWallHanging.get() != 0){
            jumpdirection = new Vector(-this.isWallHanging.get(), -1).normalize()
        }
        this.isWallHanging.set(0)
        jumpdirection.scale(this.jumpforce)
        this.physicsBody.vel.overwrite(jumpdirection)
    }

    beforeWorldUpdate(dt:number){
        var moveinput = input.getMoveInputYFlipped()
        if(moveinput.x != 0){
            this.physicsBody.vel.x += moveinput.x * this.accForce * dt
        }else{
            var stopforce = Math.sign(-this.physicsBody.vel.x) * this.accForce * dt
            var minmax = [0 ,stopforce].sort((a,b) => a-b)
            this.physicsBody.vel.x += clamp(stopforce,minmax[0],minmax[1]) 
        }
    }

    afterWorldUpdate(dt:number){
        if(this.physicsBody.grounded.y == 1 || this.physicsBody.grounded.x != 0){
            this.jumpAmmo = this.jumpMaxAmmo
        }

        if(this.physicsBody.grounded.y == 1){
            this.isWallHanging.set(0)
        }

        if(this.physicsBody.grounded.x != 0 && this.physicsBody.grounded.y == 0){
            this.isWallHanging.set(this.physicsBody.grounded.x)
        }
    }

    draw(ctxt:CanvasRenderingContext2D){
        this.physicsBody.draw(ctxt)
    }
}