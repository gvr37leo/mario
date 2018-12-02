class SceneManager{
    constructor(public currentScene:IScene){
        currentScene.onLoad()
    }

    loadScene(scene:IScene){
        this.currentScene.onDestory()
        this.currentScene = scene
        scene.onLoad()
    }
}

interface IScene{
    onLoad()
    loop(dt:number)
    onDestory()
}