//constants
import screenConstants from "../constants/screenConstants"
//screens
import infoScreen from "../screens/infoScreen"
type screenParameters = {
    heading: string,
    msg: string
}
type InfoScreenParameter = {
    about: screenParameters,
    gameOver: screenParameters,
    gameWin: screenParameters,
    story1: screenParameters,
    aboutHero: screenParameters
}
//loadingScreen(ctx)
const InfoScreenData: InfoScreenParameter = {
    about: {
        heading: "About",
        msg: `The world in Dungeon Dread has multiple dungeons 
            where zombies/monsters exist. The dungeon boss controls them. 
            Our main character is a zombie/monster hunter. 
            Initially, our character is equipped with 
            a weaker weapon. As he kills zombies and collects 
            rewards, the character can buy weapons at the end 
            of the wave. The boss appears at the final wave. 
            The game's objective is to survive each wave and defeat 
            the boss. Boss is much stronger than a regular monster/zombie. Stronger in the sense 
            of higher damage and higher health. After defeating the boss, 
            the dungeon's remaining monsters/zombies disappear and the dungeon 
            is free of monsters/zombies.`
    },
    gameOver: {
        heading: "Game Over",
        msg: `
        You failed the mission. The villagers were attacked by the monsters`
    },
    gameWin: {
        heading: "You Win",
        msg: `You defended the village`
    },
    story1: {
        heading: "Attack of Angler Monster",
        msg: ` 
        Once upon a time, there was a peaceful village. But one day suddenly monsters started appearing in 
        the village. The chief was worried about the village. With his research assistant, there was a dungeon
        near the village from where monsters started appearing.so the chief requested the monster hunter to clear
        the dungeon and save the village.`,
    },
    aboutHero: {
        heading: "Introduction to hero",
        msg: `
            Hero is a ninja with supernatural powers.
            He levitates weapons with telepathy power.
            The hero can use Amaterasu from the essence, 
            collected from the monster's dead body. 
            Amaterasu's cooldown is 15s and the max use duration
            of Amaterasu is 10sec depending upon the essence collected.
            Another hero's ability is to regenerate when his health point is 
            lower than 50 hp and regenerates till 50 hp.`
    }
}
export default function loadInfoScreen(
    ctx: CanvasRenderingContext2D,
    page: 'about' | 'gameOver' | 'gameWin' | 'story1' | 'aboutHero',
    btnName: string,
    fun: (ctx: CanvasRenderingContext2D) => void,
    sound: HTMLAudioElement | null = null
) {
    infoScreen(
        ctx,
        InfoScreenData[page].heading,
        InfoScreenData[page].msg,
        btnName,
        fun);
    setTimeout(
        () => {
            if (sound) {
                screenConstants.prevSoundHolder = sound;

                sound.play();
            }
        }
        , 800
    );
}