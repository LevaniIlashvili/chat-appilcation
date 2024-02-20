export function formatTime(dateTime: Date | string): string {
  const now = new Date();
  const targetDate = new Date(dateTime);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  if (now.toDateString() === targetDate.toDateString()) {
    return targetDate.toLocaleTimeString([], timeOptions);
  }

  if (
    now.getFullYear() === targetDate.getFullYear() &&
    now.getMonth() === targetDate.getMonth() &&
    now.getDate() - targetDate.getDate() <= 7
  ) {
    return targetDate.toLocaleString("en-US", {
      weekday: "short",
      ...timeOptions,
    });
  }

  if (now.getFullYear() === targetDate.getFullYear()) {
    return targetDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      ...timeOptions,
    });
  }

  return targetDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...timeOptions,
  });
}
