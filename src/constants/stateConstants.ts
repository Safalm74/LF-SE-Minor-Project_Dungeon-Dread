type StateConstants = {
    ingame: boolean;
    buyScreenFlag:boolean;
    aboutScreenFlag:boolean;
    controlScreenFlag:boolean;
    homeScreenFlag:boolean;
    btnPressed: {
        [key:string]:boolean
    }
    wave:number;
    ismute:boolean;
    firstPageFlag:boolean;
    
}

const stateConstants: StateConstants = {
    ingame: false,
    aboutScreenFlag:false,
    controlScreenFlag:false,
    homeScreenFlag:false,
    btnPressed:{

    },
    wave:1,
    buyScreenFlag:false,
    ismute:false,
    firstPageFlag:false
}

export default stateConstants;