type StateConstants = {
    ingame: boolean;
    buyScreenFlag: boolean;
    aboutScreenFlag: boolean;
    controlScreenFlag: boolean;
    homeScreenFlag: boolean;
    btnPressed: {
        [key: string]: boolean
    }
    wave: number;
    ismute: boolean;
    firstPageFlag: boolean;
    assetsLoaded: number;
    loadingScreen:boolean;

}

const stateConstants: StateConstants = {
    ingame: false,
    aboutScreenFlag: false,
    controlScreenFlag: false,
    homeScreenFlag: false,
    btnPressed: {

    },
    wave: 5,
    buyScreenFlag: false,
    ismute: false,
    firstPageFlag: false,
    assetsLoaded: 0,
    loadingScreen:false
}

export default stateConstants;