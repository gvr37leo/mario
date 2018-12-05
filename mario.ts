

class Mario{
    accForce:number = 400 * 20
    passiveStopForce = this.accForce * 0.4

    jumpforce:number = 400
    jumpMaxAmmo = 1
    jumpAmmo = this.jumpMaxAmmo
    health:number = 3
    sprite:Sprite
    isWallHanging:Box<number> = new Box(0)

    constructor(public physicsBody:PhysicsBody){
        input.keys[Key.Space].onchange.listen(v => {
            if(v && (this.physicsBody.grounded.y == 1 || this.isWallHanging.get() != 0)){
                this.jump()
                // console.log(1)
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
        if(this.isWallHanging.get() != 0){
            this.physicsBody.vel.x = this.isWallHanging.get() * -1 * this.jumpforce
        }
        this.isWallHanging.set(0)
        this.physicsBody.vel.y = -1 * this.jumpforce
    }

    beforeWorldUpdate(dt:number){
        var moveinput = input.getMoveInputYFlipped()

        if(moveinput.x == this.isWallHanging.get() * -1){
            this.isWallHanging.set(0)
        }

        var accForce = this.accForce
        if(this.physicsBody.grounded.y == 0){
            accForce *= 0.3
        }
        if(moveinput.x != 0){
            this.physicsBody.vel.x += moveinput.x * accForce * dt
        }else if(this.physicsBody.grounded.y == 1){
            var stopforce = Math.sign(-this.physicsBody.vel.x) * this.passiveStopForce * dt
            var minmax = [0 ,-this.physicsBody.vel.x].sort((a,b) => a-b)
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
        this.sprite.renderer.strength = Math.sin(time - Tau / 4) * 0.5 + 0.5
        // graphics.load()
        ctxt.drawImage(this.sprite.image,this.physicsBody.rect.min.x,this.physicsBody.rect.min.y)
        // this.sprite.draw(graphics,this.physicsBody.rect.min.c().round())
        // graphics.flush()
    }
}