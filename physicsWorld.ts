class PhysicsWorld{

    gravity:Vector = new Vector(0,9.8 * 40)
    physicsBodys:PhysicsBody[] = []
    collisionMatrix:number[][]

    constructor(public grid:number[][], public blockSize:Vector){

    }

    update(dt:number){
        for(var body of this.physicsBodys){
            
            body.vel.add(body.acc.c().add(this.gravity).scale(dt))
            body.pos = body.pos.c().add(body.vel.c().scale(dt))
        }
    }

    raycast(origin:Vector,dir:Vector){

    }

    boxcast(origin:Rect,dir:Vector){

    }

}