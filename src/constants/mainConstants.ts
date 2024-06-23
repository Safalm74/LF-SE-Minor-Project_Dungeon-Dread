import Tile from "../modules/tile"
import Point from "../modules/points";
import mapConstants from "./mapConstants";
import Pestol from "../modules/pestol";

import themeSoundSrc from "../assets/sounds/homeMusic.mp3"
import windSoundSrc from "../assets/sounds/wind.mp3"
import gemCollectSound from "../assets/sounds/coinCollect.wav"
import upcounter from "../util/upcounter";


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

const homeSound= new Audio(themeSoundSrc);
const windSound= new Audio(windSoundSrc);
const gemSound= new Audio(gemCollectSound);

homeSound.onload= upcounter;
windSound.onload= upcounter;
gemSound.onload =upcounter;

windSound.volume=0.5 ;
gemSound.volume=0.2;

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
    homeSound: homeSound,
    windSound: windSound,
    gemSound: gemSound


}

export default mainConstants;