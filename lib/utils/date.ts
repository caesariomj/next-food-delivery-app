export function formatFullDateTime(date: Date | null | undefined): string {
  if (!date || isNaN(date.getTime())) return "";

  return date
    .toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZoneName: "short",
    })
    .replace(" at ", ", ");
}

export function formatShortDate(date: Date | null | undefined): string {
  if (!date || isNaN(date.getTime())) return "";

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getRelativeTime(
  previousDate: Date,
  currentCountingDate: Date = new Date()
): string {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const DIVISIONS: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
    { amount: 60, name: "second" },
    { amount: 60, name: "minute" },
    { amount: 24, name: "hour" },
    { amount: 7, name: "day" },
    { amount: 4.34524, name: "week" },
    { amount: 12, name: "month" },
    { amount: Infinity, name: "year" },
  ];

  let durationInSeconds =
    (previousDate.getTime() - currentCountingDate.getTime()) / 1000;

  for (const division of DIVISIONS) {
    if (Math.abs(durationInSeconds) < division.amount) {
      return rtf.format(Math.round(durationInSeconds), division.name);
    }
    durationInSeconds /= division.amount;
  }

  return "just now";
}
