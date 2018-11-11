class PhysicsBody{
    
    rect:Rect
    vel:Vector
    acc:Vector
    onCollission:EventSystem<Collision>
    layer:number
    
    constructor(){

    }
}

class Collision{

    body:PhysicsBody
    enter:EventSystemVoid
    hold:EventSystemVoid
    exit:EventSystemVoid
}