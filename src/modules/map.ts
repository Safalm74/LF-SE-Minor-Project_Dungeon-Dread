import mapConstants from "../constants/mapConstants";
import Point from "./points";
import Tile from "./tile";
import getRandomInt from "../util/randomNumber";
interface IMap {
    tileSize: number;
    mapWidth: number;
    mapHeight: number;
}



export default class Map implements IMap {
    tileSize: number;
    mapHeight: number;
    mapWidth: number;
    constructor(
        tileSize: number

    ) {
        this.tileSize = tileSize;
        this.mapHeight = Math.floor(window.innerHeight / tileSize);
        this.mapWidth = Math.floor(window.innerWidth / tileSize);
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
                            x_axis * tileSize,
                            y_axis * tileSize),
                        'bush',
                        true,
                        tileSize
                    );

                }
                else {
                    const randomNumber = getRandomInt(1, 100);
                    if (randomNumber % 2 == 0 && randomNumber < 10) {
                        if (randomNumber > 5) {
                            mapConstants.mapTileArray[y_axis][x_axis] = new Tile(
                                new Point(
                                    x_axis * tileSize,
                                    y_axis * tileSize),
                                'drum',
                                true,
                                tileSize);

                        }
                        else {
                            mapConstants.mapTileArray[y_axis][x_axis] = new Tile(
                                new Point(
                                    x_axis * tileSize,
                                    y_axis * tileSize),
                                'stone',
                                true,
                                tileSize);
                        }



                    }
                    else {
                        mapConstants.mapTileArray[y_axis][x_axis] = new Tile(
                            new Point(
                                x_axis * tileSize,
                                y_axis * tileSize),
                            'empty',
                            false,
                            tileSize
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