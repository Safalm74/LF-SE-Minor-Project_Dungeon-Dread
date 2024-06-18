import Tile from "../modules/tile"
import Point from "../modules/points";

type MainConstants={
    collideableObjs:Tile[];
    heroTotalHealth:number;
    waveIntervalTime:number;
    maxEnemies:number;
    mapPosition:Point;
}

const mainConstants: MainConstants={
    collideableObjs:[],
    heroTotalHealth:120,
    waveIntervalTime:60*1000,
    maxEnemies:500,
    mapPosition:new Point(0,0)
}

export default mainConstants;