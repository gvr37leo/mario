

interface IGetSprite{
    getSprite(pos:Vector):Sprite
}

class RuleTile implements IGetSprite{
    
    id:number
    constructor(public sprites:Sprite[], public rules:Rule[],public grid:number[][]){

    }


    getSprite(pos:Vector):Sprite{
        for(var i = 0; i < this.rules.length;i++){
            var rule = this.rules[i]

            if(this.compliesToRule(rule,pos)){
                return this.sprites[rule.spriteIndex]
            }
        }
        return this.sprites[0]
    }

    compliesToRule(rule:Rule,pos:Vector):boolean{
        var result = true
        arraySize2D(rule.adjacencyMatrix).loop2d(v => {
            var abs = v.c().add(pos)
            var adjacencyCondition = rule.adjacencyMatrix[v.y][v.x]
            var gridValue = this.grid[abs.y][abs.x]
            if(adjacencyCondition == -1){//grey
            }else if(adjacencyCondition == -2 && gridValue == this.id){//red
                result = false
            }else if(adjacencyCondition != gridValue){//green
                result = false
            }
            if(result == false){
                v.y = 3
                v.x = 3
            }
        })
        return result
    }
}

class Rule {
    spriteIndex:number
    adjacencyMatrix:number[][] = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1],
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