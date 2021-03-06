enum Layers{Player,Enemies,Triggers}

class MainScene implements IScene{
    camera: Camera
    world: PhysicsWorld
    mario: Mario
    endlevelTrigger: PhysicsBody
    tileMaps: TileMap[]
    
    onLoad() {
        this.camera = new Camera(new Vector(0,0), new Vector(1,1))
        
        this.world = new PhysicsWorld(level1, new Vector(50,50),[
            [0,1,0],
            [1,0,0],
            [1,0,0],
        ])
        this.mario = new Mario(new PhysicsBody(Rect.fromSize(new Vector(0,0), new Vector(50,50)),Layers.Player))
        this.camera.focus = this.mario.physicsBody
        this.mario.sprite = groundSprite
        this.world.addPhysicsBody(this.mario.physicsBody)

        this.endlevelTrigger = new PhysicsBody(Rect.fromSize(new Vector(100,300), new Vector(50,50)),Layers.Triggers)
        this.endlevelTrigger.gravity.overwrite(Vector.zero)
        this.world.addPhysicsBody(this.endlevelTrigger)

        this.endlevelTrigger.onCollission.listen(col => {
            col.onEnter.listen(() => {
                // sceneManager.loadScene(new SecondScene())
            })
        })

        var background = new TileMap(this.world.blockSize,[[]])
        var ground = new TileMap(this.world.blockSize,this.world.grid)
        ground.tileCache = [
            new StaticTile(airSprite),
            groundRuleTile
        ];
        groundRuleTile.grid = this.world.grid
        var foreground = new TileMap(this.world.blockSize,[[]])
        this.tileMaps = [background,ground,foreground]
    }    
    
    loop(dt: number) {
        ctxt.setTransform(1,0,0,1,0,0)
        ctxt.fillStyle = '#00e9ff'
        ctxt.fillRect(0,0,screensize.x,screensize.y)
        ctxt.fillStyle = '#000'
        
        this.mario.beforeWorldUpdate(dt)
        this.world.update(dt)
        this.mario.afterWorldUpdate(dt)
        
        this.camera.update()
        ctxt.setTransform(this.camera.scale.x,0,0,this.camera.scale.y,
            -this.camera.pos.x,
            -this.camera.pos.y,
        )
        
        this.endlevelTrigger.rect.draw(ctxt)
        // this.world.draw(ctxt)
        // graphics.load()
        for(var tileMap of this.tileMaps){
            tileMap.draw()
        }
        // graphics.flush()
        this.mario.draw(ctxt)
        this.camera.currentTarget.draw(ctxt)
    }

    onDestory() {

    }
}