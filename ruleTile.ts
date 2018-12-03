
enum AdjacenyStatus{ignore,occupied,unoccupied}

class RuleTile{
    sprites:Sprite[]
    rules:Rule[]

}

class Rule{
    spriteIndex:number
    adjacencyMatrix:AdjacenyStatus[][] = [
        [AdjacenyStatus.ignore, AdjacenyStatus.ignore, AdjacenyStatus.ignore],
        [AdjacenyStatus.ignore, AdjacenyStatus.ignore, AdjacenyStatus.ignore],
        [AdjacenyStatus.ignore, AdjacenyStatus.ignore, AdjacenyStatus.ignore],
    ]
}