// export const formatDuration = (duration: string): string => {
//   const match = duration.match(/(\d+)H(?:(\d+)M)?/);
//   if (!match) {
//     return '';
//   }

//   const hours = parseInt(match[1]);
//   if (!match[2]) {
//     return `${hours}h`;
//   }

//   const minutes = parseInt(match[2]);

//   return `${hours}h ${minutes}m`;
// }

export const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);

  if (minutes <= 0) return `${hours}h`;
  if (hours <= 0) return `${minutes}m`;

  return `${hours}h ${minutes}m`;
};