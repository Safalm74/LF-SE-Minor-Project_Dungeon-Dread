import Tile from "../modules/tile"
import Point from "../modules/points";
import mapConstants from "./mapConstants";
import Pestol from "../modules/pestol";

import themeSoundSrc from "../assets/sounds/homeMusic.mp3"
import windSoundSrc from "../assets/sounds/wind.mp3"
import gemCollectSounc from "../assets/sounds/coinCollect.wav"


type MainConstants = {
    collideableObjs: Tile[];
    heroTotalHealth: number;
    waveIntervalTime: number;
    maxEnemies: number;
    mapPosition: Point;
    dropdownInterval: any;
    weaponArray: null[] | Pestol[];
    homeSound: HTMLAudioElement;
    windSound: HTMLAudioElement;
    gemSound: HTMLAudioElement;
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
        null],
    homeSound: new Audio(themeSoundSrc),
    windSound: new Audio(windSoundSrc),
    gemSound: new Audio(gemCollectSounc)


}

export default mainConstants;