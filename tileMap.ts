class TileMap{

    tileCache:IGetSprite[] = []
    


    constructor(public blockSize:Vector, public grid:number[][]){
        


    }

    draw(){

        var size = arraySize2D(this.grid)
        size.loop2d(v => {
            var ruletile = this.tileCache[this.grid[v.y][v.x]]

            var sprite = ruletile.getSprite(v)

            if(sprite != null){
                var abspos = v.c().mul(this.blockSize)
                ctxt.drawImage(sprite.image, abspos.x, abspos.y)
            }
        })
    }

}