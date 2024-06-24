//modules
import Point from "./points";
//constants
import mapConstants from "../constants/mapConstants";
//sprite information
import bushSprite from "../sprites/bushSprite";
import stoneAndDrumSprite from "../sprites/stoneAndDrumSprite";
interface ITile {
    position: Point;
    tileType: 'bush' | 'stone' | 'empty' | 'drum';
    isObstacle: boolean;
    tileSize: number;
}
export default class Tile implements ITile {
    position: Point;
    tileType: 'bush' | 'stone' | 'empty' | 'drum';
    isObstacle: boolean;
    tileSize: number;
    constructor(
        position: Point,
        tileType: 'bush' | 'stone' | 'empty' | 'drum',
        isObsticle: boolean,
        tileSize: number
    ) {
        this.position = position
        this.tileType = tileType;
        this.isObstacle = isObsticle;
        this.tileSize = tileSize;
    }
    draw(ctx: CanvasRenderingContext2D) {
        switch (this.tileType) {
            case 'bush':
                ctx.drawImage(
                    mapConstants.bushImage,
                    bushSprite.position.x,
                    bushSprite.position.y,
                    bushSprite.width,
                    bushSprite.height,
                    this.position.x,
                    this.position.y,
                    this.tileSize,
                    this.tileSize
                );
                break;
            case 'empty':
                break;
            case 'stone':
                ctx.drawImage(
                    mapConstants.stoneImage,
                    stoneAndDrumSprite.stone.position.x,
                    stoneAndDrumSprite.stone.position.y,
                    stoneAndDrumSprite.stone.width,
                    stoneAndDrumSprite.stone.height,
                    this.position.x,
                    this.position.y,
                    stoneAndDrumSprite.stone.width / 30,
                    stoneAndDrumSprite.stone.height / 30
                );
                break;
            case 'drum':
                ctx.drawImage(
                    mapConstants.stoneImage,
                    stoneAndDrumSprite.drum.position.x,
                    stoneAndDrumSprite.drum.position.y,
                    stoneAndDrumSprite.drum.width,
                    stoneAndDrumSprite.drum.height,
                    this.position.x,
                    this.position.y,
                    this.tileSize,
                    this.tileSize
                );
                break;
        }
    }
} 