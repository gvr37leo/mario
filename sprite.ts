class Sprite{
    
    renderer:SpriteRenderer
    size:Vector

    constructor(public imageData:ImageData){
        this.size = new Vector(imageData.width,imageData.height)
        this.renderer = new SpriteRenderer(this,[255,0,0,255],0)
    }

    static fromString(url:string):Promise<Sprite>{
        var image = new Image()
        image.src = url
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        
        var promise = new Promise<Sprite>((res,rej) => {
            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0 );
                var myData = context.getImageData(0, 0, image.width, image.height);
                var sprite = new Sprite(myData)
                res(sprite)
            }    
        })
        return promise
    }
    

    draw(graphics:Graphics,pos:Vector){
        var v = new Vector(this.imageData.width, this.imageData.height)
        var abspos = new Vector(0,0)
        v.loop2d(relpos => {
            abspos.overwrite(pos).add(relpos)
            var color = this.renderer.shader(relpos)
            graphics.putPixel(abspos.x,abspos.y, color, 0)
        })
    }

    index(v:Vector){
        return (this.imageData.width * v.y + v.x) * 4
    }

    getPixel(v:Vector):number[]{
        var i = this.index(v)
        return this.imageData.data.slice(i,i + 4) as any
    }
}

class SpriteRenderer{
    center: Vector
    temp:Vector = new Vector(0,0)
    matrix:number[][]
    rotation:number
    private matrixID:number[][] = [
        [ 1, 0],
        [ 0, 1],
    ]
    private matrix90:number[][] = [
        [0,-1],
        [1, 0],
    ]
    private matrix180:number[][] = [
        [-1, 0],
        [ 0,-1],
    ]
    private matrix270:number[][] = [
        [ 0, 1],
        [-1, 0],
    ]
    private matrices:number[][][] = [this.matrixID,this.matrix90,this.matrix180,this.matrix270]

    constructor(public sprite:Sprite,public modifiercolor:number[],public strength:number){
        this.center = this.sprite.size.c().sub(Vector.one).scale(0.5)
        this.matrix = this.matrix180
    }

    shader(relpos:Vector):number[]{
        this.temp.overwrite(relpos)
        var incolor = this.sprite.getPixel( this.rotateAround(this.temp, this.center))
        // var incolor = this.sprite.getPixel(this.temp)
        var outcolor = [0,0,0,0]
        

        for(var i = 0; i < 4; i++){
            
            // outcolor[i] = lerp(incolor[i],this.modifiercolor[i],this.strength) 
            outcolor[i] = incolor[i]
        }

        return outcolor
    }

    rotateAround(v:Vector,center:Vector){
        v.sub(center)
        this.rotate90(v,1)
        return v.add(center)
    }

    rotate90(v:Vector,times:number){
        this.matrix = this.matrices[times % this.matrices.length]
        var xp = this.matrix[0][0] * v.x + this.matrix[1][0] * v.y
        var yp = this.matrix[0][1] * v.x + this.matrix[1][1] * v.y
        v.x = xp
        v.y = yp
        return v
    }
}