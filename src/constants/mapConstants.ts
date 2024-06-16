import Tile from "../modules/tile";

type MapConstants = {
    tileSize: number;
    mapWidth: number;
    mapHeight: number;
    mapColor: string;
    mapTileArray: Tile[][];
}
let mapTileArray: Tile[][] = [];
const tileSize = 50;
const mapWidth = Math.floor(window.innerWidth / tileSize);
const mapHeight = Math.floor(window.innerHeight / tileSize);
const mapColor = '#a9c0a6';


const mapConstants: MapConstants = {
    tileSize: tileSize,
    mapWidth: mapWidth,
    mapHeight: mapHeight,
    mapColor: mapColor,
    mapTileArray: mapTileArray
}
export default mapConstants;