class PhysicsBody{
    
    // move:Vector = new Vector(0,0)
    vel:Vector = new Vector(0,0)
    maxSpeed:Vector = new Vector( 400, 2000)
    minSpeed:Vector = new Vector(-400,-2000)
    acc:Vector = new Vector(0,0)
    grounded:Vector = new Vector(0,0)
    onCollission:EventSystem<Collision> = new EventSystem()
    gravity:Vector = new Vector(0,800)
    
    constructor(public rect:Rect,public layer:number){

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
    onEnter:EventSystemVoid = new EventSystemVoid()
    onHold:EventSystemVoid = new EventSystemVoid()
    onExit:EventSystemVoid = new EventSystemVoid()

    constructor(public body:PhysicsBody){

    }
}