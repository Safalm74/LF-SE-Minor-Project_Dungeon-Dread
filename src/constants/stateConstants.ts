type StateConstants = {
    ingame: boolean;
    btnPressed: {
        [key:string]:boolean
    }
    wave:number;
    buyScreenFlag:boolean;
}

const stateConstants: StateConstants = {
    ingame: false,
    btnPressed:{

    },
    wave:1,
    buyScreenFlag:false
}

export default stateConstants;