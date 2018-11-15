class PhysicsBody{
    
    vel:Vector = new Vector(0,0)
    acc:Vector = new Vector(0,0)
    onCollission:EventSystem<Collision>
    layer:number
    
    constructor(public rect:Rect){

    }

    get pos():Vector{
        return this.rect.min
    }

    set pos(pos:Vector){
        this.rect.move(pos)
    }

    draw(ctxt:CanvasRenderingContext2D){
        this.rect.draw(ctxt)
    }
}

class Collision{

    body:PhysicsBody
    enter:EventSystemVoid
    hold:EventSystemVoid
    exit:EventSystemVoid
}