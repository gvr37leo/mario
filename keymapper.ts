enum Key {
    Backspace = 8,
    Tab = 9,
    Enter = 13,
    Shift = 16,
    Ctrl = 17,
    Alt = 18,
    PauseBreak = 19,
    CapsLock = 20,
    Escape = 27,
    Space = 32,
    PageUp = 33,
    PageDown = 34,
    End = 35,
    Home = 36,

    LeftArrow = 37,
    UpArrow = 38,
    RightArrow = 39,
    DownArrow = 40,

    Insert = 45,
    Delete = 46,

    Zero = 48,
    ClosedParen = Zero,
    One = 49,
    ExclamationMark = One,
    Two = 50,
    AtSign = Two,
    Three = 51,
    PoundSign = Three,
    Hash = PoundSign,
    Four = 52,
    DollarSign = Four,
    Five = 53,
    PercentSign = Five,
    Six = 54,
    Caret = Six,
    Hat = Caret,
    Seven = 55,
    Ampersand = Seven,
    Eight = 56,
    Star = Eight,
    Asterik = Star,
    Nine = 57,
    OpenParen = Nine,

    A = 65,
    B = 66,
    C = 67,
    D = 68,
    E = 69,
    F = 70,
    G = 71,
    H = 72,
    I = 73,
    J = 74,
    K = 75,
    L = 76,
    M = 77,
    N = 78,
    O = 79,
    P = 80,
    Q = 81,
    R = 82,
    S = 83,
    T = 84,
    U = 85,
    V = 86,
    W = 87,
    X = 88,
    Y = 89,
    Z = 90,

    LeftWindowKey = 91,
    RightWindowKey = 92,
    SelectKey = 93,

    Numpad0 = 96,
    Numpad1 = 97,
    Numpad2 = 98,
    Numpad3 = 99,
    Numpad4 = 100,
    Numpad5 = 101,
    Numpad6 = 102,
    Numpad7 = 103,
    Numpad8 = 104,
    Numpad9 = 105,

    Multiply = 106,
    Add = 107,
    Subtract = 109,
    DecimalPoint = 110,
    Divide = 111,

    F1 = 112,
    F2 = 113,
    F3 = 114,
    F4 = 115,
    F5 = 116,
    F6 = 117,
    F7 = 118,
    F8 = 119,
    F9 = 120,
    F10 = 121,
    F11 = 122,
    F12 = 123,

    NumLock = 144,
    ScrollLock = 145,

    SemiColon = 186,
    Equals = 187,
    Comma = 188,
    Dash = 189,
    Period = 190,
    UnderScore = Dash,
    PlusSign = Equals,
    ForwardSlash = 191,
    Tilde = 192,
    GraveAccent = Tilde,

    OpenBracket = 219,
    ClosedBracket = 221,
    Quote = 222
}

class Input{

    keys:Box<boolean>[]
    mouse = new Vector(0,0)
    mouseLeft = new Box<boolean>(false)
    mouseCenter = new Box<boolean>(false)
    mouseRight = new Box<boolean>(false)

    constructor(){
        this.keys = new Array(255)
        for(var i = 0; i < this.keys.length; i++){
            this.keys[i] = new Box<boolean>(false)
        }
        var mouseKeys = [this.mouseLeft,this.mouseCenter,this.mouseRight]
        document.addEventListener('keydown',e => {
            var box = this.keys[e.keyCode]
            box.set(true)
        })

        document.addEventListener('keyup', e => {
            var box = this.keys[e.keyCode]
            box.set(false)
        })

        document.addEventListener('mousedown', e => {
            mouseKeys[e.button].set(true)
        })

        document.addEventListener('mouseup', e => {
            mouseKeys[e.button].set(false)
        })

        document.addEventListener('mousemove', me => {
            this.mouse.x = me.x
            this.mouse.y = me.y
        })

        document.activeElement
    }

    getMoveInput():Vector{
        var dir = new Vector(0,0)
        if(this.keys[Key.LeftArrow].get() || this.keys[Key.A].get())dir.x--//left
        if(this.keys[Key.UpArrow].get() || this.keys[Key.W].get())dir.y++//up
        if(this.keys[Key.RightArrow].get() || this.keys[Key.D].get())dir.x++//right
        if(this.keys[Key.DownArrow].get() || this.keys[Key.S].get())dir.y--//down
        return dir;
    }
    
    getMoveInputYFlipped():Vector{
        var input = this.getMoveInput()
        input.y *= -1
        return input
    }

}
var input = new Input()
