import infoScreen from "../screens/infoScreen"

//loadingScreen(ctx)
const InfoScreenData = {
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
    }
}
export default function loadInfoScreen(
    ctx: CanvasRenderingContext2D,
    page: 'about' | 'gameOver' | 'gameWin',
    btnName: string,
    fun: (ctx: CanvasRenderingContext2D) => void
) {
    infoScreen(
        ctx,
        InfoScreenData[page].heading,
        InfoScreenData[page].msg,
        btnName,
        fun);

}