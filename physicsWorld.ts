class PhysicsWorld{

    gravity:Vector = new Vector(0,9.8 * 40)
    physicsBodys:PhysicsBody[] = []
    collisionMatrix:number[][]

    constructor(public grid:number[][], public blockSize:Vector){

    }

    update(dt:number){
        for(var body of this.physicsBodys){
            
            body.vel.add(body.acc.c().add(this.gravity).scale(dt))

            var scaledVel = body.vel.c().scale(dt)

            var raycastedVel = this.boxcast(body.rect,scaledVel)


            body.pos = body.pos.c().add(raycastedVel)


        }
    }

    raycast(origin:Vector,dir:Vector):RaycastResult{
        var start = origin.c()
        var end = start.c().add(dir)
        
    }

    boxcast(origin:Rect,dir:Vector):Vector{
        var corners = [
            origin.getPoint(new Vector(0,0)),
            origin.getPoint(new Vector(1,0)),
            origin.getPoint(new Vector(1,1)),
            origin.getPoint(new Vector(0,1)),
        ]

        

        var res:number[] = []
        for(var corner of corners){
            var result = this.raycast(corner,dir)
            if(result.hit){
                res.push(result.relpos)
            }
        }
        var smallest = res[findbestIndex(res,v => -v)]
        return dir.scale(smallest)
    }

}

class RaycastResult{

    constructor(public hit:boolean,public relpos:number){

    }
}