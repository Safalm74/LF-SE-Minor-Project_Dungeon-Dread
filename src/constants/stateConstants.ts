type StateConstants = {
    ingame: boolean;
    buyScreenFlag:boolean;
    aboutScreenFlag:boolean;
    controlScreenFlag:boolean;
    btnPressed: {
        [key:string]:boolean
    }
    wave:number;
    
}

const stateConstants: StateConstants = {
    ingame: false,
    aboutScreenFlag:false,
    controlScreenFlag:false,
    btnPressed:{

    },
    wave:1,
    buyScreenFlag:false
}

export default stateConstants;