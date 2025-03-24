export function mediaDurationCalculator(duration: number) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours > 0 ? `${hours}h ` : ""}${minutes}m`;
}