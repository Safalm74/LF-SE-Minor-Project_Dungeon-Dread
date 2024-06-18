type StateConstants = {
    ingame: boolean;
    btnPressed: {
        [key:string]:boolean
    }
    wave:number;
}

const stateConstants: StateConstants = {
    ingame: false,
    btnPressed:{

    },
    wave:1
}

export default stateConstants;