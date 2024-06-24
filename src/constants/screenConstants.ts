import backGround from "../assets/home/background.webp"
import controlImageSrc from "../assets/controls/Controls.png";
import upcounter from "../util/upcounter";

const controlImage=new Image;
controlImage.src=controlImageSrc;
controlImage.onload=upcounter;

const backGroundImage = new Image;
backGroundImage.src = backGround;
backGroundImage.onload=upcounter;


type ScreenConstants = {
    controlImage:HTMLImageElement;
    backGroundImage:HTMLImageElement;
}


const screenConstants: ScreenConstants = {
    controlImage:controlImage,
    backGroundImage:backGroundImage
   
}

export default screenConstants;