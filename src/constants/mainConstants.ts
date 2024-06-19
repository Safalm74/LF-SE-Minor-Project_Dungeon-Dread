import Tile from "../modules/tile"
import Point from "../modules/points";
import mapConstants from "./mapConstants";

type MainConstants={
    collideableObjs:Tile[];
    heroTotalHealth:number;
    waveIntervalTime:number;
    maxEnemies:number;
    mapPosition:Point;
    dropdownInterval:any;
}

const mainConstants: MainConstants={
    collideableObjs:[],
    heroTotalHealth:120,
    waveIntervalTime:60*1000,
    maxEnemies:500*mapConstants.mapSizeMultiplier,
    mapPosition:new Point(0,0),
    dropdownInterval:null
}

export default mainConstants;