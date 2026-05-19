const runStats = { kills: 0, waveReached: 1 };

export function resetRunStats() {
    runStats.kills = 0;
    runStats.waveReached = 1;
}

export function recordKill() { runStats.kills++; }
export function setRunWave(w: number) { runStats.waveReached = w; }
export function getRunStats() { return { ...runStats }; }
