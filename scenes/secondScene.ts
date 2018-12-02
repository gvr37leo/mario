
class SecondScene implements IScene{
    
    onLoad() {
        
    }    
    
    loop(dt: number) {
        ctxt.setTransform(1,0,0,1,0,0)
        ctxt.clearRect(0,0,screensize.x,screensize.y)
    
        ctxt.fillRect(10,10,10,10)
    }

    onDestory() {

    }
}