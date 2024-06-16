
export default function getRandomInt(mini: number, maxi: number): number {
    const minCeiled = Math.ceil(mini);
    const maxFloored = Math.floor(maxi);
    return (Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled));
}