
// convert seconds to HH:MM:SS format
export function getDurationString(duration: number): string {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  // pad with 0
  const pad = (num: number) => num.toString().padStart(2, '0');

  if(hours === 0) {
    return `${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}