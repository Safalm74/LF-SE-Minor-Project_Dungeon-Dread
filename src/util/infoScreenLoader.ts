//constants
import screenConstants from "../constants/screenConstants"
import stateConstants from "../constants/stateConstants"
//screens
import infoScreen from "../screens/infoScreen"
import { getRunStats } from "./gameStats"

type screenParameters = {
    heading: string;
    msg: string;
}

type InfoScreenParameter = {
    about: screenParameters;
    gameOver: screenParameters;
    gameWin: screenParameters;
    story1: screenParameters;
    aboutHero: screenParameters;
}

const InfoScreenData: InfoScreenParameter = {
    about: {
        heading: "About  —  Dungeon Dread",
        msg:
`In a world where dungeons breed evil, one village stands between the darkness and oblivion.

The dungeon near the village has awakened. Its lord — an ancient demon — commands an army of the dead, the monstrous, and the shadow-touched.

You are the village's last hope: a ninja hunter with supernatural ability and a grudge against the dark.

Kill enemies to collect spirit gems. Spend gems in the armory between waves to upgrade your arsenal. Build essence from kills and unleash Amaterasu — a fire that burns through the undead.

Survive five waves. Defeat the Dungeon Lord. Save the village.`
    },
    gameOver: {
        heading: "You Fell",
        msg: ""  // built dynamically
    },
    gameWin: {
        heading: "The Dungeon Falls",
        msg: ""  // built dynamically
    },
    story1: {
        heading: "The Village in Danger",
        msg:
`The village of Karuvar has stood for five centuries — through war, drought, and plague.

But three nights ago, something worse arrived.

The ancient dungeon to the east, sealed for a hundred years, broke open. Monsters began pouring from its gates — shambling dead, twisted beasts, things that should not exist.

The village chief summoned the only person who could help: a wandering ninja hunter, legendary for fighting the supernatural.

That hunter is you.

The chief's voice was calm, but his hands weren't: "The dungeon has five depths. Each one darker than the last. At the bottom sleeps the Dungeon Lord — a demon of immense age and power. Destroy him and this ends."

You load your weapons.

Time to descend.`
    },
    aboutHero: {
        heading: "The Hunter",
        msg:
`You are no ordinary warrior.

Years of training in forgotten dojos gave you something beyond skill — the ability to levitate weapons with your mind. Your arsenal orbits you like satellites, firing with precision you couldn't achieve by hand.

Your signature ability: Amaterasu. A black, consuming fire drawn from the spiritual essence of your fallen enemies. When unleashed, it burns through any creature in your sight. Use it wisely — it has a 15-second cooldown and burns longer the more essence you've collected.

When gravely wounded, your body begins slow regeneration — but only below half health. Don't rely on it.

Sprint with the Run button to dash through danger, but watch your stamina.

The dungeon does not forgive hesitation.`
    }
}

function buildGameOverMsg(): string {
    const s = getRunStats();
    return `The darkness was too great.

The Dungeon Lord's forces overwhelmed you — and without the hunter, the village gate crumbled.

Waves reached: ${s.waveReached}  ·  Enemies slain: ${s.kills}

The villagers fled into the night. The dungeon won.

But the story isn't over. Rise again.`;
}

function buildGameWinMsg(): string {
    const s = getRunStats();
    return `The Dungeon Lord lets out one final, earth-shaking roar — then dissolves into shadow.

With his destruction, the hold over his army breaks instantly. Every zombie crumbles to dust. Every spider retreats into the deep. The crypt goes still.

Waves cleared: ${s.waveReached}  ·  Enemies slain: ${s.kills}

You walk out of the dungeon into morning light. The village bells are ringing.

The dungeon is free.`;
}

export default function loadInfoScreen(
    ctx: CanvasRenderingContext2D,
    page: 'about' | 'gameOver' | 'gameWin' | 'story1' | 'aboutHero',
    btnName: string,
    fun: (ctx: CanvasRenderingContext2D) => void,
    sound: HTMLAudioElement | null = null
) {
    const heading = InfoScreenData[page].heading;
    const msg = page === 'gameOver' ? buildGameOverMsg()
              : page === 'gameWin'  ? buildGameWinMsg()
              : InfoScreenData[page].msg;
    infoScreen(ctx, heading, msg, btnName, fun);
    setTimeout(() => {
        if (sound && !stateConstants.ismute) {
            screenConstants.prevSoundHolder = sound;
            sound.play();
        }
    }, 800);
}
