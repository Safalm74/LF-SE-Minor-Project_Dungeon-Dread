import bushSprite from "../sprites/bushSprite";
import bush from "../assets/map/bush.png";
import stoneAndDrumSprite from "../sprites/stoneAndDrumSprite";
import stoneAndDrum from "../assets/map/stoneandDrum.svg";
import Point from "./points";
import upcounter from "../util/upcounter";

const bushImage = new Image;
bushImage.src = bush;
bushImage.onload=upcounter;
const stoneAndDrumImage = new Image;
stoneAndDrumImage.src = stoneAndDrum;
stoneAndDrumImage.onload=upcounter;

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
                    bushImage,
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
                    stoneAndDrumImage,
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
                    stoneAndDrumImage,
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