//modules
import Tile from "./tile";
import Point from "./points";
//constants
import mapConstants from "../constants/mapConstants";
import mainConstants from "../constants/mainConstants";
import getRandomInt from "../util/randomNumber";
import { WaveTheme } from "../constants/waveConstants";

interface IMap {
    tileSize: number;
    mapWidth: number;
    mapHeight: number;
}

export default class Map implements IMap {
    tileSize: number;
    mapHeight: number;
    mapWidth: number;
    private currentTint: string = "rgba(0,0,0,0)";

    constructor(tileSize: number) {
        this.tileSize = tileSize;
        this.mapHeight = Math.floor(window.innerHeight * mapConstants.mapSizeMultiplier / tileSize);
        this.mapWidth = Math.floor(window.innerWidth * mapConstants.mapSizeMultiplier / tileSize);
        this.buildTiles(7, 65);
        this.rebuildCollideables();
    }

    reinitialize(theme: WaveTheme) {
        this.currentTint = theme.mapTint;
        mapConstants.mapTileArray = [];
        this.buildTiles(theme.obstacleChance, theme.drumBias);
        this.rebuildCollideables();
    }

    private buildTiles(obstacleChance: number, drumBias: number) {
        for (let y = 0; y < this.mapHeight; y++) {
            mapConstants.mapTileArray[y] = [];
            for (let x = 0; x < this.mapWidth; x++) {
                if (x === 0 || y === 0 || y === this.mapHeight - 1 || x === this.mapWidth - 1) {
                    mapConstants.mapTileArray[y][x] = new Tile(
                        new Point(x * this.tileSize, y * this.tileSize),
                        'bush', true, this.tileSize
                    );
                    continue;
                }
                const r = getRandomInt(1, 100);
                if (r <= obstacleChance) {
                    const type = (r <= Math.floor(obstacleChance * drumBias / 100)) ? 'drum' : 'stone';
                    mapConstants.mapTileArray[y][x] = new Tile(
                        new Point(x * this.tileSize, y * this.tileSize),
                        type, true, this.tileSize
                    );
                } else {
                    mapConstants.mapTileArray[y][x] = new Tile(
                        new Point(x * this.tileSize, y * this.tileSize),
                        'empty', false, this.tileSize
                    );
                }
            }
        }
    }

    private rebuildCollideables() {
        mainConstants.collideableObjs = [];
        mapConstants.mapTileArray.forEach(row => {
            row.forEach(tile => {
                if (tile.isObstacle) mainConstants.collideableObjs.push(tile);
            });
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        mapConstants.mapTileArray.forEach(row => {
            row.forEach(tile => tile.draw(ctx));
        });
        // wave-themed atmospheric tint over the map surface
        if (this.currentTint !== "rgba(0,0,0,0)") {
            ctx.save();
            ctx.fillStyle = this.currentTint;
            ctx.fillRect(
                mapConstants.displayPosition.x,
                mapConstants.displayPosition.y,
                window.innerWidth * mapConstants.mapSizeMultiplier,
                window.innerHeight * mapConstants.mapSizeMultiplier
            );
            ctx.restore();
        }
    }
}
