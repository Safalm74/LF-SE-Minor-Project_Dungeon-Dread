export type WaveTheme = {
    name: string;
    subtitle: string;
    lore: string;
    mapTint: string;        // rgba overlay on the map
    vignetteColor: string;  // rgb for vignette edge (replaces black)
    obstacleChance: number; // % of interior tiles that become obstacles
    drumBias: number;       // % of those obstacles that are drums
    particleColor: string;  // rgba for ambient floating particles
    enemySpawnMs: number;   // ms between enemy spawn attempts
};

export const waveThemes: Record<number, WaveTheme> = {
    1: {
        name: "The Outer Gate",
        subtitle: "Wave 1  ·  The Dead Stir",
        lore: `The air at the dungeon entrance is thick with rot.\n\nShambling corpses stumble forward — the Dungeon Lord's first line of defense. They are slow, but relentless.\n\nClear them and press deeper.`,
        mapTint: "rgba(10,45,15,0.30)",
        vignetteColor: "0,0,0",
        obstacleChance: 7,
        drumBias: 65,
        particleColor: "rgba(80,180,60,",
        enemySpawnMs: 700,
    },
    2: {
        name: "The Spider Caves",
        subtitle: "Wave 2  ·  Eight-Legged Dread",
        lore: `Silk-choked tunnels stretch into darkness.\n\nGiant arachnids prowl the ceiling, dropping silently, spitting venom from every shadow. The webbing slows your movement — stay alert.\n\nThe dungeon goes deeper than the chief feared.`,
        mapTint: "rgba(55,5,80,0.38)",
        vignetteColor: "30,0,55",
        obstacleChance: 13,
        drumBias: 25,
        particleColor: "rgba(140,40,200,",
        enemySpawnMs: 600,
    },
    3: {
        name: "Crypt of the Fallen",
        subtitle: "Wave 3  ·  Ancient Evil Wakes",
        lore: `The crypt reeks of centuries.\n\nWarriors long dead rise from stone sarcophagi, their armour fused with bone. They died in battle — and they remember it.\n\nThe Dungeon Lord's power reaches even the deepest graves.`,
        mapTint: "rgba(20,35,65,0.42)",
        vignetteColor: "0,15,40",
        obstacleChance: 10,
        drumBias: 20,
        particleColor: "rgba(60,120,220,",
        enemySpawnMs: 530,
    },
    4: {
        name: "The Dark Sanctum",
        subtitle: "Wave 4  ·  The Lord's Guard",
        lore: `Shadow bleeds from the walls here.\n\nThese are not mindless undead — they are the Dungeon Lord's chosen warriors, gifted with dark power. They strike hard and fast.\n\nYou are close. He knows you are coming.`,
        mapTint: "rgba(75,5,5,0.46)",
        vignetteColor: "55,0,0",
        obstacleChance: 14,
        drumBias: 40,
        particleColor: "rgba(220,40,20,",
        enemySpawnMs: 470,
    },
    5: {
        name: "The Demon's Throne",
        subtitle: "Final Wave  ·  The Dungeon Lord",
        lore: `At the heart of the dungeon stands a demon older than the village.\n\nThe Dungeon Lord — vast, malevolent, and furious at the intruder who reached his throne.\n\nDefeat him and the dungeon's hold breaks. Fail, and the village burns.`,
        mapTint: "rgba(130,0,0,0.50)",
        vignetteColor: "100,0,0",
        obstacleChance: 5,
        drumBias: 50,
        particleColor: "rgba(255,80,0,",
        enemySpawnMs: 420,
    },
};

export function getWaveTheme(wave: number): WaveTheme {
    return waveThemes[Math.min(wave, 5)] ?? waveThemes[5];
}
