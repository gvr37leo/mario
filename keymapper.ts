class KeyMapper{
    
    registrations:KeyMapRegistration[] = []

    constructor(){

    }

    listen(){

    }
}

class KeyMapRegistration{

    constructor(public keycodes:number[],public cb:() => void){

    }

}