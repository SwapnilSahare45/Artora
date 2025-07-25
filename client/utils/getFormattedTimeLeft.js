export const getFormattedTimeLeft = (endDate) => {
  const now = new Date();
  const end = new Date(endDate);
  const diff = Math.max(0, end - now); // In milliseconds

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${days}d:${hours}h:${minutes}m:${seconds}s`;
};