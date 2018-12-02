enum Layers{Player,Enemies,Triggers}

class MainScene implements IScene{
    camera: Camera;
    world: PhysicsWorld;
    mario: Mario;
    endlevelTrigger: PhysicsBody;
    
    onLoad() {
        this.camera = new Camera(new Vector(0,0), new Vector(1,1))
        
        this.world = new PhysicsWorld([
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
            [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
            [1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1],
            [1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

        ], new Vector(50,50),[
            [0,1,0],
            [1,0,0],
            [1,0,0],
        ])
        this.mario = new Mario(new PhysicsBody(Rect.fromSize(new Vector(0,0), new Vector(50,50)),Layers.Player))
        this.mario.sprite = groundSprite
        this.world.addPhysicsBody(this.mario.physicsBody)

        this.endlevelTrigger = new PhysicsBody(Rect.fromSize(new Vector(100,300), new Vector(50,50)),Layers.Triggers)
        this.endlevelTrigger.gravity.overwrite(Vector.zero)
        this.world.addPhysicsBody(this.endlevelTrigger)

        this.endlevelTrigger.onCollission.listen(col => {
            col.onEnter.listen(() => {
                sceneManager.loadScene(new SecondScene())
            })
        })


    }    
    
    loop(dt: number) {
        ctxt.setTransform(1,0,0,1,0,0)
        ctxt.clearRect(0,0,screensize.x,screensize.y)
        ctxt.setTransform(this.camera.scale.x,0,0,this.camera.scale.y,-this.camera.pos.x,-this.camera.pos.y)
        
        this.mario.beforeWorldUpdate(dt)
        this.world.update(dt)
        this.mario.afterWorldUpdate(dt)
        
        this.endlevelTrigger.rect.draw(ctxt)
        this.world.draw(ctxt)
        this.mario.draw(ctxt)
    }

    onDestory() {

    }
}