export function formatMinutesToHoursAndMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  // Build the formatted string
  let formattedTime = "";

  if (hours > 0) {
    formattedTime += hours + "h ";
  }

  if (remainingMinutes > 0) {
    formattedTime += remainingMinutes + "m";
  }

  return formattedTime;
}
