import mapConstants from "../constants/mapConstants";
import Point from "./points";
import Tile from "./tile";
import getRandomInt from "../util/randomNumber";
import mainConstants from "../constants/mainConstants";
interface IMap {
    tileSize: number;
    mapWidth: number;
    mapHeight: number;
}


const collideableMapObsticles: Tile[] = []
export default class Map implements IMap {
    tileSize: number;
    mapHeight: number;
    mapWidth: number;
    constructor(
        tileSize: number

    ) {
        this.tileSize = tileSize;
        this.mapHeight = Math.floor(window.innerHeight*10 / tileSize);
        this.mapWidth = Math.floor(window.innerWidth*10 / tileSize);
        this.initialize();
        this.collectCollideableobj();

    }
    collectCollideableobj(){
        mapConstants.mapTileArray.forEach(
            (y_obj)=>{
                y_obj.forEach(
                    (x_obj)=>{
                        if (x_obj.isObstacle){
                            mainConstants.collideableObjs.push(x_obj);
                        }
                    });
            }
        );

    }
    initialize(){
        for (let y_axis = 0; y_axis < this.mapHeight; y_axis++) {
            mapConstants.mapTileArray[y_axis] = [];
            for (let x_axis = 0; x_axis < this.mapWidth; x_axis++) {

                if (
                    x_axis === 0 ||
                    y_axis === 0 ||
                    y_axis === this.mapHeight - 1 ||
                    x_axis === this.mapWidth - 1) {
                    mapConstants.mapTileArray[y_axis][x_axis] = new Tile(
                        new Point(
                            x_axis * this.tileSize,
                            y_axis * this.tileSize),
                        'bush',
                        true,
                        this.tileSize
                    );

                }
                else {
                    const randomNumber = getRandomInt(1, 100);
                    if (randomNumber % 2 == 0 && randomNumber < 10) {
                        if (randomNumber > 5) {
                            mapConstants.mapTileArray[y_axis][x_axis] = new Tile(
                                new Point(
                                    x_axis * this.tileSize,
                                    y_axis * this.tileSize),
                                'drum',
                                true,
                                this.tileSize);

                        }
                        else {
                            mapConstants.mapTileArray[y_axis][x_axis] = new Tile(
                                new Point(
                                    x_axis * this.tileSize,
                                    y_axis * this.tileSize),
                                'stone',
                                true,
                                this.tileSize);
                        }


                    }
                    else {
                        mapConstants.mapTileArray[y_axis][x_axis] = new Tile(
                            new Point(
                                x_axis * this.tileSize,
                                y_axis * this.tileSize),
                            'empty',
                            false,
                            this.tileSize
                        );

                    }

                }


            }
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        mapConstants.mapTileArray.forEach(
            (y_axis_obj) => {
                y_axis_obj.forEach((x_axis_obj) => {
                    x_axis_obj.draw(ctx);
                });
            }
        );
    }

}

export {collideableMapObsticles}