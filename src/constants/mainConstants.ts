import Tile from "../modules/tile"

type MainConstants={
    collideableObjs:Tile[];
    heroTotalHealth:number;
    waveIntervalTime:number;
}

const mainConstants: MainConstants={
    collideableObjs:[],
    heroTotalHealth:120,
    waveIntervalTime:60*1000
}

export default mainConstants;