//modules
import Point from "../modules/points";
import Tile from "../modules/tile";
//image src
import stoneAndDrum from "../assets/map/stoneandDrum.svg";
import bush from "../assets/map/bush.png";
import gameMap from "../assets/map/map.png"
//image src
import upcounter from "../util/upcounter";
//images
const mapImage = new Image;
const bushImage = new Image;
const stoneAndDrumImage = new Image;
mapImage.src = gameMap;
bushImage.src = bush;
stoneAndDrumImage.src = stoneAndDrum;
//onloads
mapImage.onload = upcounter;
bushImage.onload=upcounter;
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