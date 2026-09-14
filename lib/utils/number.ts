export function toNumber(value: string | undefined | null): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;

  const num = Number(value);

  return Number.isNaN(num) ? undefined : num;
}
