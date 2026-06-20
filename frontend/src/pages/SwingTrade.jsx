import { useState, useRef } from 'react';
import { ChevronRight, Plus, Pencil, CheckCircle } from 'lucide-react';
import { 
  Breadcrumb, 
  MetricCard, 
  SwingTradeCard, 
  DataTable, 
  Badge, 
  TickerBadge, 
  Button,
  FilterPill
} from '../components';

const candidates = [
  {
    ticker: 'ICICIBANK',
    company: 'ICICI Bank',
    signal: 'Oversold',
    entryLow: 1020, entryHigh: 1040,
    target: 1140,
    stopLoss: 980,
    rr: 2.8
  },
  {
    ticker: 'SBIN',
    company: 'State Bank of India',
    signal: 'Bullish MA Cross',
    entryLow: 775, entryHigh: 785,
    target: 860,
    stopLoss: 748,
    rr: 2.2
  },
  {
    ticker: 'MARUTI',
    company: 'Maruti Suzuki',
    signal: 'Oversold',
    entryLow: 10200, entryHigh: 10400,
    target: 11400,
    stopLoss: 9800,
    rr: 2.5
  },
  {
    ticker: 'POWERGRID',
    company: 'Power Grid Corp',
    signal: 'Volume Spike',
    entryLow: 292, entryHigh: 298,
    target: 328,
    stopLoss: 282,
    rr: 1.9
  }
];

const activeTrades = [
  {
    ticker: 'HDFCBANK',
    company: 'HDFC Bank',
    entryDate: '2024-12-10',
    entryPrice: 1485.00,
    ltp: 1520.50,
    target: 1620.00,
    stopLoss: 1440.00,
    unrealisedPnl: 3550,
    unrealisedPct: 2.39,
    rr: 0.79,
    daysHeld: 10
  },
  {
    ticker: 'AXISBANK',
    company: 'Axis Bank',
    entryDate: '2024-12-08',
    entryPrice: 1120.00,
    ltp: 1102.50,
    target: 1240.00,
    stopLoss: 1080.00,
    unrealisedPnl: -1750,
    unrealisedPct: -1.56,
    rr: -0.44,
    daysHeld: 12
  }
];

const closedTrades = [
  {
    ticker: 'RELIANCE',
    entryDate: '2024-11-01', exitDate: '2024-11-18',
    entryPrice: 2680.00, exitPrice: 2840.00,
    pnlRs: 16000, pnlPct: 5.97,
    duration: '17d', outcome: 'win'
  },
  {
    ticker: 'TCS',
    entryDate: '2024-11-05', exitDate: '2024-11-22',
    entryPrice: 4020.00, exitPrice: 3880.00,
    pnlRs: -14000, pnlPct: -3.48,
    duration: '17d', outcome: 'loss'
  },
  {
    ticker: 'BAJFINANCE',
    entryDate: '2024-11-10', exitDate: '2024-11-28',
    entryPrice: 6480.00, exitPrice: 6840.00,
    pnlRs: 36000, pnlPct: 5.56,
    duration: '18d', outcome: 'win'
  },
  {
    ticker: 'WIPRO',
    entryDate: '2024-11-12', exitDate: '2024-11-26',
    entryPrice: 495.00, exitPrice: 498.00,
    pnlRs: 3000, pnlPct: 0.61,
    duration: '14d', outcome: 'breakeven'
  },
  {
    ticker: 'INFY',
    entryDate: '2024-11-15', exitDate: '2024-12-02',
    entryPrice: 1480.00, exitPrice: 1640.00,
    pnlRs: 16000, pnlPct: 10.81,
    duration: '17d', outcome: 'win'
  }
];

const formatRs = (num) => `₹${new Intl.NumberFormat('en-IN').format(num)}`;
const formatNum = (num) => new Intl.NumberFormat('en-IN').format(num);

const activeColumns = [
  { key: 'ticker', label: 'Ticker', type: 'badge', renderBadge: (row) => <TickerBadge ticker={row.ticker} /> },
  { key: 'entryDate', label: 'Entry Date', type: 'badge', renderBadge: (row) => <span className="font-mono text-xs">{row.entryDate}</span> },
  { key: 'entryPrice', label: 'Entry ₹', type: 'badge', renderBadge: (row) => <span className="font-mono">{formatNum(row.entryPrice)}</span> },
  { key: 'ltp', label: 'LTP', type: 'badge', renderBadge: (row) => {
      const isAbove = row.ltp > row.entryPrice;
      const isBelow = row.ltp < row.entryPrice;
      return <span className={`font-mono ${isAbove ? 'text-gain' : isBelow ? 'text-loss' : 'text-primary'}`}>{formatNum(row.ltp)}</span>;
    }
  },
  { key: 'target', label: 'Target ₹', type: 'badge', renderBadge: (row) => <span className="font-mono text-gain">{formatNum(row.target)}</span> },
  { key: 'stopLoss', label: 'Stop Loss ₹', type: 'badge', renderBadge: (row) => <span className="font-mono text-loss">{formatNum(row.stopLoss)}</span> },
  { key: 'unrealisedPnl', label: 'Unreal P&L', type: 'badge', renderBadge: (row) => {
      const val = row.unrealisedPnl;
      const pct = row.unrealisedPct;
      const isPositive = val > 0;
      const isNegative = val < 0;
      const color = isPositive ? 'text-gain' : isNegative ? 'text-loss' : 'text-primary';
      const sign = isPositive ? '+' : '';
      return <span className={`font-mono ${color}`}>{sign}{formatNum(val)} ({sign}{pct}%)</span>;
    }
  },
  { key: 'rr', label: 'R:R', type: 'badge', renderBadge: (row) => <span className="font-mono">{row.rr.toFixed(2)}</span> },
  { key: 'daysHeld', label: 'Days', type: 'badge', renderBadge: (row) => <span className="font-mono text-muted">{row.daysHeld}</span> },
  { key: 'actions', label: 'Actions', type: 'badge', renderBadge: () => (
      <div className="flex items-center gap-3">
        <button className="text-muted hover:text-accent transition-colors"><Pencil className="w-4 h-4" /></button>
        <button className="text-accent hover:text-accent-hover transition-colors"><CheckCircle className="w-4 h-4" /></button>
      </div>
    )
  }
];

const closedColumns = [
  { key: 'ticker', label: 'Ticker', type: 'badge', renderBadge: (row) => <TickerBadge ticker={row.ticker} /> },
  { key: 'entryDate', label: 'Entry Date', type: 'badge', renderBadge: (row) => <span className="font-mono text-xs">{row.entryDate}</span> },
  { key: 'exitDate', label: 'Exit Date', type: 'badge', renderBadge: (row) => <span className="font-mono text-xs">{row.exitDate}</span> },
  { key: 'entryPrice', label: 'Entry ₹', type: 'badge', renderBadge: (row) => <span className="font-mono">{formatNum(row.entryPrice)}</span> },
  { key: 'exitPrice', label: 'Exit ₹', type: 'badge', renderBadge: (row) => <span className="font-mono">{formatNum(row.exitPrice)}</span> },
  { key: 'pnlRs', label: 'P&L ₹', type: 'badge', renderBadge: (row) => {
      const val = row.pnlRs;
      const isPositive = val > 0;
      const color = isPositive ? 'text-gain' : val < 0 ? 'text-loss' : 'text-primary';
      const sign = isPositive ? '+' : '';
      return <span className={`font-mono ${color}`}>{sign}{formatNum(val)}</span>;
    }
  },
  { key: 'pnlPct', label: 'P&L %', type: 'badge', renderBadge: (row) => {
      const val = row.pnlPct;
      const isPositive = val > 0;
      const color = isPositive ? 'text-gain' : val < 0 ? 'text-loss' : 'text-primary';
      const sign = isPositive ? '+' : '';
      return <span className={`font-mono ${color}`}>{sign}{val}%</span>;
    }
  },
  { key: 'duration', label: 'Duration', type: 'badge', renderBadge: (row) => <span className="font-mono text-muted">{row.duration}</span> },
  { key: 'outcome', label: 'Outcome', type: 'badge', renderBadge: (row) => {
      const outcome = row.outcome ? row.outcome.toLowerCase() : '';
      let variant = 'muted';
      if (outcome === 'win') variant = 'gain';
      if (outcome === 'loss') variant = 'loss';
      return <Badge variant={variant}>{outcome}</Badge>;
    } 
  },
];

const SwingTrade = () => {
  const calcRef = useRef(null);
  
  const [entry, setEntry] = useState('1040.00');
  const [target, setTarget] = useState('1140.00');
  const [stopLoss, setStopLoss] = useState('980.00');
  const [portfolio, setPortfolio] = useState('1485200');
  const [closedFilter, setClosedFilter] = useState('All');

  const handleNewTrade = () => {
    if (calcRef.current) {
      calcRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearCalc = () => {
    setEntry('');
    setTarget('');
    setStopLoss('');
  };

  const parsedEntry = parseFloat(entry) || 0;
  const parsedTarget = parseFloat(target) || 0;
  const parsedSL = parseFloat(stopLoss) || 0;
  const parsedPort = parseFloat(portfolio) || 0;

  let rrRatio = 0;
  let rrStatus = 'Poor';
  let rrColor = 'text-loss';
  
  if (parsedEntry && parsedTarget && parsedSL && parsedEntry > parsedSL && parsedTarget > parsedEntry) {
    const risk = parsedEntry - parsedSL;
    const reward = parsedTarget - parsedEntry;
    rrRatio = reward / risk;
    if (rrRatio >= 2) {
      rrStatus = 'Good';
      rrColor = 'text-gain';
    } else if (rrRatio >= 1) {
      rrStatus = 'Acceptable';
      rrColor = 'text-warning';
    }
  }

  const maxRisk = parsedPort * 0.01;
  const slDistanceRs = parsedEntry - parsedSL;
  const slDistancePct = parsedEntry ? (slDistanceRs / parsedEntry) * 100 : 0;
  
  let positionSize = 0;
  if (slDistanceRs > 0) {
    positionSize = Math.floor(maxRisk / slDistanceRs);
  }
  const capitalReq = positionSize * parsedEntry;

  const filteredClosedTrades = closedFilter === 'All' 
    ? closedTrades 
    : closedTrades.filter(t => t.outcome.toLowerCase() === closedFilter.toLowerCase());

  return (
    <div className="w-full min-h-screen bg-page flex flex-col font-ui text-primary pb-12">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Swing Trade' }]} />
      
      <div className="px-6 py-6 flex flex-col gap-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-primary">Swing Trade</h1>
            <p className="text-sm text-muted mt-1">Track setups, manage open trades, and review closed positions.</p>
          </div>
          <Button variant="accent" onClick={handleNewTrade}>
            <Plus className="w-4 h-4 mr-2" />
            New Trade
          </Button>
        </div>

        {/* Performance Strip */}
        <div className="bg-surface border border-default rounded-lg grid grid-cols-5 divide-x divide-default">
          <div className="p-4 flex flex-col">
            <span className="text-xs text-muted mb-1">Total Realised P&L</span>
            <span className="font-mono text-lg font-medium text-gain">+₹48,240</span>
          </div>
          <div className="p-4 flex flex-col">
            <span className="text-xs text-muted mb-1">Win Rate</span>
            <span className="font-mono text-lg font-medium text-gain">62%</span>
          </div>
          <div className="p-4 flex flex-col">
            <span className="text-xs text-muted mb-1">Avg R:R (Wins)</span>
            <span className="font-mono text-lg font-medium text-gain">2.4 : 1</span>
          </div>
          <div className="p-4 flex flex-col">
            <span className="text-xs text-muted mb-1">Avg Loss</span>
            <span className="font-mono text-lg font-medium text-loss">-1.8%</span>
          </div>
          <div className="p-4 flex flex-col">
            <span className="text-xs text-muted mb-1">Total Trades</span>
            <span className="font-mono text-lg font-medium text-primary">21</span>
          </div>
        </div>

        {/* Two Columns: Candidates & Calculator */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Candidates Panel (60%) */}
          <div className="flex-1 lg:w-[60%] flex flex-col">
            <div className="mb-4">
              <h2 className="text-sm font-medium text-primary">Trade Candidates</h2>
              <p className="text-xs text-muted mt-0.5">Surfaced from Screener and Sector signals</p>
            </div>
            <div className="flex flex-col gap-3">
              {candidates.map((c, i) => (
                <SwingTradeCard key={i} {...c} />
              ))}
            </div>
          </div>

          {/* Calculator Widget (40%) */}
          <div className="lg:w-[40%] flex flex-col" ref={calcRef}>
            <h2 className="text-sm font-medium text-primary mb-4">R:R Calculator</h2>
            <div className="bg-surface border border-default rounded-lg p-5 flex flex-col">
              
              <div className="flex flex-col gap-3">
                <label className="flex flex-col">
                  <span className="text-xs text-muted mb-1">Entry Price</span>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm font-mono">₹</span>
                    <input 
                      type="number" 
                      value={entry} 
                      onChange={(e) => setEntry(e.target.value)}
                      className="w-full bg-page border border-default rounded-md pl-7 pr-3 py-2 font-mono text-sm text-primary focus:outline-none focus:border-accent"
                    />
                  </div>
                </label>
                <label className="flex flex-col">
                  <span className="text-xs text-muted mb-1">Target Price</span>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm font-mono">₹</span>
                    <input 
                      type="number" 
                      value={target} 
                      onChange={(e) => setTarget(e.target.value)}
                      className="w-full bg-page border border-default rounded-md pl-7 pr-3 py-2 font-mono text-sm text-primary focus:outline-none focus:border-accent"
                    />
                  </div>
                </label>
                <label className="flex flex-col">
                  <span className="text-xs text-muted mb-1">Stop Loss</span>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm font-mono">₹</span>
                    <input 
                      type="number" 
                      value={stopLoss} 
                      onChange={(e) => setStopLoss(e.target.value)}
                      className="w-full bg-page border border-default rounded-md pl-7 pr-3 py-2 font-mono text-sm text-primary focus:outline-none focus:border-accent"
                    />
                  </div>
                </label>
                <label className="flex flex-col">
                  <span className="text-xs text-muted mb-1">Portfolio Value</span>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm font-mono">₹</span>
                    <input 
                      type="number" 
                      value={portfolio} 
                      onChange={(e) => setPortfolio(e.target.value)}
                      className="w-full bg-page border border-default rounded-md pl-7 pr-3 py-2 font-mono text-sm text-muted focus:outline-none focus:border-accent"
                    />
                  </div>
                </label>
              </div>

              <div className="border-t border-default mt-5 pt-4 flex flex-col gap-2">
                <span className="text-xs font-medium text-primary mb-1 uppercase tracking-wider">Computed</span>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted">R:R Ratio</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-sm font-bold ${rrColor}`}>{rrRatio > 0 ? rrRatio.toFixed(1) : '0.0'} : 1</span>
                    <span className="text-[11px] bg-canvas px-1.5 py-0.5 rounded text-primary">
                      {rrStatus === 'Good' ? '✅ Good' : rrStatus === 'Acceptable' ? '⚠️ Acceptable' : '❌ Poor'}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted">Max Risk (1%)</span>
                  <span className="font-mono text-sm text-loss">₹{formatNum(maxRisk)}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted">SL Distance</span>
                  <span className="font-mono text-sm text-primary">₹{formatNum(slDistanceRs)} ({slDistancePct.toFixed(2)}%)</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted">Position Size</span>
                  <span className="font-mono text-sm font-bold text-primary">{formatNum(positionSize)} shares</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted">Capital Required</span>
                  <span className="font-mono text-sm text-primary">₹{formatNum(capitalReq)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <Button variant="ghost" onClick={handleClearCalc}>Clear</Button>
                <Button variant="accent">Open Trade →</Button>
              </div>

            </div>
          </div>
        </div>

        {/* Active Trades */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-sm font-medium text-primary">Active Trades</h2>
            <span className="bg-accent/10 text-accent rounded-full px-2 py-0.5 text-[11px] font-medium">2 open</span>
          </div>
          <DataTable rows={activeTrades} columns={activeColumns} />
        </div>

        {/* Closed Trades Log */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-primary">Closed Trades</h2>
            <div className="flex items-center gap-2">
              {['All', 'Win', 'Loss', 'Breakeven'].map(f => (
                <FilterPill 
                  key={f} 
                  label={f} 
                  active={closedFilter === f} 
                  onClick={() => setClosedFilter(f)} 
                />
              ))}
            </div>
          </div>
          <DataTable 
            rows={filteredClosedTrades} 
            columns={closedColumns} 
            getRowClassName={(row) => {
              const outcome = row.outcome.toLowerCase();
              if (outcome === 'win') return 'bg-gain/5';
              if (outcome === 'loss') return 'bg-loss/5';
              return '';
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default SwingTrade;
