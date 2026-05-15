let shakeIntensity = 0;
let shakeDuration = 0;

export function triggerShake(intensity: number = 8, duration: number = 12) {
    if (intensity > shakeIntensity) {
        shakeIntensity = intensity;
        shakeDuration = duration;
    }
}

export function applyScreenShake(ctx: CanvasRenderingContext2D): { dx: number; dy: number } {
    if (shakeDuration <= 0) return { dx: 0, dy: 0 };
    const dx = (Math.random() - 0.5) * 2 * shakeIntensity;
    const dy = (Math.random() - 0.5) * 2 * shakeIntensity;
    ctx.translate(dx, dy);
    shakeDuration--;
    shakeIntensity *= 0.88;
    if (shakeDuration <= 0) shakeIntensity = 0;
    return { dx, dy };
}
