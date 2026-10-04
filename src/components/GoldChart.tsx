"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { GoldPoint } from "@/data/gold";
import { PERIODS, periodForYear, type Trend } from "@/data/periods";

const COLORS: Record<Trend, string> = {
  up: "rgba(34,197,94,0.15)",
  down: "rgba(239,68,68,0.18)",
  flat: "rgba(148,163,184,0.10)",
};

const LABEL: Record<Trend, string> = { up: "Rise", down: "Fall", flat: "Flat / fixed" };

export default function GoldChart({ data }: { data: GoldPoint[] }) {
  const [year, setYear] = useState(2025);
  const [log, setLog] = useState(true);
  const period = periodForYear(year);
  const point = data.find((d) => d.year === year);
  const prev = data.find((d) => d.year === year - 1);
  const change = point && prev ? ((point.price / prev.price - 1) * 100).toFixed(1) : null;

  return (
    <div>
      <label className="toggle">
        <input type="checkbox" checked={log} onChange={(e) => setLog(e.target.checked)} /> Log scale
      </label>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            onClick={(s) => {
              const label = Number(s?.activeLabel);
              if (!Number.isNaN(label)) setYear(label);
            }}
          >
            <CartesianGrid stroke="#2a2f3a" strokeDasharray="3 3" />
            {PERIODS.map((p) => (
              <ReferenceArea key={p.from} x1={p.from} x2={p.to} fill={COLORS[p.trend]} ifOverflow="visible" />
            ))}
            <XAxis dataKey="year" stroke="#94a3b8" />
            <YAxis
              stroke="#94a3b8"
              scale={log ? "log" : "linear"}
              domain={log ? [10, "auto"] : [0, "auto"]}
              tickFormatter={(v: number) => `$${v.toLocaleString()}`}
              width={70}
            />
            <Tooltip
              formatter={(v) => [`$${Number(v).toLocaleString()}`, "Gold (USD/oz)"]}
              contentStyle={{ background: "#11141b", border: "1px solid #2a2f3a" }}
            />
            <Line type="monotone" dataKey="price" stroke="#facc15" strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="muted">Click any point on the chart to see why gold moved. Shading: green = rise, red = fall, grey = flat/fixed.</p>

      {period && (
        <div className={`explain ${period.trend}`}>
          <div className="explain-head">
            <strong>{year}</strong>
            <span>{point ? `$${point.price.toLocaleString()}/oz` : ""}</span>
            {change && <span>{Number(change) >= 0 ? "+" : ""}{change}% vs {year - 1}</span>}
            <span className="badge">{LABEL[period.trend]} ({period.from}{period.to !== period.from ? `-${period.to}` : ""})</span>
          </div>
          <h3>{period.title}</h3>
          <p>{period.reason}</p>
        </div>
      )}
    </div>
  );
}
