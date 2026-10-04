import { CURRENCIES } from "@/data/currencies";

// rates[code][year] = units of `code` per 1 USD, averaged over the year.
export type FxTable = Record<string, Record<number, number>>;

type Row = { date: string; quote: string; rate: number };

export async function getAnnualFx(): Promise<FxTable> {
  const quotes = CURRENCIES.filter((c) => c.code !== "USD")
    .map((c) => c.code)
    .join(",");
  const url = `https://api.frankfurter.dev/v2/rates?from=1950-01-01&base=USD&quotes=${quotes}&group=month`;

  const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });
  if (!res.ok) throw new Error(`FX request failed: ${res.status}`);
  const rows = (await res.json()) as Row[];

  const sums: Record<string, Record<number, { total: number; n: number }>> = {};
  for (const r of rows) {
    const year = Number(r.date.slice(0, 4));
    const bucket = ((sums[r.quote] ??= {})[year] ??= { total: 0, n: 0 });
    bucket.total += r.rate;
    bucket.n += 1;
  }

  const table: FxTable = { USD: {} };
  for (let y = 1925; y <= new Date().getFullYear(); y++) table.USD[y] = 1;
  for (const [code, years] of Object.entries(sums)) {
    table[code] = {};
    for (const [y, b] of Object.entries(years)) table[code][Number(y)] = b.total / b.n;
  }
  return table;
}
