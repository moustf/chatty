export const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);

  return `${date.getHours()}:${date.getMinutes()}`;
}