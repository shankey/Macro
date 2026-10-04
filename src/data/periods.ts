export type Trend = "up" | "down" | "flat";

export type Period = {
  from: number;
  to: number;
  trend: Trend;
  title: string;
  reason: string;
};

// Historical context for each phase of the gold price. These are widely cited drivers, not proof of single causes.
export const PERIODS: Period[] = [
  {
    from: 1925,
    to: 1933,
    trend: "flat",
    title: "Classical gold standard: price fixed at $20.67",
    reason:
      "The US dollar was convertible to gold at a fixed $20.67/oz, so the price could not move. In 1933 the Roosevelt administration banned private gold hoarding (Executive Order 6102) and took the dollar off gold domestically during the Great Depression.",
  },
  {
    from: 1934,
    to: 1934,
    trend: "up",
    title: "Gold revalued to $35 (Gold Reserve Act)",
    reason:
      "The Gold Reserve Act of 1934 raised the official price from $20.67 to $35 per ounce, a roughly 69% devaluation of the dollar against gold, intended to fight deflation and boost reserves.",
  },
  {
    from: 1935,
    to: 1967,
    trend: "flat",
    title: "Bretton Woods era: $35 peg",
    reason:
      "After WWII the Bretton Woods system tied currencies to the dollar and the dollar to gold at $35/oz for foreign central banks. The price stayed pinned, even as US inflation and foreign dollar holdings slowly built pressure on the peg.",
  },
  {
    from: 1968,
    to: 1974,
    trend: "up",
    title: "Peg collapses; inflation and oil shock",
    reason:
      "The London Gold Pool broke down in 1968, creating a free market price. In 1971 the US ended dollar convertibility to gold, and the 1973 oil embargo fueled high inflation. US citizens regained the right to own bullion in 1975 (effective 31 Dec 1974). Gold repriced upward toward market levels.",
  },
  {
    from: 1975,
    to: 1976,
    trend: "down",
    title: "Post-peak correction",
    reason:
      "After the 1974 spike, US Treasury and IMF gold sales/auctions, a recession-driven drop in inflation fears, and higher real interest rates drove a correction of roughly 40% from the late-1974 peak.",
  },
  {
    from: 1977,
    to: 1980,
    trend: "up",
    title: "Stagflation, Iran revolution, Afghanistan invasion",
    reason:
      "US inflation reached double digits, the dollar weakened, and the 1979 Iranian revolution plus the Soviet invasion of Afghanistan raised geopolitical fear. Gold peaked near $850/oz in January 1980.",
  },
  {
    from: 1981,
    to: 1985,
    trend: "down",
    title: "Volcker rate shock and strong dollar",
    reason:
      "Fed chair Paul Volcker pushed the federal funds rate to around 20% to break inflation. Very high real yields and a surging dollar made non-yielding gold unattractive, and prices fell for years.",
  },
  {
    from: 1986,
    to: 1987,
    trend: "up",
    title: "Weaker dollar and the 1987 crash",
    reason:
      "The 1985 Plaza Accord weakened the dollar, and the October 1987 stock market crash pushed some investors toward safe havens.",
  },
  {
    from: 1988,
    to: 2001,
    trend: "down",
    title: "Disinflation, equity boom, central bank selling",
    reason:
      "Low inflation, a long equity bull market, positive real interest rates and a strong dollar reduced demand for gold. Central banks sold reserves; the Bank of England's 1999-2002 sales (the 'Brown Bottom') pushed prices to about 20-year lows near $250.",
  },
  {
    from: 2002,
    to: 2012,
    trend: "up",
    title: "Secular bull market: weak dollar, crises, QE",
    reason:
      "The Washington Agreement (1999) capped central bank sales; a weaker dollar, the 2008 financial crisis, near-zero interest rates, quantitative easing, and the 2011 euro-zone crisis and US credit downgrade drove gold to about $1,900/oz in September 2011.",
  },
  {
    from: 2013,
    to: 2015,
    trend: "down",
    title: "Fed taper talk and ETF outflows",
    reason:
      "Expectations that the Fed would end quantitative easing lifted the dollar and real yields. Gold had its worst year in decades in 2013 (about -28%) as large ETF holders sold.",
  },
  {
    from: 2016,
    to: 2018,
    trend: "flat",
    title: "Range-bound: rising US rates vs. political uncertainty",
    reason:
      "Gradual Fed rate hikes and a firm dollar offset safe-haven demand from Brexit and US political uncertainty, leaving prices in a narrow range.",
  },
  {
    from: 2019,
    to: 2020,
    trend: "up",
    title: "Rate cuts, COVID-19 and stimulus",
    reason:
      "The Fed cut rates in 2019, then slashed them to near zero during COVID-19 with massive stimulus and falling real yields. Gold hit a record of about $2,075/oz in August 2020.",
  },
  {
    from: 2021,
    to: 2022,
    trend: "flat",
    title: "Inflation surge vs. aggressive Fed hikes",
    reason:
      "High inflation supported gold, but the fastest Fed tightening in decades and a very strong dollar capped gains. Russia's 2022 invasion of Ukraine and the freezing of its reserves boosted central bank interest in holding gold.",
  },
  {
    from: 2023,
    to: 2025,
    trend: "up",
    title: "Record central bank buying and new all-time highs",
    reason:
      "Central banks bought historically large amounts of gold, geopolitical risk stayed high, markets priced Fed rate cuts, and concern about dollar reserves and public debt grew. Gold set repeated records and crossed $4,000/oz in October 2025.",
  },
];

export function periodForYear(year: number): Period | undefined {
  return PERIODS.find((p) => year >= p.from && year <= p.to);
}
