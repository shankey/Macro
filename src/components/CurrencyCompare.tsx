"use client";

import { useMemo, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { GoldPoint } from "@/data/gold";
import type { Currency } from "@/data/currencies";
import type { FxTable } from "@/lib/fx";

const PALETTE = ["#facc15", "#38bdf8", "#f472b6", "#34d399", "#fb923c", "#a78bfa", "#f87171", "#2dd4bf"];
const END_YEAR = 2025;

export default function CurrencyCompare({
  gold,
  fx,
  currencies,
}: {
  gold: GoldPoint[];
  fx: FxTable;
  currencies: Currency[];
}) {
  const [start, setStart] = useState(2000);
  const [selected, setSelected] = useState<string[]>(["USD", "EUR", "GBP", "JPY", "CHF", "INR"]);

  const goldByYear = useMemo(() => new Map(gold.map((g) => [g.year, g.price])), [gold]);
  const price = (code: string, year: number) => {
    const g = goldByYear.get(year);
    const r = fx[code]?.[year];
    return g !== undefined && r !== undefined ? g * r : undefined;
  };

  const rows = useMemo(
    () =>
      currencies.map((c) => {
        const p0 = price(c.code, start);
        const p1 = price(c.code, END_YEAR);
        const r0 = fx[c.code]?.[start];
        const r1 = fx[c.code]?.[END_YEAR];
        return {
          ...c,
          p1,
          goldChange: p0 && p1 ? (p1 / p0 - 1) * 100 : undefined,
          currencyChange: r0 && r1 ? (r0 / r1 - 1) * 100 : undefined,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [start, fx, currencies, goldByYear],
  );

  const series = useMemo(() => {
    const out: Record<string, number | undefined>[] = [];
    for (let y = start; y <= END_YEAR; y++) {
      const row: Record<string, number | undefined> = { year: y };
      for (const code of selected) {
        const base = price(code, start);
        const p = price(code, y);
        row[code] = base && p ? (p / base) * 100 : undefined;
      }
      out.push(row);
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, selected, fx, goldByYear]);

  const toggle = (code: string) =>
    setSelected((s) => (s.includes(code) ? s.filter((c) => c !== code) : [...s, code]));

  const fmt = (n?: number, d = 0) => (n === undefined ? "n/a" : n.toLocaleString(undefined, { maximumFractionDigits: d }));
  const pct = (n?: number) => (n === undefined ? "n/a" : `${n >= 0 ? "+" : ""}${n.toFixed(0)}%`);

  return (
    <div>
      <div className="controls">
        <label>
          Start year:{" "}
          <select value={start} onChange={(e) => setStart(Number(e.target.value))}>
            {Array.from({ length: END_YEAR - 1950 }, (_, i) => 1950 + i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="chips">
        {currencies.map((c) => (
          <button key={c.code} className={selected.includes(c.code) ? "chip on" : "chip"} onClick={() => toggle(c.code)}>
            {c.code}
          </button>
        ))}
      </div>

      <div className="chart small">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series}>
            <CartesianGrid stroke="#2a2f3a" strokeDasharray="3 3" />
            <XAxis dataKey="year" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" width={60} />
            <Tooltip
              formatter={(v) => `${Number(v).toFixed(0)}`}
              contentStyle={{ background: "#11141b", border: "1px solid #2a2f3a" }}
            />
            <Legend />
            {selected.map((code, i) => (
              <Line key={code} dataKey={code} stroke={PALETTE[i % PALETTE.length]} dot={false} strokeWidth={2} connectNulls />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="muted">Gold price in each currency, indexed to 100 in {start}. A higher line means gold gained more against that currency.</p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Gold per oz ({END_YEAR})</th>
              <th>Gold change since {start}</th>
              <th>Currency vs USD since {start}</th>
            </tr>
          </thead>
          <tbody>
            {[...rows]
              .sort((a, b) => (b.goldChange ?? -Infinity) - (a.goldChange ?? -Infinity))
              .map((r) => (
                <tr key={r.code}>
                  <td>
                    <strong>{r.code}</strong> <span className="muted">{r.name}</span>
                  </td>
                  <td>{fmt(r.p1)}</td>
                  <td className={(r.goldChange ?? 0) >= 0 ? "pos" : "neg"}>{pct(r.goldChange)}</td>
                  <td className="muted">{pct(r.currencyChange)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <p className="muted">"Currency vs USD" is positive when the currency gained against the dollar.</p>
    </div>
  );
}
