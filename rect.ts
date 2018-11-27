
class Rect{

    constructor(public min:Vector, public max:Vector){
    
    }

    static fromSize(pos:Vector, size:Vector){
        return new Rect(pos,pos.c().add(size))
    }

    collidePoint(point:Vector){
        
        for (var i = 0; i < this.min.vals.length; i++) {
			if (!inRange(this.min.vals[i], this.max.vals[i], point.vals[i])) {
				return false;
			}
		}
		return true;
    }

    size():Vector{
        return this.min.to(this.max)
    }

    getEdge(dim:number,takeMax:boolean){
        if(takeMax){
            return this.max.vals[dim]
        }else{
            return this.min.vals[dim]
        }
    }
        
    collideLine(a:Vector,b:Vector,out:[number,number]):boolean{
        var clip1:[number,number] = [0,0]
        var clip2:[number,number] = [0,0]

        this.relIntersect(a.x,b.x, this.getEdge(0,false), this.getEdge(0,true), clip1)
        this.relIntersect(a.y,b.y, this.getEdge(1,false), this.getEdge(1,true), clip2)
        
        //result contains if the lines intersected
        var result = this.intersectLine(clip1[0],clip1[1],clip2[0],clip2[1],out)
        return result && inRange(0,1,out[0])// && inRange(0,1,out[1])
    }

    relIntersect(amin:number,amax:number,bmin:number,bmax:number,out:[number,number]){
        if(amin == amax){//this could use some work
            out[0] = -Infinity
            out[1] = Infinity
            return
        }
        var length = Math.abs(to(amin, amax))
        out[0] = Math.abs(to(amin,bmin)) / length;
        out[1] = Math.abs(to(amin,bmax)) / length;
        if(amin > amax){
            swap(out)
        }
    }

    intersectLine(amin:number,amax:number,bmin:number,bmax:number,out:[number,number]){
        var ibegin = max(amin,bmin)
        var iend = min(amax,bmax)
        out[0] = ibegin
        out[1] = iend
        if(ibegin <= iend){
            return true
        }else{
            return false
        }
    }

    collideBox(other:Rect){
        for(var i = 0; i < 2; i++){
			if(!rangeOverlap(this.min[i], this.max[i], other.min[i], other.max[i])){
				return false;
			}
		}
		return true;
    }


    getPoint(relativePos:Vector):Vector{
        return this.min.c().add(this.size().mul(relativePos))
    }

    draw(ctxt:CanvasRenderingContext2D){
       var size = this.size()
       ctxt.fillRect(this.min.x,this.min.y,size.x,size.y)
    }

    move(pos:Vector){
        var size = this.size()
        this.min = pos
        this.max = this.min.c().add(size)
    }

    loop(callback:(v:Vector)=>void){
        var temp = this.max.c()
        

        this.size().loop(v2 => {
            temp.overwrite(v2)
            temp.add(this.min)
            callback(temp)
        })
    }
}

function rangeOverlap(range1A:number,range1B:number,range2A:number,range2B:number){
    return range1A <= range2B && range2A <= range1B
}