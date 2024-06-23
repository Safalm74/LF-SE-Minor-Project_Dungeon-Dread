import Tile from "../modules/tile"
import Point from "../modules/points";
import mapConstants from "./mapConstants";
import Pestol from "../modules/pestol";

type MainConstants = {
    collideableObjs: Tile[];
    heroTotalHealth: number;
    waveIntervalTime: number;
    maxEnemies: number;
    mapPosition: Point;
    dropdownInterval: any;
    weaponArray: null[] | Pestol[];
}

const mainConstants: MainConstants = {
    collideableObjs: [],
    heroTotalHealth: 120,
    waveIntervalTime: 90 * 1000,
    maxEnemies: 100 * mapConstants.mapSizeMultiplier,
    mapPosition: new Point(0, 0),
    dropdownInterval: null,
    weaponArray: [
        null,
        null,
        null,
        null,
        null,
        null]
}

export default mainConstants;