class Camera{

    focus:PhysicsBody
    offset:Vector = screensize.c().scale(0.5).inverse()
    deadZone:Rect
    currentTarget:Vector
    constructor(public pos:Vector,public scale:Vector){
        var halfsize = screensize.c().scale(0.5)
        var slacksize = new Vector(300,100)
        this.deadZone = new Rect(halfsize.c().sub(slacksize), halfsize.c().add(slacksize))
    }

    update(){
        var trackingPoint = this.focus.rect.getPoint0Center(this.focus.vel.c().sign())
        this.currentTarget = trackingPoint
        var relpos = this.pos.to(trackingPoint)

        if(relpos.x > this.deadZone.max.x){
            this.pos.x = trackingPoint.x - this.deadZone.max.x
        }
        if(relpos.y > this.deadZone.max.y){
            this.pos.y = trackingPoint.y - this.deadZone.max.y
        }
        
        if(relpos.x < this.deadZone.min.x){
            this.pos.x = trackingPoint.x - this.deadZone.min.x
        }
        if(relpos.y < this.deadZone.min.y){
            this.pos.y = trackingPoint.y - this.deadZone.min.y
        }

    }
}