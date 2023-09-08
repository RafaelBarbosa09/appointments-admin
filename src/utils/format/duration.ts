export const formatDuration = (duration: string): string => {
  const match = duration.match(/(\d+)H(?:(\d+)M)?/);
  if (!match) {
    return '';
  }

  const hours = parseInt(match[1]);
  if (!match[2]) {
    return `${hours}h`;
  }

  const minutes = parseInt(match[2]);

  return `${hours}h ${minutes}m`;
}