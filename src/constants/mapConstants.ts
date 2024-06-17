import Point from "../modules/points";
import Tile from "../modules/tile";

type MapConstants = {
    tileSize: number;
    mapWidth: number;
    mapHeight: number;
    mapColor: string;
    mapTileArray: Tile[][];
    displayPosition:Point;
}
let mapTileArray: Tile[][] = [];
const tileSize = 50;
const mapWidth = Math.floor(window.innerWidth*10 / tileSize);
const mapHeight = Math.floor(window.innerHeight*10 / tileSize);
const mapColor = '#a9c0a6';


const mapConstants: MapConstants = {
    tileSize: tileSize,
    mapWidth: mapWidth,
    mapHeight: mapHeight,
    mapColor: mapColor,
    mapTileArray: mapTileArray,
    displayPosition: new Point(0,0)
}
export default mapConstants;