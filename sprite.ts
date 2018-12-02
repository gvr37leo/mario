class Sprite{
    
    constructor(public imageData:ImageData){

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
            graphics.putPixel(abspos.x,abspos.y,this.imageData.data as any, this.index(relpos))
        })
    }

    index(v:Vector){
        return (this.imageData.width * v.y + v.x) * 4
    }
}