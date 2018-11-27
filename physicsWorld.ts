class PhysicsWorld{

    gravity:Vector = new Vector(0,9.8 * 40)
    physicsBodys:PhysicsBody[] = []
    collisionMatrix:number[][]

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
            var scaledVel = body.vel.c().scale(dt)
            var raycastedVel = this.boxcast(body.rect,scaledVel)
            body.pos = body.pos.c().add(raycastedVel)
        }
    }

    boxcast(origin:Rect,dir:Vector):Vector{
        var corners = [
            origin.getPoint(new Vector(0,0)),
            origin.getPoint(new Vector(1,0)),
            origin.getPoint(new Vector(1,1)),
            origin.getPoint(new Vector(0,1)),
        ]

        

        var res:number[] = [1]
        for(var corner of corners){
            var result = this.raycast(corner,dir)
            if(result.hit){
                res.push(result.relpos)
            }
        }
        var smallest = res[findbestIndex(res,v => -v)]
        return dir.scale(smallest)
    }

    raycast(origin:Vector,dir:Vector):RaycastResult{
        var start = origin.c()
        var end = start.c().add(dir)

        var locations = this.gridTraversal(start,end)

        var result = new RaycastResult(false,1)
        var tempRect = new Rect(new Vector(0,0), new Vector(0,0))
        var tempOut:[number,number] = [0,0]
        
        for(var loc of locations){
            if(!this.isOccupied(loc)){
                continue
            }
            this.getRect(loc,tempRect)
            if(tempRect.collideLine(start,end,tempOut)){
                result.hit = true
                if(tempOut[0] < result.relpos){
                    result.relpos = tempOut[0]
                }
            }
            break
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

    gridTraversal(start:Vector,end:Vector):Vector[]{
        var floor = (arr, i) => arr[i] = Math.floor(arr[i])
        var current = start.c().div(this.blockSize)
        var endscaled = end.c().div(this.blockSize)
        var result:Vector[] = []
        var diagonalDistance = Math.floor(Math.max(...current.to(endscaled).map((arr,i) => arr[i] = Math.abs(arr[i])).vals))
        for(var i = 0; i <= diagonalDistance; i++){
            var t = diagonalDistance == 0 ? 0 : i / diagonalDistance;
            result.push(current.lerp(endscaled,t).map(floor)) 
        }
        return result
    }
}

class RaycastResult{

    constructor(public hit:boolean,public relpos:number){

    }
}