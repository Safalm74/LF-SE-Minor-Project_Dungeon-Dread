import Tile from "../modules/tile"
import Point from "../modules/points";
import mapConstants from "./mapConstants";

import themeSoundSrc from "../assets/sounds/homeMusic.mp3"
import windSoundSrc from "../assets/sounds/wind.mp3"
import gemCollectSound from "../assets/sounds/coinCollect.wav"
import denySoundsrc from  "../assets/sounds/deny.mp3"
import upcounter from "../util/upcounter";

import gemImageSrc from "../assets/gem/gem.png"
import Gun from "../modules/gun";

const gemImage = new Image;
gemImage.src = gemImageSrc;

gemImage.onload=upcounter;
type MainConstants = {
    collideableObjs: Tile[];
    heroTotalHealth: number;
    waveIntervalTime: number;
    maxEnemies: number;
    mapPosition: Point;
    dropdownInterval: any;
    weaponArray: null[] | Gun[];
    homeSound: HTMLAudioElement;
    windSound: HTMLAudioElement;
    gemSound: HTMLAudioElement;
    denySound:HTMLAudioElement;
    gemImage:HTMLImageElement;
    buyTime:number
}

const homeSound = new Audio(themeSoundSrc);
const windSound = new Audio(windSoundSrc);
const gemSound = new Audio(gemCollectSound);
const denySound = new Audio(denySoundsrc);

homeSound.onload = upcounter;
windSound.onload = upcounter;
gemSound.onload = upcounter;
denySound.onload=upcounter;

homeSound.volume = 0.5;
windSound.volume = 0.5;
gemSound.volume = 0.2;
denySound.volume=0.5;

const mainConstants: MainConstants = {
    collideableObjs: [],
    heroTotalHealth: 120,
    waveIntervalTime: 90 * 1000,
    buyTime:30*1000,
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
    gemSound: gemSound,
    denySound:denySound,
    gemImage:gemImage
}

export default mainConstants;