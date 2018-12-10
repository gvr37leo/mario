

interface ITile{
    getSprite(pos:Vector):Sprite
}

class RuleTile implements ITile{
    
    id:number
    constructor(public rules:Rule[],public grid:number[][]){

    }


    getSprite(pos:Vector):Sprite{
        for(var i = 0; i < this.rules.length;i++){
            var rule = this.rules[i]

            if(this.compliesToRule(rule,pos)){
                return rule.sprite
            }
        }
        return this.rules[0].sprite
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
    constructor(public sprite:Sprite,public adjacencyMatrix:number[][]){

    }
}

class AnimatedTile implements ITile{
    
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

class StaticTile implements ITile{
    constructor(public sprite:Sprite){

    }

    getSprite(pos:Vector): Sprite {
        return this.sprite
    }
}