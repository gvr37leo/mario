
enum AdjacenyStatus{ignore,occupied,unoccupied}

interface IGetSprite{
    getSprite(pos:Vector):Sprite
}

class RuleTile implements IGetSprite{
    
    
    constructor(public sprites:Sprite[], public rules:Rule[],public grid:number[][]){

    }


    getSprite(pos:Vector):Sprite{
        for(var i = 0; i < this.rules.length;i++){
            var rule = this.rules[i]

            if(true){
                return this.sprites[rule.spriteIndex]
            }
        }
        return this.sprites[0]
    }

}

class Rule {
    spriteIndex:number
    adjacencyMatrix:AdjacenyStatus[][] = [
        [AdjacenyStatus.ignore, AdjacenyStatus.ignore, AdjacenyStatus.ignore],
        [AdjacenyStatus.ignore, AdjacenyStatus.ignore, AdjacenyStatus.ignore],
        [AdjacenyStatus.ignore, AdjacenyStatus.ignore, AdjacenyStatus.ignore],
    ]
}

class AnimatedTile implements IGetSprite{
    
    time:number = 0

    constructor(public sprites:Sprite[], public interval:number){

    }

    update(dt:number){
        this.time += dt
    }

    getSprite(pos:Vector): Sprite {
        return this.sprites[floor(this.time / this.interval) % this.sprites.length] 
    }

}

class StaticTile implements IGetSprite{
    constructor(public sprite:Sprite){

    }

    getSprite(pos:Vector): Sprite {
        return this.sprite
    }
}