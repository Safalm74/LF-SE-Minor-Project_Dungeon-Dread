//img src
import backGround from "../assets/home/background.webp"
import controlImageSrc from "../assets/controls/Controls.png";
//utils
import upcounter from "../util/upcounter";
//sound src
import story1SoundSrc from "../assets/sounds/story1.mp3";
import heroIntroductionSoundSrc from "../assets/sounds/heroIntroduction.mp3";
//sounds
const story1Sound=new Audio(story1SoundSrc);
const heroIntroductionSound=new Audio(heroIntroductionSoundSrc);
//change voulume
story1Sound.volume=0.2
heroIntroductionSound.volume=0.2
//images
const backGroundImage = new Image;
const controlImage=new Image;
controlImage.src=controlImageSrc;
backGroundImage.src = backGround;
//onloads
heroIntroductionSound.onload=upcounter;
story1Sound.onload=upcounter;
controlImage.onload=upcounter;
backGroundImage.onload=upcounter;
type ScreenConstants = {
    controlImage:HTMLImageElement;
    backGroundImage:HTMLImageElement;
    prevSoundHolder:HTMLAudioElement|null;
    story1sound:HTMLAudioElement;
    heroIntroductionSound:HTMLAudioElement
}
const screenConstants: ScreenConstants = {
    controlImage:controlImage,
    backGroundImage:backGroundImage,
    story1sound:story1Sound,
    prevSoundHolder:null,
    heroIntroductionSound:heroIntroductionSound
}
export default screenConstants;