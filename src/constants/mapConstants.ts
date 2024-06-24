import Point from "../modules/points";
import Tile from "../modules/tile";
import stoneAndDrum from "../assets/map/stoneandDrum.svg";

import bush from "../assets/map/bush.png";
import upcounter from "../util/upcounter";
import gameMap from "../assets/map/map.png"
//loading map background
const mapImage = new Image;
mapImage.src = gameMap;
mapImage.onload = upcounter;

const bushImage = new Image;
bushImage.src = bush;
bushImage.onload=upcounter;
const stoneAndDrumImage = new Image;
stoneAndDrumImage.src = stoneAndDrum;
stoneAndDrumImage.onload=upcounter;

type MapConstants = {
    tileSize: number;
    mapWidth: number;
    mapHeight: number;
    mapColor: string;
    mapTileArray: Tile[][];
    displayPosition:Point;
    mapSizeMultiplier:number;
    bushImage:HTMLImageElement;
    stoneImage:HTMLImageElement;
    mapImage:HTMLImageElement;
}
let mapTileArray: Tile[][] = [];
const tileSize = 50;
const mapWidth = Math.floor(window.innerWidth*10 / tileSize);
const mapHeight = Math.floor(window.innerHeight*10 / tileSize);
const mapColor = '#radial-gradient(#a9c0a6,#000)';


const mapConstants: MapConstants = {
    tileSize: tileSize,
    mapWidth: mapWidth,
    mapHeight: mapHeight,
    mapColor: mapColor,
    mapTileArray: mapTileArray,
    displayPosition: new Point(0,0),
    mapSizeMultiplier:5,
    bushImage:bushImage,
    stoneImage:stoneAndDrumImage,
    mapImage:mapImage
}
export default mapConstants;