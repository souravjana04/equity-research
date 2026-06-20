import { Link } from 'react-router-dom';
import { 
  MacroStrip, 
  MetricCard, 
  Card, 
  TickerBadge, 
  WatchlistCard, 
  EarningsEventCard, 
  ConcallSummaryCard, 
  NewsCard 
} from '../components';

// Dummy Data
const macroItemsData = [
  { label: 'NIFTY 50', value: '22,450', change: '+0.8%', positive: true },
  { label: 'SENSEX', value: '73,820', change: '+0.7%', positive: true },
  { label: 'USD/INR', value: '83.12', change: '+0.1%', positive: false },
  { label: 'CRUDE OIL', value: '$82.50', change: '-1.2%', positive: false },
  { label: 'US 10Y', value: '4.25%', change: '+0.05', positive: false },
  { label: 'INDIA VIX', value: '14.2', change: '-2.1%', positive: true }
];

const pulseMetricsData = [
  { label: "Day P&L", value: "-₹12,400", change: "-0.8%", positive: false },
  { label: "Portfolio Value", value: "₹14,85,200", change: null },
  { label: "Best Today", value: "HDFCBANK", change: "+1.2%", positive: true },
  { label: "Worst Today", value: "INFY", change: "-1.5%", positive: false }
];

const moversData = [
  { ticker: 'HDFCBANK', name: 'HDFC Bank', ltp: 1520.50, dayChange: 1.2, dayPnl: 3050 },
  { ticker: 'TCS', name: 'Tata Consultancy', ltp: 3950.00, dayChange: 0.8, dayPnl: 2400 },
  { ticker: 'RELIANCE', name: 'Reliance Industries', ltp: 2850.00, dayChange: -0.5, dayPnl: -5200 },
  { ticker: 'INFY', name: 'Infosys', ltp: 1420.00, dayChange: -1.5, dayPnl: -12000 }
];

const watchlistData = [
  { ticker: 'BAJFINANCE', ltp: 6820.00, dayChange: 2.1 },
  { ticker: 'ICICIBANK', ltp: 1045.00, dayChange: 0.6 },
  { ticker: 'AXISBANK', ltp: 1102.50, dayChange: -0.3 },
  { ticker: 'NAUKRI', ltp: 7340.00, dayChange: 1.8 },
  { ticker: 'ZOMATO', ltp: 198.40, dayChange: -0.9 }
];

const upcomingEarningsData = [
  { ticker: 'TCS', name: 'Tata Consultancy', event: 'Q3 Results', date: '2025-01-09', daysLeft: 2 },
  { ticker: 'INFY', name: 'Infosys', event: 'Q3 Results', date: '2025-01-11', daysLeft: 4 },
  { ticker: 'BAJFINANCE', name: 'Bajaj Finance', event: 'Q3 Results', date: '2025-01-14', daysLeft: 7 },
  { ticker: 'RELIANCE', name: 'Reliance Industries', event: 'Dividend Ex-Date', date: '2025-01-13', daysLeft: 6 }
];

const recentConcallsData = [
  { ticker: 'HDFCBANK', quarter: 'Q3 FY25', sentiment: 'positive', snippet: 'Management guided for 15-16% credit growth. NIM stabilisation around 4.1-4.2% expected.' },
  { ticker: 'TCS', quarter: 'Q3 FY25', sentiment: 'caution', snippet: 'Deal TCV robust at $13.2B but macro uncertainty delaying ramp-ups.' },
  { ticker: 'BAJFINANCE', quarter: 'Q3 FY25', sentiment: 'positive', snippet: 'AUM growth 34% YoY. B2B sales returning to normal. 3.2M new customers added.' }
];

const newsFeedData = [
  { headline: 'HDFC Bank Q3 results beat expectations, NIM improves to 4.2%', source: 'Reuters', time: '2h ago', sentiment: 'positive' },
  { headline: 'RBI keeps repo rate unchanged at 6.5%, stance remains withdrawal of accommodation', source: 'Business Standard', time: '4h ago', sentiment: 'neutral' },
  { headline: 'Infosys warns of weak discretionary spending, cuts revenue guidance', source: 'Economic Times', time: '5h ago', sentiment: 'negative' },
  { headline: 'Reliance Jio adds 4.2M subscribers in November, leads market', source: 'Mint', time: '6h ago', sentiment: 'positive' },
  { headline: 'India VIX drops to 14.2, signals lower expected volatility ahead', source: 'Moneycontrol', time: '8h ago', sentiment: 'neutral' }
];

// Helper sentiment mapping to uppercase standard expected by SentimentBadge
const sentimentMap = {
  positive: 'POSITIVE',
  caution: 'CAUTIOUS',
  cautious: 'CAUTIOUS',
  negative: 'NEGATIVE',
  neutral: 'NEUTRAL'
};

const Dashboard = () => {
  // Sort movers by absolute day change % in descending order
  const sortedMovers = [...moversData].sort((a, b) => Math.abs(b.dayChange) - Math.abs(a.dayChange));
  
  // Find maximum absolute change to scale the mover progress bars relative to the largest change
  const maxMoverChange = Math.max(...moversData.map(m => Math.abs(m.dayChange)));

  // Map macro items data to trend values expected by MacroStrip
  const mappedMacroItems = macroItemsData.map(item => ({
    label: item.label,
    value: item.value,
    change: item.change,
    trend: item.positive ? 'gain' : 'loss'
  }));

  return (
    <div className="w-full min-h-screen bg-page flex flex-col max-w-[1440px] mx-auto">
      
      {/* Row 1 — MacroStrip (full width) */}
      <section className="w-full sticky top-16 z-30">
        <MacroStrip items={mappedMacroItems} />
      </section>

      <div className="px-4 md:px-page-x py-page-y flex flex-col gap-section-gap">
        {/* Page Header */}
        <section>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Morning Briefing</h1>
            <p className="text-[13px] text-muted mt-1">Real-time market pulse, portfolio movers, and actionable events.</p>
          </div>
        </section>

        {/* Row 2 — Portfolio Pulse (4 MetricCards) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pulseMetricsData.map((m, i) => {
            const hasPositive = m.positive !== undefined;
            const trend = hasPositive ? (m.positive ? 'gain' : 'loss') : 'neutral';
            return (
              <MetricCard 
                key={i}
                label={m.label}
                value={m.value}
                change={m.change}
                trend={trend}
              />
            );
          })}
        </section>

        {/* Row 3 — Portfolio Movers (60%) & Watchlist Snapshot (40%) */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Movers: 60% (col-span-3) */}
          <div className="lg:col-span-3">
            <Card 
              header={
                <div className="flex items-center justify-between">
                  <h2 className="text-[14px] font-semibold text-primary">Today&apos;s Portfolio Movers</h2>
                  <span className="text-[11px] text-muted font-medium uppercase tracking-wider">Sorted by absolute day change</span>
                </div>
              }
            >
              <div className="flex flex-col">
                {sortedMovers.map((mover) => {
                  const isGain = mover.dayChange >= 0;
                  const trend = isGain ? 'gain' : 'loss';
                  const barWidth = maxMoverChange > 0 ? (Math.abs(mover.dayChange) / maxMoverChange) * 100 : 0;
                  
                  return (
                    <div key={mover.ticker} className="flex items-center justify-between py-3 border-b border-subtle last:border-b-0 hover:bg-page/50 px-2 transition-colors rounded-sm gap-4">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <TickerBadge ticker={mover.ticker} variant={trend} />
                        <div className="flex flex-col min-w-0">
                          <span className="font-ui text-[13px] font-medium text-primary truncate">{mover.name}</span>
                          <span className="font-mono text-[11px] text-muted">LTP: ₹{mover.ltp.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      {/* Visual Bar representation of strength */}
                      <div className="hidden sm:flex flex-1 items-center max-w-[100px] md:max-w-[140px] h-1.5 bg-canvas rounded-full overflow-hidden relative mx-4 shrink-0">
                        <div 
                          className={`absolute top-0 bottom-0 left-0 rounded-full transition-all duration-500 ${isGain ? 'bg-gain' : 'bg-loss'}`}
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>

                      <div className="text-right shrink-0 flex flex-col items-end">
                        <span className={`font-mono text-[13px] font-medium ${isGain ? 'text-gain' : 'text-loss'}`}>
                          {isGain ? '+' : ''}{mover.dayChange.toFixed(1)}%
                        </span>
                        <span className={`font-mono text-[11px] ${mover.dayPnl >= 0 ? 'text-gain' : 'text-loss'}`}>
                          {mover.dayPnl >= 0 ? '+' : ''}₹{mover.dayPnl.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Watchlist Snapshot: 40% (col-span-2) */}
          <div className="lg:col-span-2">
            <Card 
              header={
                <div className="flex items-center justify-between">
                  <h2 className="text-[14px] font-semibold text-primary">Watchlist Snapshot</h2>
                  <Link to="/watchlist" className="text-[12px] font-medium text-accent hover:text-accent-hover transition-colors">
                    View All →
                  </Link>
                </div>
              }
            >
              <div className="flex flex-col">
                {watchlistData.map((item) => (
                  <WatchlistCard 
                    key={item.ticker}
                    ticker={item.ticker}
                    ltp={item.ltp}
                    dayChange={item.dayChange}
                  />
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Row 4 — Upcoming Earnings (60%) & Recent Concalls (40%) */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Upcoming Earnings: 60% (col-span-3) */}
          <div className="lg:col-span-3">
            <Card 
              header={
                <div className="flex items-center justify-between">
                  <h2 className="text-[14px] font-semibold text-primary">Upcoming Earnings &amp; Events (7 days)</h2>
                  <Link to="/earnings" className="text-[12px] font-medium text-accent hover:text-accent-hover transition-colors">
                    View Calendar →
                  </Link>
                </div>
              }
            >
              <div className="flex flex-col">
                {upcomingEarningsData.map((item, idx) => (
                  <EarningsEventCard 
                    key={idx}
                    ticker={item.ticker}
                    name={item.name}
                    event={item.event}
                    date={item.date}
                    daysLeft={item.daysLeft}
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Concalls: 40% (col-span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-[14px] font-semibold text-primary">Recent Concalls</h2>
              <Link to="/research" className="text-[12px] font-medium text-accent hover:text-accent-hover transition-colors">
                View All →
              </Link>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {recentConcallsData.map((concall, idx) => (
                <div key={idx} className="flex-1 min-h-[96px]">
                  <ConcallSummaryCard 
                    ticker={concall.ticker}
                    quarter={concall.quarter}
                    sentiment={sentimentMap[concall.sentiment] || 'NEUTRAL'}
                    summary={concall.snippet}
                    isCompact={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Row 5 — News Feed (full width) */}
        <section className="w-full">
          <Card 
            header={
              <div className="flex items-center justify-between">
                <h2 className="text-[14px] font-semibold text-primary">Latest News Feed (24h)</h2>
                <Link to="/news" className="text-[12px] font-medium text-accent hover:text-accent-hover transition-colors">
                  View All News →
                </Link>
              </div>
            }
          >
            <div className="flex flex-col gap-3">
              {newsFeedData.map((item, idx) => (
                <NewsCard 
                  key={idx}
                  headline={item.headline}
                  source={item.source}
                  date={item.time}
                  sentiment={sentimentMap[item.sentiment] || 'NEUTRAL'}
                  isCompact={true}
                />
              ))}
            </div>
          </Card>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
