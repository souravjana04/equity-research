import { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Bell, 
  BellRing, 
  Briefcase, 
  Trash2, 
  Eye, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb, 
  SelectDropdown, 
  DataTable, 
  EmptyState, 
  RSIBadge, 
  SignalBadge, 
  TickerBadge,
  PositionBar,
  AlertPopover
} from '../components';

const watchlistData = [
  {
    ticker: 'BAJFINANCE',
    company: 'Bajaj Finance',
    ltp: 6820.00,
    dayChange: 2.10,
    week52Low: 5200.00,
    week52High: 7800.00,
    pe: 28.4,
    pb: 4.2,
    roce: 14.2,
    rsi: 62.4,
    signal: 'Breakout',
    alertState: 'active',      
    alertTarget: 7000.00,
    alertDirection: 'above',
    sector: 'Financials'
  },
  {
    ticker: 'ICICIBANK',
    company: 'ICICI Bank',
    ltp: 1045.00,
    dayChange: 0.60,
    week52Low: 878.00,
    week52High: 1196.00,
    pe: 18.2,
    pb: 2.8,
    roce: 16.8,
    rsi: 38.2,
    signal: 'Oversold',
    alertState: 'unset',
    sector: 'Financials'
  },
  {
    ticker: 'AXISBANK',
    company: 'Axis Bank',
    ltp: 1102.50,
    dayChange: -0.30,
    week52Low: 890.00,
    week52High: 1339.65,
    pe: 14.6,
    pb: 1.9,
    roce: 15.4,
    rsi: 54.1,
    signal: 'Bullish MA Cross',
    alertState: 'triggered',   
    alertTarget: 1100.00,
    alertDirection: 'above',
    sector: 'Financials'
  },
  {
    ticker: 'NAUKRI',
    company: 'Info Edge India',
    ltp: 7340.00,
    dayChange: 1.80,
    week52Low: 4850.00,
    week52High: 8050.00,
    pe: 62.1,
    pb: 8.4,
    roce: 22.1,
    rsi: 74.5,
    signal: 'Overbought',
    alertState: 'unset',
    sector: 'IT Services'
  },
  {
    ticker: 'ZOMATO',
    company: 'Zomato Ltd',
    ltp: 198.40,
    dayChange: -0.90,
    week52Low: 140.00,
    week52High: 304.70,
    pe: 312.0,
    pb: 9.1,
    roce: 4.8,
    rsi: 44.8,
    signal: 'Volume Spike',
    alertState: 'active',
    alertTarget: 220.00,
    alertDirection: 'above',
    sector: 'Consumer'
  }
];

const SectorOptions = [
  { label: 'All Sectors', value: 'all' },
  { label: 'Financials', value: 'Financials' },
  { label: 'IT Services', value: 'IT Services' },
  { label: 'Consumer', value: 'Consumer' },
  { label: 'Automobile', value: 'Automobile' },
  { label: 'Pharma', value: 'Pharma' }
];

const SignalOptions = [
  { label: 'All Signals', value: 'all' },
  { label: 'Breakout', value: 'Breakout' },
  { label: 'Bullish MA Cross', value: 'Bullish MA Cross' },
  { label: 'Volume Spike', value: 'Volume Spike' },
  { label: 'Oversold', value: 'Oversold' },
  { label: 'Overbought', value: 'Overbought' }
];

const RSIOptions = [
  { label: 'All', value: 'all' },
  { label: 'Oversold (< 40)', value: 'oversold' },
  { label: 'Neutral (40-70)', value: 'neutral' },
  { label: 'Overbought (> 70)', value: 'overbought' }
];

export default function Watchlist() {
  const [data, setData] = useState(watchlistData);
  const [sectorFilter, setSectorFilter] = useState('all');
  const [signalFilter, setSignalFilter] = useState('all');
  const [rsiFilter, setRsiFilter] = useState('all');
  
  const [activePopover, setActivePopover] = useState(null); 
  const watchlistRef = useRef(null);

  const handleBellClick = (e, row) => {
    e.stopPropagation();
    if (!watchlistRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const rootRect = watchlistRef.current.getBoundingClientRect();
    
    const popoverHeight = 280; // approx height
    const popoverWidth = 280;
    
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    
    // Default to bottom
    let topOffset = (rect.bottom - rootRect.top) + 8;
    
    // Open on top if space below is tight and space above is sufficient
    if (spaceBelow < popoverHeight && spaceAbove > popoverHeight) {
      topOffset = (rect.top - rootRect.top) - popoverHeight - 8;
    }
    
    // Default open to the left (align right edges)
    let leftOffset = (rect.right - rootRect.left) - popoverWidth;
    
    // If it goes offscreen to the left, flip it to the right
    if (rect.right - popoverWidth < 0) {
      leftOffset = (rect.left - rootRect.left);
    }

    setActivePopover({
      ticker: row.ticker,
      ltp: row.ltp,
      top: topOffset,
      left: leftOffset,
    });
  };

  // Filter data based on selections
  const filteredData = data.filter(item => {
    if (sectorFilter !== 'all' && item.sector !== sectorFilter) return false;
    if (signalFilter !== 'all' && item.signal !== signalFilter) return false;
    if (rsiFilter === 'oversold' && item.rsi >= 40) return false;
    if (rsiFilter === 'neutral' && (item.rsi < 40 || item.rsi > 70)) return false;
    if (rsiFilter === 'overbought' && item.rsi <= 70) return false;
    return true;
  });

  const handleClearFilters = () => {
    setSectorFilter('all');
    setSignalFilter('all');
    setRsiFilter('all');
  };

  const handleSetAlert = (target, direction) => {
    if (!activePopover) return;
    setData(prev => prev.map(item => {
      if (item.ticker === activePopover.ticker) {
        return {
          ...item,
          alertState: 'active',
          alertTarget: parseFloat(target),
          alertDirection: direction
        };
      }
      return item;
    }));
    setActivePopover(null);
  };

  const getAlertIcon = (state) => {
    if (state === 'active') return <Bell className="w-4 h-4 text-warning fill-warning" />;
    if (state === 'triggered') return <BellRing className="w-4 h-4 text-gain fill-gain animate-pulse" />;
    return <Bell className="w-4 h-4 text-muted" />;
  };

  const columns = [
    {
      key: 'ticker',
      label: 'Ticker',
      type: 'badge',
      renderBadge: (row) => (
        <Link 
          to={`/stock/${row.ticker}`} 
          state={{ from: 'Watchlist', fromPath: '/watchlist' }}
          className="hover:opacity-80 transition-opacity"
        >
          <TickerBadge ticker={row.ticker} />
        </Link>
      )
    },
    {
      key: 'company',
      label: 'Company',
      type: 'text'
    },
    {
      key: 'ltp',
      label: 'LTP',
      type: 'badge',
      sortable: true,
      renderBadge: (row) => (
        <span className="font-mono">₹{row.ltp.toFixed(2)}</span>
      )
    },
    {
      key: 'dayChange',
      label: 'Day Δ',
      type: 'badge',
      sortable: true,
      renderBadge: (row) => {
        const isGain = row.dayChange >= 0;
        return (
          <span className={`font-mono ${isGain ? 'text-gain' : 'text-loss'}`}>
            {isGain ? '+' : ''}{row.dayChange.toFixed(2)}%
          </span>
        );
      }
    },
    {
      key: 'week52',
      label: '52W Position',
      type: 'badge',
      renderBadge: (row) => (
        <PositionBar low={row.week52Low} high={row.week52High} current={row.ltp} />
      )
    },
    {
      key: 'pe',
      label: 'P/E',
      type: 'badge',
      sortable: true,
      renderBadge: (row) => (
        <span className="font-mono">{row.pe.toFixed(1)}</span>
      )
    },
    {
      key: 'pb',
      label: 'P/B',
      type: 'number',
      renderBadge: (row) => <span className="font-mono">{row.pb.toFixed(1)}</span>
    },
    {
      key: 'roce',
      label: 'ROCE %',
      type: 'badge',
      renderBadge: (row) => {
        const isGood = row.roce > 15;
        return (
          <span className={`font-mono ${isGood ? 'text-gain' : 'text-primary'}`}>
            {row.roce.toFixed(1)}%
          </span>
        );
      }
    },
    {
      key: 'rsi',
      label: 'RSI',
      type: 'badge',
      sortable: true,
      renderBadge: (row) => (
        <RSIBadge value={row.rsi} />
      )
    },
    {
      key: 'signal',
      label: 'Signal',
      type: 'badge',
      renderBadge: (row) => <SignalBadge signal={row.signal} />
    },
    {
      key: 'alert',
      label: 'Alert',
      type: 'badge',
      renderBadge: (row) => (
        <button 
          className="p-1 hover:bg-canvas rounded transition-colors"
          onClick={(e) => handleBellClick(e, row)}
        >
          {row.alertState === 'active' && <Bell className="w-4 h-4 text-warning fill-warning" />}
          {row.alertState === 'triggered' && <BellRing className="w-4 h-4 text-gain animate-pulse" />}
          {row.alertState === 'unset' && <Bell className="w-4 h-4 text-muted" />}
        </button>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      type: 'badge',
      renderBadge: (row) => (
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-canvas rounded transition-colors group" title="Add to Portfolio">
            <Briefcase className="w-4 h-4 text-accent" />
          </button>
          <button className="p-1 hover:bg-loss/10 rounded transition-colors group" title="Remove from Watchlist">
            <Trash2 className="w-4 h-4 text-muted group-hover:text-loss transition-colors" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="w-full min-h-screen bg-page flex flex-col max-w-[1440px] mx-auto relative" ref={watchlistRef}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Watchlist' }]} />

      <div className="px-4 md:px-page-x py-page-y flex flex-col gap-section-gap">
        {/* Header and Filter */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight m-0">Watchlist</h1>
              <p className="text-[13px] text-muted mt-1">Stocks under research. Not yet held.</p>
            </div>
            <button className="flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-surface px-4 py-2 rounded-md font-ui text-sm font-medium transition-colors">
              <Plus className="w-4 h-4" />
              Add Stock
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 pt-2">
            <div className="w-40">
              <SelectDropdown 
                options={SectorOptions}
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
              />
            </div>
            <div className="w-40">
              <SelectDropdown 
                options={SignalOptions}
                value={signalFilter}
                onChange={(e) => setSignalFilter(e.target.value)}
              />
            </div>
            <div className="w-40">
              <SelectDropdown 
                options={RSIOptions}
                value={rsiFilter}
                onChange={(e) => setRsiFilter(e.target.value)}
              />
            </div>
            {(sectorFilter !== 'all' || signalFilter !== 'all' || rsiFilter !== 'all') && (
              <button 
                onClick={handleClearFilters}
                className="flex items-center gap-1 ml-2 text-accent hover:opacity-80 text-[13px] font-medium transition-opacity"
              >
                <X className="w-3.5 h-3.5" />
                Clear filters
              </button>
            )}
          </div>
        </section>

        {/* Table / Empty States */}
        <section>
          {data.length === 0 ? (
            <EmptyState 
              icon={Eye}
              title="Your watchlist is empty"
              subtitle="Add stocks from the Screener to start tracking them."
              ctaLabel="Go to Screener"
              onCta={() => window.location.href = '/screener'}
            />
          ) : filteredData.length === 0 ? (
            <EmptyState 
              icon={SlidersHorizontal}
              title="No stocks match your filters"
              subtitle="Try adjusting or clearing the filters above."
              ctaLabel="Clear Filters"
              onCta={handleClearFilters}
            />
          ) : (
            <DataTable 
              columns={columns}
              rows={filteredData}
            />
          )}
        </section>
      </div>

      {/* Absolute Alert Popover */}
      {activePopover && (
        <AlertPopover
          ticker={activePopover.ticker}
          ltp={activePopover.ltp}
          position={{ top: activePopover.top, left: activePopover.left }}
          onClose={() => setActivePopover(null)}
          onSave={handleSetAlert}
        />
      )}
    </div>
  );
}
