import Tile from "../modules/tile"

type MainConstants={
    collideableObjs:Tile[];
    heroTotalHealth:number;
    waveIntervalTime:number;
    maxEnemies:number;
}

const mainConstants: MainConstants={
    collideableObjs:[],
    heroTotalHealth:120,
    waveIntervalTime:60*1000,
    maxEnemies:500
}

export default mainConstants;