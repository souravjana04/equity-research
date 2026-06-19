import { useState } from 'react';
import {
  // Layout
  PageHeader, SectionLabel, DividerLine, Card, InlayCell,
  // Nav
  TopNav, Sidebar, Breadcrumb, CommandPalette,
  // Badges
  TickerBadge, StatusBadge, EarningsBadge, SentimentBadge,
  SignalBadge, SectorTag, RSIBadge, ConcallBadge, CorporateActionBadge,
  // Forms
  SearchInput, TextInput, Textarea, SelectDropdown,
  RangeSlider, Toggle, Checkbox, RadioButton,
  // Cards
  MetricCard, StockSummaryCard, SwingTradeCard, ConcallSummaryCard,
  ThesisCard, MacroStrip, SectorHeatmapTile, PortfolioDonutChart,
  MoverBar, FinancialHealthScore,
  // Tables
  DataTable, ExpandableFinancialsTable, PeerComparisonTable, SkeletonRow,
  // Filters
  FilterChip, AddFilterButton, ScreenerFilterPanel,
  // Alerts
  AlertBanner, ToastNotification,
  // Accordions
  AccordionRow, CorporateActionRow,
  // Empty
  EmptyState,
} from './components/index.js';

const Section = ({ title, children }) => (
  <section className="mb-12">
    <div className="mb-4 pb-2 border-b border-subtle">
      <h2 className="font-ui text-[18px] font-semibold text-primary">{title}</h2>
    </div>
    <div className="flex flex-wrap gap-4 items-start">{children}</div>
  </section>
);

const Box = ({ label, children, wide }) => (
  <div className={`flex flex-col gap-2 ${wide ? 'w-full' : 'min-w-[200px]'}`}>
    <span className="font-mono text-[10px] text-muted uppercase tracking-widest">{label}</span>
    {children}
  </div>
);

const tableColumns = [
  { key: 'ticker', label: 'Ticker', type: 'ticker' },
  { key: 'name',   label: 'Name',   type: 'text' },
  { key: 'price',  label: 'Price',  type: 'number', align: 'right' },
  { key: 'change', label: 'Chg %',  type: 'change', align: 'right' },
];
const tableRows = [
  { ticker: 'RELIANCE.NS', name: 'Reliance Industries', price: '2,876.50', change: '+1.24%' },
  { ticker: 'TCS.NS',      name: 'Tata Consultancy',    price: '3,542.00', change: '-0.68%' },
  { ticker: 'HDFCBANK.NS', name: 'HDFC Bank',           price: '1,723.40', change: '+0.31%' },
  { ticker: 'INFY.NS',     name: 'Infosys',             price: '1,487.25', change: '-1.10%' },
  { ticker: 'ICICIBANK.NS',name: 'ICICI Bank',          price: '1,102.80', change: '+0.85%' },
];

export default function ComponentShowcase() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [textVal, setTextVal] = useState('');
  const [textareaVal, setTextareaVal] = useState('');
  const [rangeVal, setRangeVal] = useState(40);
  const [toggleOn, setToggleOn] = useState(true);
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState('opt1');
  const [toastVisible, setToastVisible] = useState(true);

  return (
    <div className="bg-page min-h-screen">
      {/* Top Nav */}
      <TopNav onCommandPaletteOpen={() => setPaletteOpen(true)} />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar activePage="Dashboard" collapsed={sidebarCollapsed} />

        <main className="flex-1 px-8 py-8 max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-ui text-[28px] font-bold text-primary">Component Showcase</h1>
              <p className="font-ui text-[13px] text-muted mt-1">All 48 components — visual verification</p>
            </div>
            <button
              onClick={() => setSidebarCollapsed(c => !c)}
              className="font-ui text-[12px] px-3 py-1.5 border border-default rounded-md text-secondary hover:bg-canvas transition-colors"
            >
              {sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            </button>
          </div>

          {/* ── LAYOUT ── */}
          <Section title="Layout — PageHeader · SectionLabel · DividerLine · Card · InlayCell">
            <Box label="PageHeader" wide>
              <PageHeader title="Portfolio Dashboard" subtitle="Last updated: Jun 19, 2026" />
            </Box>
            <Box label="SectionLabel">
              <SectionLabel>TOP HOLDINGS</SectionLabel>
            </Box>
            <Box label="DividerLine" wide>
              <DividerLine />
            </Box>
            <Box label="Card">
              <Card className="p-4 w-48">
                <p className="font-ui text-[13px] text-secondary">Card content here</p>
              </Card>
            </Box>
            <Box label="InlayCell">
              <InlayCell>
                <span className="font-mono text-[13px] text-primary">₹2,876.50</span>
              </InlayCell>
            </Box>
          </Section>

          {/* ── NAV ── */}
          <Section title="Nav — Breadcrumb · CommandPalette (toggle button below)">
            <Box label="Breadcrumb" wide>
              <Breadcrumb items={[{ label: 'Dashboard', href: '/' }, { label: 'Stock Detail' }, { label: 'RELIANCE.NS' }]} />
            </Box>
            <Box label="CommandPalette trigger">
              <button
                onClick={() => setPaletteOpen(true)}
                className="font-ui text-[13px] px-4 py-2 bg-accent text-surface rounded-md hover:bg-accent-hover transition-colors"
              >
                Open Command Palette ⌘K
              </button>
            </Box>
          </Section>

          <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />

          {/* ── BADGES ── */}
          <Section title="Badges — TickerBadge · StatusBadge · EarningsBadge · SentimentBadge · SignalBadge · SectorTag · RSIBadge · ConcallBadge · CorporateActionBadge">
            <Box label="TickerBadge">
              <div className="flex gap-2 flex-wrap">
                <TickerBadge ticker="RELIANCE.NS" variant="gain" />
                <TickerBadge ticker="HDFCBANK.NS" variant="loss" />
                <TickerBadge ticker="TCS.NS" variant="neutral" />
              </div>
            </Box>
            <Box label="StatusBadge">
              <div className="flex gap-2 flex-wrap">
                <StatusBadge status="ACTIVE" />
                <StatusBadge status="WATCHING" />
                <StatusBadge status="EXITED" />
              </div>
            </Box>
            <Box label="EarningsBadge">
              <div className="flex gap-2 flex-wrap">
                <EarningsBadge result="BEAT" />
                <EarningsBadge result="MISS" />
                <EarningsBadge result="IN_LINE" />
              </div>
            </Box>
            <Box label="SentimentBadge">
              <div className="flex gap-2 flex-wrap">
                <SentimentBadge sentiment="BULLISH" />
                <SentimentBadge sentiment="BEARISH" />
                <SentimentBadge sentiment="NEUTRAL" />
              </div>
            </Box>
            <Box label="SignalBadge">
              <div className="flex gap-2 flex-wrap">
                <SignalBadge signal="BUY" />
                <SignalBadge signal="SELL" />
                <SignalBadge signal="HOLD" />
              </div>
            </Box>
            <Box label="SectorTag">
              <div className="flex gap-2 flex-wrap">
                <SectorTag>Technology</SectorTag>
                <SectorTag>Financials</SectorTag>
                <SectorTag>Energy</SectorTag>
              </div>
            </Box>
            <Box label="RSIBadge">
              <div className="flex gap-2">
                <RSIBadge value={72} />
                <RSIBadge value={45} />
                <RSIBadge value={28} />
              </div>
            </Box>
            <Box label="ConcallBadge">
              <ConcallBadge />
            </Box>
            <Box label="CorporateActionBadge">
              <div className="flex gap-2 flex-wrap">
                <CorporateActionBadge status="SCHEDULED" />
                <CorporateActionBadge status="COMPLETED" />
                <CorporateActionBadge status="UPCOMING" />
              </div>
            </Box>
          </Section>

          {/* ── FORMS ── */}
          <Section title="Forms — SearchInput · TextInput · Textarea · SelectDropdown · RangeSlider · Toggle · Checkbox · RadioButton">
            <Box label="SearchInput" wide>
              <SearchInput placeholder="Search stocks, tickers…" />
            </Box>
            <Box label="TextInput">
              <TextInput label="Stock Ticker" placeholder="e.g. RELIANCE.NS" value={textVal} onChange={e => setTextVal(e.target.value)} />
            </Box>
            <Box label="TextInput (error)">
              <TextInput label="Target Price" placeholder="0.00" error="Required field" value="" onChange={() => {}} />
            </Box>
            <Box label="Textarea">
              <Textarea label="Thesis Notes" placeholder="Write your investment thesis…" value={textareaVal} onChange={e => setTextareaVal(e.target.value)} rows={3} />
            </Box>
            <Box label="SelectDropdown">
              <SelectDropdown label="Sector" options={[{ value: 'tech', label: 'Technology' }, { value: 'fin', label: 'Financials' }, { value: 'energy', label: 'Energy' }]} value="tech" onChange={() => {}} />
            </Box>
            <Box label="RangeSlider" wide>
              <RangeSlider label="PE Ratio" min={0} max={100} value={rangeVal} onChange={setRangeVal} showMinMax unit="x" />
            </Box>
            <Box label="Toggle">
              <Toggle label="Price Alerts" checked={toggleOn} onChange={() => setToggleOn(t => !t)} />
            </Box>
            <Box label="Checkbox">
              <Checkbox label="Include F&O" checked={checked} onChange={() => setChecked(c => !c)} />
            </Box>
            <Box label="RadioButton">
              <div className="flex flex-col gap-2">
                <RadioButton label="NSE" value="nse" checked={radio === 'nse'} onChange={() => setRadio('nse')} name="exchange" />
                <RadioButton label="BSE" value="bse" checked={radio === 'bse'} onChange={() => setRadio('bse')} name="exchange" />
              </div>
            </Box>
          </Section>

          {/* ── CARDS ── */}
          <Section title="Cards — MetricCard · StockSummaryCard · SwingTradeCard · ConcallSummaryCard · ThesisCard · MacroStrip · SectorHeatmapTile · PortfolioDonutChart · MoverBar · FinancialHealthScore">
            <Box label="MetricCard (surface, gain)">
              <MetricCard label="Portfolio Value" value="₹18,42,350" change="+2.4%" trend="gain" variant="surface" />
            </Box>
            <Box label="MetricCard (surface, loss)">
              <MetricCard label="Day P&L" value="-₹4,280" change="-0.23%" trend="loss" variant="surface" />
            </Box>
            <Box label="MetricCard (inlay, neutral)">
              <MetricCard label="Beta" value="1.12" variant="inlay" />
            </Box>
            <Box label="StockSummaryCard" wide>
              <StockSummaryCard
                ticker="RELIANCE.NS"
                name="Reliance Industries"
                sector="Energy"
                ltp="2,876.50"
                changePct="+1.20%"
                pe={28.4}
                roce={18.2}
                thesis="Jio + Retail dual engine; O2C margin recovery underway. Well-positioned for India's consumer supercycle."
                thesisStatus="ACTIVE"
              />
            </Box>
            <Box label="SwingTradeCard" wide>
              <SwingTradeCard
                ticker="HDFCBANK.NS"
                entry={1680}
                target={1820}
                stopLoss={1620}
                status="ACTIVE"
                setupType="Breakout"
              />
            </Box>
            <Box label="ConcallSummaryCard" wide>
              <ConcallSummaryCard
                ticker="TCS.NS"
                quarter="Q3 FY26"
                sentiment="POSITIVE"
                summary="Revenue grew 4.5% YoY driven by BFSI and manufacturing verticals. Management guided for double-digit growth in FY27."
                keyPoints={[
                  'Deal TCV of $10.2B, highest in 6 quarters',
                  'EBIT margin expanded 80bps QoQ to 24.5%',
                  'Attrition declined further to 12.5%',
                ]}
              />
            </Box>
            <Box label="ThesisCard" wide>
              <ThesisCard
                ticker="INFY.NS"
                thesis="AI tooling + Project Maximus cost programme should expand EBIT margins 150–200bps over 18 months."
                horizon="MEDIUM"
                status="ACTIVE"
                entryPrice="₹1,420"
                targetPrice="₹1,720"
              />
            </Box>
            <Box label="MacroStrip" wide>
              <MacroStrip items={[
                { label: 'USD/INR',   value: '83.42',  change: '+0.12%', trend: 'loss' },
                { label: 'WTI Crude', value: '$78.4',  change: '-0.8%',  trend: 'loss' },
                { label: 'Nifty 50',  value: '23,450', change: '+0.6%',  trend: 'gain' },
                { label: 'US 10Y',    value: '4.32%',  change: '+2bps',  trend: 'loss' },
                { label: 'Gold',      value: '$2,340', change: '+0.3%',  trend: 'gain' },
                { label: 'India VIX', value: '13.2',   change: '-4.2%',  trend: 'gain' },
              ]} />
            </Box>
            <Box label="SectorHeatmapTile">
              <div className="flex gap-3 flex-wrap">
                <SectorHeatmapTile sector="Technology" change="+2.4%" trend="gain" />
                <SectorHeatmapTile sector="Energy"     change="-1.1%" trend="loss" />
                <SectorHeatmapTile sector="Utilities"  change="0.0%"  trend="flat" />
              </div>
            </Box>
            <Box label="PortfolioDonutChart" wide>
              <PortfolioDonutChart
                data={[
                  { name: 'Large Cap', value: 52, color: '#0EA882' },
                  { name: 'Mid Cap',   value: 28, color: '#2563EB' },
                  { name: 'Small Cap', value: 12, color: '#F59E0B' },
                  { name: 'Cash',      value: 8,  color: '#A1A1AA' },
                ]}
                totalLabel="Total"
                totalValue="₹18.4L"
              />
            </Box>
            <Box label="MoverBar" wide>
              <div className="flex flex-col gap-2 w-80">
                <MoverBar ticker="RELIANCE.NS" change="+2.4%" trend="gain" barWidth={72} />
                <MoverBar ticker="HDFCBANK.NS" change="-1.1%" trend="loss" barWidth={40} />
                <MoverBar ticker="TCS.NS"      change="+0.8%" trend="gain" barWidth={55} />
              </div>
            </Box>
            <Box label="FinancialHealthScore" wide>
              <FinancialHealthScore
                scores={[
                  { label: 'Profitability', value: 82, color: '#0EA882' },
                  { label: 'Growth',        value: 68, color: '#2563EB' },
                  { label: 'Solvency',      value: 91, color: '#059669' },
                  { label: 'Efficiency',    value: 74, color: '#F59E0B' },
                ]}
              />
            </Box>
          </Section>

          {/* ── TABLES ── */}
          <Section title="Tables — DataTable · ExpandableFinancialsTable · PeerComparisonTable · SkeletonRow">
            <Box label="DataTable (live)" wide>
              <DataTable columns={tableColumns} rows={tableRows} selectable onRowClick={() => {}} />
            </Box>
            <Box label="DataTable (loading)" wide>
              <DataTable columns={tableColumns} rows={[]} loading />
            </Box>
            <Box label="SkeletonRow (standalone)">
              <div className="w-96 border border-subtle rounded-lg overflow-hidden">
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </div>
            </Box>
            <Box label="ExpandableFinancialsTable" wide>
              <ExpandableFinancialsTable
                periods={['FY23', 'FY24', 'FY25']}
                rows={[
                  { label: 'Revenue',       values: ['2,25,458', '2,40,893', '2,55,324'], yoy: 6.0 },
                  { label: 'EBITDA',        values: ['58,420',   '62,300',   '67,100'],   yoy: 7.7 },
                  { label: 'PAT',           values: ['42,303',   '45,908',   '49,240'],   yoy: 7.3 },
                  { label: 'EPS (₹)',       values: ['114.5',    '124.2',    '133.0'],    yoy: 7.1 },
                  { label: 'EBITDA Margin', values: ['25.9%',    '25.9%',    '26.3%'],   },
                ]}
              />
            </Box>
            <Box label="PeerComparisonTable" wide>
              <PeerComparisonTable
                currentTicker="TCS.NS"
                peers={[
                  { ticker: 'TCS.NS',   name: 'TCS',      pe: 28.4, evEbitda: 19.2, salesGrowth: 6.1,  roce: 52.3 },
                  { ticker: 'INFY.NS',  name: 'Infosys',  pe: 24.1, evEbitda: 16.8, salesGrowth: 4.4,  roce: 38.7 },
                  { ticker: 'WIPRO.NS', name: 'Wipro',    pe: 21.8, evEbitda: 14.5, salesGrowth: 1.2,  roce: 22.4 },
                  { ticker: 'HCLT.NS',  name: 'HCL Tech', pe: 26.5, evEbitda: 17.9, salesGrowth: 8.3,  roce: 29.1 },
                ]}
              />
            </Box>
          </Section>

          {/* ── FILTERS ── */}
          <Section title="Filters — FilterChip · AddFilterButton · ScreenerFilterPanel">
            <Box label="FilterChip">
              <div className="flex gap-2 flex-wrap">
                <FilterChip label="Sector: IT" onRemove={() => {}} />
                <FilterChip label="PE < 30" onRemove={() => {}} />
                <FilterChip label="MCap > ₹5000Cr" onRemove={() => {}} />
              </div>
            </Box>
            <Box label="AddFilterButton">
              <AddFilterButton onClick={() => {}} />
            </Box>
            <Box label="ScreenerFilterPanel" wide>
              <ScreenerFilterPanel
                filters={[
                  { label: 'Sector:', value: 'Technology' },
                  { label: 'PE <',    value: '30' },
                  { label: 'ROCE >',  value: '15%' },
                ]}
                onFilterChange={() => {}}
              />
            </Box>
          </Section>

          {/* ── ALERTS ── */}
          <Section title="Alerts — AlertBanner · ToastNotification">
            <Box label="AlertBanner" wide>
              <div className="flex flex-col gap-3 w-full">
                <AlertBanner type="success" message="Positions synced successfully from Kite." />
                <AlertBanner type="warning" message="Market closes in 15 minutes. Pending orders may not execute." />
                <AlertBanner type="error"   message="Failed to fetch price data. Retrying…" />
                <AlertBanner type="info"    message="TCS Q4 earnings scheduled for Apr 10." />
              </div>
            </Box>
            <Box label="ToastNotification">
              <div className="relative w-80 h-24">
                {toastVisible && (
                  <ToastNotification
                    type="success"
                    message="RELIANCE.NS buy at ₹2,840 added to swing journal."
                    onClose={() => setToastVisible(false)}
                  />
                )}
                {!toastVisible && (
                  <button onClick={() => setToastVisible(true)} className="font-ui text-[12px] px-3 py-1.5 border border-default rounded-md text-secondary hover:bg-canvas">
                    Show toast again
                  </button>
                )}
              </div>
            </Box>
          </Section>

          {/* ── ACCORDIONS ── */}
          <Section title="Accordions — AccordionRow · CorporateActionRow">
            <Box label="AccordionRow" wide>
              <div className="flex flex-col gap-2 w-full">
                <AccordionRow title="Q3 FY26 Highlights" defaultOpen>
                  <p className="font-ui text-[13px] text-secondary">Revenue ₹61,237 Cr, up 5.6% YoY. EBIT margin at 24.5%, in-line with guidance. Deal wins of $10.2B TCV for the quarter.</p>
                </AccordionRow>
                <AccordionRow title="Management Commentary">
                  <p className="font-ui text-[13px] text-secondary">CEO highlighted strong deal pipeline in BFSI and retail. Attrition stable at 12.5%.</p>
                </AccordionRow>
              </div>
            </Box>
            <Box label="CorporateActionRow" wide>
              <div className="border border-subtle rounded-lg overflow-hidden px-2">
                <CorporateActionRow title="Dividend — ₹28/share" subtitle="TCS.NS · Ex-date Apr 4, 2026" badge={<CorporateActionBadge status="SCHEDULED" />} />
                <CorporateActionRow title="Bonus Issue 1:1"      subtitle="INFY.NS · Record date Feb 10, 2026" badge={<CorporateActionBadge status="COMPLETED" />} />
                <CorporateActionRow title="Stock Split 5:1"      subtitle="RELIANCE.NS · May 1, 2026" badge={<CorporateActionBadge status="UPCOMING" />} />
              </div>
            </Box>
          </Section>

          {/* ── EMPTY STATE ── */}
          <Section title="Empty — EmptyState">
            <Box label="EmptyState" wide>
              <EmptyState
                title="No positions found"
                subtitle="Add stocks to your watchlist or import your portfolio from Kite to get started."
                ctaLabel="Add Stock"
                onCta={() => {}}
              />
            </Box>
          </Section>

          <div className="mt-8 pt-6 border-t border-subtle">
            <p className="font-ui text-[12px] text-muted text-center">48 components · EquityLens Design System</p>
          </div>
        </main>
      </div>
    </div>
  );
}
