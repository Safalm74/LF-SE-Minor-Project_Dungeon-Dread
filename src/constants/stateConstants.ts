type StateConstants = {
    ingame: boolean;
    btnPressed: {
        [key:string]:boolean
    }
}

const stateConstants: StateConstants = {
    ingame: false,
    btnPressed:{

    }
}

export default stateConstants;