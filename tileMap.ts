class TileMap{

    tileCache:RuleTile[] = []
    


    constructor(public blockSize:Vector, public grid:number[][]){
        


    }

    draw(){

        var size = arraySize2D(this.grid)
        size.loop2d(v => {
            var ruletile = this.tileCache[this.grid[v.y][v.x]]
            if(this.grid[v.y][v.x] == 1){
                var abspos = v.c().mul(this.blockSize)
                // groundSprite.draw(graphics,abspos)
                ctxt.drawImage(groundSprite.image, abspos.x, abspos.y)

            }
        })
    }

}