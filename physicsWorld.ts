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

    getRect(gridpos:Vector,out:Rect){
        out.min = gridpos.c().mul(this.blockSize)
        out.max = out.min.c().add(this.blockSize)
    }

    raycast(origin:Vector,dir:Vector):RaycastResult{
        var start = origin.c()
        var end = start.c().add(dir)

        var locations = this.gridTraversal(start,end)

        var result = new RaycastResult(false,100)
        var tempRect = new Rect(new Vector(0,0), new Vector(0,0))
        var tempOut:[number,number] = [0,0]
        
        for(var loc of locations){
            this.getRect(loc,tempRect)
            if(tempRect.collideLine(start,end,tempOut)){
                result.hit = true
                if(tempOut[0] < result.relpos){
                    result.relpos = tempOut[0]
                }
            }
        }
        return result
    }

    gridTraversal(start:Vector,end:Vector):Vector[]{
        var floor = (arr, i) => arr[i] = Math.floor(arr[i])
        var current = start.c().div(this.blockSize)
        var endscaled = end.c().div(this.blockSize)
        var currentfloored = current.c().map(floor)
        var endfloored = endscaled.c().map(floor)
        var result:Vector[] = []
        var dir = current.to(endscaled)
        var step = dir.c().map((arr,i) => arr[i] = Math.sign(arr[i]))

        while(currentfloored != endfloored){
            var tMax = new Vector(0,0)
            var tDelta = new Vector(0,0)

        //     result.push(currentfloored)

        //     var xdist = (Math.ceil(current.x) - current.x) / dir.x
        //     var ydist = (Math.ceil(current.y) - current.y) / dir.y
            var bestindex = findbestIndex(tMax.vals,(dist) => -dist)
            var smallestDist = tMax.vals[bestindex]

            currentfloored.vals[bestindex] += step.vals[bestindex]
            current.add(dir.c().scale(smallestDist))

        }



        return result
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