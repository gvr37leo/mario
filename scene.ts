class Scene{

    onLoad:() => void
    onUnload:() => void

    constructor(public loop:(dt:number) => void){

    }

}