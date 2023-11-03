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

export function findKeyByValue<T>(
  obj: Record<string, T>,
  targetValue: T
): string | null {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === targetValue) {
      return key;
    }
  }
  return null;
}

export function findValueByKey<T>(
  obj: Record<string, T>,
  targetKey: string
): T | null {
  if (obj.hasOwnProperty(targetKey)) {
    return obj[targetKey];
  }
  return null;
}
