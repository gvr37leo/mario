class PhysicsWorld{

    gravity:Vector = new Vector(0,400)
    physicsBodys:PhysicsBody[] = []
    collisionMatrix:number[][]
    skinwidth = 0.01

    constructor(public grid:number[][], public blockSize:Vector){

    }

    draw(ctxt:CanvasRenderingContext2D){
        var size = new Vector(this.grid[0].length, this.grid.length)
        size.loop2d(v => {
            if(this.grid[v.y][v.x] != 0){

                ctxt.fillRect(v.x * this.blockSize.x, v.y * this.blockSize.y, this.blockSize.x, this.blockSize.y)
            }
        })
    }

    update(dt:number){
        for(var body of this.physicsBodys){
            body.vel.add(body.acc.c().add(this.gravity).scale(dt))
            var scaledVel = body.vel.c().add(body.move).scale(dt)

            body.acc = this.gravity
            body.vel.add(body.acc.c().scale(dt))
            var dst2travelThisFrame = body.vel.c().add(body.move).scale(dt)

            for(var i = 0; i < 2; i++){
                var speed = dst2travelThisFrame.vals[i]
                var ray = new Vector(0,0)
                ray.vals[i] = speed

                var boxcastResult = this.boxcast(body.rect,ray)
                var raycastResult = boxcastResult.hitRay
                var relHitLocation = raycastResult.relLocation()
                if(raycastResult.hit){
                    body.rect.min.vals[i] += relHitLocation.vals[i]
                    body.rect.max.vals[i] += relHitLocation.vals[i]
                    body.vel.vals[i] = 0
                    body.grounded.vals[i] = Math.sign(ray.vals[i])
                }else{
                    body.rect.min.vals[i] += speed
                    body.rect.max.vals[i] += speed
                    body.grounded.vals[i] = 0
                }
            }

            // var boxresult = this.boxcast(body.rect,scaledVel)
            // body.rect.relmove(scaledVel.c().normalize().scale(Math.max(boxresult.absLength - this.skinwidth,0)))
            // if(boxresult.hit){
            //     body.acc.overwrite(Vector.zero)
            //     body.vel.overwrite(Vector.zero)
            // }
        }
    }

    boxcast(origin:Rect,dir:Vector):BoxcastResult{
        var boxresult = new BoxcastResult()
        boxresult.firedRays = []
        boxresult.hitRay = null
        boxresult.hit = false

        var center = dir.c().sign()
        var centerabs = origin.getPoint0Center(center)
        var start = origin.getPoint0Center(center.c().rot2d( 1/4 * Tau).sign());
        var end   = origin.getPoint0Center(center.c().rot2d(-1/4 * Tau).sign());
        start.add(start.to(centerabs).normalize().scale(this.skinwidth))
        end.add(end.to(centerabs).normalize().scale(this.skinwidth))

        var rayOrigins:Vector[] = [start,end]

        for(var rayOrigin of rayOrigins){
            var result = this.raycast(rayOrigin,dir)
            boxresult.firedRays.push(result)
        }
        boxresult.hitRay = findBest(boxresult.firedRays,v => -v.absLength)
        boxresult.hit = boxresult.hitRay.hit
        return boxresult
    }

    raycast(origin:Vector,dir:Vector):RaycastResult{
        var start = origin.c()
        var end = start.c().add(dir)
        var result = new RaycastResult()
        result.start = origin
        result.dir = dir

        var locations = this.gridTraversal(start,end)
        if(this.isOccupied(this.vec2flooredGridLocation(start.c()))){
            result.hit = true
            result.absLength = 0
            result.relLength = 0
            return result
        }

        result.hit = false
        result.relLength = 1
        result.absLength = dir.length()
        var tempRect = new Rect(new Vector(0,0), new Vector(0,0))
        var tempOut:[number,number] = [0,0]
        
        for(var loc of locations){
            if(!this.isOccupied(loc)){
                continue
            }else{
                this.getRect(loc,tempRect)
                if(tempRect.collideLine(start,end,tempOut)){
                    result.hit = true
                    if(tempOut[0] < result.relLength){
                        result.relLength = tempOut[0]
                        result.absLength = result.relLength * result.absLength
                    }
                }
                break
            }
        }
        return result
    }

    getRect(gridpos:Vector,out:Rect){
        out.min = gridpos.c().mul(this.blockSize)
        out.max = out.min.c().add(this.blockSize)
    }

    isOccupied(pos:Vector):boolean{
        var rect = new Rect(new Vector(0,0), new Vector(this.grid[0].length - 1, this.grid.length - 1))
        if(rect.collidePoint(pos)){
            return this.grid[pos.y][pos.x] != 0
        }else{
            return false
        }
        
    }

    vec2flooredGridLocation(v:Vector){
        return v.div(this.blockSize).floor()
    }

    gridTraversal(start:Vector,end:Vector):Vector[]{
        var current = start.c().div(this.blockSize)
        var endscaled = end.c().div(this.blockSize)
        var result:Vector[] = []
        var diagonalDistance = Math.max(...current.c().floor().to(endscaled.c().floor()).vals.map(Math.abs))
        for(var i = 0; i <= diagonalDistance; i++){
            var t = diagonalDistance == 0 ? 0 : i / diagonalDistance;
            result.push(current.lerp(endscaled,t).floor()) 
        }
        return result
    }
}

class BoxcastResult{
    public hit:boolean
    public firedRays:RaycastResult[]
    public hitRay:RaycastResult
    
    constructor(
        
    ){

    }
}

class RaycastResult{
    public hit:boolean
    public relLength:number
    public absLength:number
    public start:Vector
    public dir:Vector

    relLocation(){
        return this.dir.c().scale(this.relLength)
    }

    absLocation(){
        return this.relLocation().add(this.start)
    }

    constructor(

        ){

    }
}