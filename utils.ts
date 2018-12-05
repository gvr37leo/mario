function map(val1: number, start1: number, stop1: number, start2: number, stop2: number): number{
    return start2 + (stop2 - start2) * ((val1 - start1) / (stop1 - start1))
}

function inRange(min: number, max: number, value: number):boolean{
    if(min > max){
        var temp = min;
        min = max;
        max = temp;
    }
    return value <= max && value >= min;
}

function clamp(val: number, min: number, max: number): number{
    return this.max(this.min(val, max), min)
}

function rangeContain(a1: number, a2: number, b1: number, b2: number):boolean{//as in does a enclose b----- so returns true if b is smaller in all ways
    return max(a1, a2) >= max(b1, b2) && min(a1,a2) <= max(b1,b2);
}

function createNDimArray<T>(dimensions: number[], fill:(pos:Vector) => T) {
    if (dimensions.length > 0) {
        function helper(dimensions) {
            var dim = dimensions[0];
            var rest = dimensions.slice(1);
            var newArray = new Array();
            for (var i = 0; i < dim; i++) {
                newArray[i] = helper(rest);
            }
            return newArray;
        }
        var array = helper(dimensions);
        var looper = new Vector(0, 0);
        looper.vals = dimensions;
        looper.loop((pos) => {
            setElement(array, pos.vals, fill(pos));
        });
        return array;
    }
    else {
        return undefined;
    }
}

function getElement<T>(array:T[], indices:number[]):T {
    if (indices.length == 0) {
        return null;
    }
    else {
        return getElement(array[indices[0]] as any, indices.slice(1));
    }
}

function setElement<T>(array:T[], pos:number[], val:T) {
    if (pos.length == 1) {
        array[pos[0]] = val;
    }
    else {
        setElement(array[pos[0]] as any, pos.slice(1), val);
    }
}

function getMousePos(canvas:HTMLCanvasElement, evt:MouseEvent) {
    var rect = canvas.getBoundingClientRect();
    return new Vector(evt.clientX - rect.left, evt.clientY - rect.top)
}

function createCanvas(x: number, y: number){
    var canvas = document.createElement('canvas')
    canvas.width = x;
    canvas.height = y;
    document.body.appendChild(canvas)
    var ctxt = canvas.getContext('2d')
    return {ctxt:ctxt,canvas:canvas};
}

function random(min: number, max: number){
    return Math.random() * (max - min) + min
}

function randomSpread(center: number, spread: number){
    var half = spread / 2
    return random(center - half, center + half)
}

var lastUpdate = Date.now();
function loop(callback){
    var now = Date.now()
    callback(now - lastUpdate)
    lastUpdate = now
    requestAnimationFrame(() => {
        loop(callback)
    })
}

function mod(number: number, modulus: number){
    return ((number%modulus)+modulus)%modulus;
}

function* iter(n){
    var i = 0;
    while(i < n)yield i++;
}




function getFiles(strings:string[]){
    var promises = []
    for(var string of strings){
        var promise = fetch(string)
        .then(resp => resp.text())
        .then(text => text)
        promises.push(promise)
    }
    return Promise.all(promises)
}

function findbestIndex<T>(list:T[], evaluator:(v:T) => number):number {
    if (list.length < 1) {
        return -1;
    }
    var bestIndex = 0;
    var bestscore = evaluator(list[0])
    for (var i = 1; i < list.length; i++) {
        var score = evaluator(list[i])
        if (score > bestscore) {
            bestscore = score
            bestIndex = i
        }
    }
    return bestIndex
}

function findBest<T>(list:T[], evaluator:(v:T) => number):T{
    return list[findbestIndex(list,evaluator)]
}

function createAndAppend(element: HTMLElement, html: string): HTMLElement {
    var result = string2html(html);
    element.appendChild(result)
    return result;
}

function string2html(string): HTMLElement {
    var div = document.createElement('div')
    div.innerHTML = string;
    return div.children[0] as HTMLElement;
}

function line(ctxt:CanvasRenderingContext2D,a:Vector,b:Vector){
    ctxt.beginPath()
    ctxt.moveTo(a.x,a.y)
    ctxt.lineTo(b.x,b.y)
    ctxt.stroke()
}

function lerp(a:number,b:number,r:number):number{
    return a + to(a,b) * r
}

function to(a:number,b:number):number{
    return b - a;
}

function swap<T>(arr:T[],a:number = 0,b:number = 1){
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

var floor = Math.floor
var ceil = Math.ceil
var round = Math.round
var sign = Math.sign
var min = Math.min
var max = Math.max
var Tau = Math.PI * 2
var sincache = []
var coscache = []

function fillSinAndCosCache(precision:number){
    for(var i = 0; i < precision; i++){
        sincache.push(Math.sin((Tau / precision) * i))
        coscache.push(Math.cos((Tau / precision) * i))
    }
}
fillSinAndCosCache(360)

function sinCached(theta:number){
    return thetaArrayLookup(theta,sincache)
}

function cosCached(theta:number){
    return thetaArrayLookup(theta,coscache)
}

function thetaArrayLookup(theta:number,arr:number[]){
    var abs = arr.length * (theta / Tau)
    var floored = floor(abs);
    return lerpInArray(floored,abs - floored,arr)
}

function lerpInArray(i:number,t:number, arr:number[]){
    return lerp(arr[mod(i,arr.length)], arr[mod( i + 1,arr.length)], t)
}


class RNG{
    public mod:number = 4294967296
    public multiplier:number = 1664525
    public increment:number = 1013904223

    constructor(public seed:number){

    }

    next(){
        this.seed = (this.multiplier * this.seed + this.increment) % this.mod
        return this.seed
    }
}

function arraySize2D<T>(arr:T[][]):Vector{
    return new Vector(arr[0].length,arr.length)
}

function timeFunction(iterations:number,cb:(i:number) => void){
    var begin = Date.now()
    for(var i = 0; i < iterations; i++){
        cb(i)
    }
    var end = Date.now()
    return end - begin
}
