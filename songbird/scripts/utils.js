export function formatTime(seconds) {
  // Format provided seconds to mm:ss
  const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
  const ss = Math.floor(seconds % 60).toString().padStart(2, '0');;

  return `${mm}:${ss}`;
}