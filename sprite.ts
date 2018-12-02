class Sprite{
    
    renderer:SpriteRenderer

    constructor(public imageData:ImageData){
        this.renderer = new SpriteRenderer(this,[255,0,0],0)
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



    constructor(public sprite:Sprite,public modifiercolor:number[],public strength:number){

    }

    shader(relpos:Vector):number[]{
        var color = this.sprite.getPixel(relpos)

        for(var i = 0; i < 3; i++){
            color[i] = lerp(color[i],this.modifiercolor[i],this.strength) 
        }

        return color

    }
}