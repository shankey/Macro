import { GOLD_USD } from "@/data/gold";
import { CURRENCIES } from "@/data/currencies";
import { getAnnualFx, type FxTable } from "@/lib/fx";
import GoldChart from "@/components/GoldChart";
import CurrencyCompare from "@/components/CurrencyCompare";

export const revalidate = 86400;

export default async function Home() {
  let fx: FxTable | null = null;
  try {
    fx = await getAnnualFx();
  } catch {
    fx = null;
  }

  return (
    <main className="container">
      <header>
        <h1>Gold Tracker</h1>
        <p className="sub">
          A century of gold prices, with the story behind each rise and fall, and how gold has performed against 25 major currencies.
        </p>
      </header>

      <section className="card">
        <h2>Gold price in USD, 1925 to 2025</h2>
        <GoldChart data={GOLD_USD} />
      </section>

      <section className="card">
        <h2>Gold against 25 currencies</h2>
        {fx ? (
          <CurrencyCompare gold={GOLD_USD} fx={fx} currencies={CURRENCIES} />
        ) : (
          <p className="muted">Exchange-rate data is temporarily unavailable. Please try again later.</p>
        )}
      </section>

      <footer className="muted">
        <p>
          Gold: approximate annual average USD/oz (official prices before 1968). Exchange rates: Frankfurter API (central bank
          sources), annual averages; each currency starts where reliable data exists. Not investment advice.
        </p>
      </footer>
    </main>
  );
}
