import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Save, Play, Zap, Eye, ExternalLink } from 'lucide-react';
import {
  Breadcrumb,
  Tabs,
  FilterChip,
  ScreenerFilterPanel,
  DataTable,
  Badge,
  TickerBadge,
  RSIBadge,
  SignalBadge,
  TextInput,
  Button
} from '../components';

const fundamentalResults = [
  { ticker: 'HDFCBANK',   company: 'HDFC Bank',           sector: 'Financials',   ltp: 1520.50, pe: 18.2, roce: 18.4, debtEq: 0.45, mktCap: '₹11.5L Cr' },
  { ticker: 'TCS',        company: 'Tata Consultancy',    sector: 'IT Services',  ltp: 3950.00, pe: 28.5, roce: 52.1, debtEq: 0.00, mktCap: '₹14.3L Cr' },
  { ticker: 'PIDILITIND', company: 'Pidilite Industries', sector: 'Consumer',     ltp: 2840.00, pe: 72.4, roce: 28.6, debtEq: 0.02, mktCap: '₹1.4L Cr'  },
  { ticker: 'NESTLEIND',  company: 'Nestle India',        sector: 'Consumer',     ltp: 2280.00, pe: 68.2, roce: 96.4, debtEq: 0.00, mktCap: '₹20K Cr'  },
  { ticker: 'INFY',       company: 'Infosys',             sector: 'IT Services',  ltp: 1420.00, pe: 22.1, roce: 34.2, debtEq: 0.00, mktCap: '₹5.9L Cr'  },
  { ticker: 'BAJFINANCE', company: 'Bajaj Finance',       sector: 'Financials',   ltp: 6820.00, pe: 28.4, roce: 14.2, debtEq: 3.80, mktCap: '₹4.2L Cr'  },
  { ticker: 'ASIANPAINT', company: 'Asian Paints',        sector: 'Consumer',     ltp: 2420.00, pe: 52.8, roce: 33.8, debtEq: 0.05, mktCap: '₹2.3L Cr'  },
  { ticker: 'DIXON',      company: 'Dixon Technologies',  sector: 'Consumer',     ltp: 9840.00, pe: 98.2, roce: 24.6, debtEq: 0.12, mktCap: '₹0.5L Cr'  },
];

const technicalResults = [
  { ticker: 'ICICIBANK',  company: 'ICICI Bank',          ltp: 1045.00, rsi: 38.2, vs50dma: -2.1,  vs200dma: 4.8,  volSpike: '1.8x', signal: 'Oversold'         },
  { ticker: 'AXISBANK',   company: 'Axis Bank',           ltp: 1102.50, rsi: 34.8, vs50dma: -1.4,  vs200dma: 2.1,  volSpike: '2.2x', signal: 'Oversold'         },
  { ticker: 'SBIN',       company: 'State Bank of India', ltp:  780.40, rsi: 32.1, vs50dma: -3.2,  vs200dma: 1.8,  volSpike: '3.1x', signal: 'Volume Spike'     },
  { ticker: 'MARUTI',     company: 'Maruti Suzuki',       ltp: 10420.00,rsi: 29.4, vs50dma: -4.8,  vs200dma: -1.2,  volSpike: '1.4x', signal: 'Oversold'         },
  { ticker: 'LTIM',       company: 'LTIMindtree',         ltp: 5240.00, rsi: 36.8, vs50dma: -0.8,  vs200dma: 6.2,  volSpike: '1.9x', signal: 'Bullish MA Cross' },
  { ticker: 'WIPRO',      company: 'Wipro',               ltp:  480.20, rsi: 33.5, vs50dma: -2.6,  vs200dma: 0.9,  volSpike: '2.4x', signal: 'Oversold'         },
  { ticker: 'POWERGRID',  company: 'Power Grid Corp',     ltp:  298.60, rsi: 31.2, vs50dma: -5.1,  vs200dma: -2.4,  volSpike: '4.2x', signal: 'Volume Spike'     },
  { ticker: 'ZOMATO',     company: 'Zomato Ltd',          ltp:  198.40, rsi: 44.8, vs50dma: 1.2,  vs200dma: 8.4,  volSpike: '1.6x', signal: 'Volume Spike'     },
];

const fundamentalPresets = [
  'High ROCE', 'Low Debt', 'Small Cap Value', 'Quality Growth', 'Dividend Yield', 'Undervalued', 'Large Cap Compounder'
];

const technicalPresets = [
  'Oversold Bounce', 'MA Breakout', 'Volume Spike', '52W Breakout', 'Golden Cross', 'Momentum'
];

const allFundamentalFilters = [
  { id: 'pe', type: 'range', label: 'P/E Ratio', min: 0, max: 100, value: [5, 30], unit: 'x' },
  { id: 'roce', type: 'range', label: 'ROCE %', min: 0, max: 100, value: [15, 50], unit: '%' },
  { id: 'debtEq', type: 'range', label: 'Debt / Equity', min: 0, max: 5, value: [0, 0.5], unit: 'x' },
  { id: 'sector', type: 'select', label: 'Sector', options: [
      { label: 'All Sectors', value: 'all' },
      { label: 'Financials', value: 'Financials' },
      { label: 'IT Services', value: 'IT Services' },
      { label: 'Consumer', value: 'Consumer' },
      { label: 'Automobile', value: 'Automobile' },
      { label: 'Pharma', value: 'Pharma' },
      { label: 'Energy', value: 'Energy' },
      { label: 'Metals', value: 'Metals' },
    ], value: ['Financials', 'IT Services'], multiple: true },
  { id: 'mktCap', type: 'range', label: 'Market Cap', min: 0, max: 500000, value: [5000, 200000], unit: ' Cr' },
  { id: 'pb', type: 'range', label: 'P/B Ratio', min: 0, max: 20, value: [0, 5], unit: 'x' },
  { id: 'roe', type: 'range', label: 'ROE %', min: 0, max: 100, value: [15, 30], unit: '%' },
  { id: 'rev', type: 'range', label: 'Revenue Growth %', min: -50, max: 100, value: [10, 50], unit: '%' },
  { id: 'div', type: 'range', label: 'Dividend Yield %', min: 0, max: 15, value: [1, 5], unit: '%' },
  { id: 'eps', type: 'range', label: 'EPS Growth %', min: -50, max: 100, value: [15, 50], unit: '%' }
];

const allTechnicalFilters = [
  { id: 'rsi', type: 'range', label: 'RSI Range', min: 0, max: 100, value: [25, 45], unit: '' },
  { id: 'vs50', type: 'select', label: 'Price vs 50 DMA', options: [
      { label: 'Above 50 DMA', value: 'above' },
      { label: 'Below 50 DMA', value: 'below' },
      { label: 'Any', value: 'any' }
    ], value: 'above', multiple: false },
  { id: 'vol', type: 'range', label: 'Volume vs Avg', min: 0, max: 10, value: [1.5, 5], unit: 'x' },
  { id: 'vs200', type: 'select', label: 'Price vs 200 DMA', options: [
      { label: 'Above 200 DMA', value: 'above' },
      { label: 'Below 200 DMA', value: 'below' }
    ], value: 'above', multiple: false },
  { id: 'signal', type: 'select', label: 'Signal Type', options: [
      { label: 'Oversold', value: 'oversold' },
      { label: 'Breakout', value: 'breakout' },
      { label: 'Golden Cross', value: 'golden' }
    ], value: [], multiple: true },
  { id: '52w', type: 'range', label: '52W Position %', min: 0, max: 100, value: [90, 100], unit: '%' }
];

const Screener = () => {
  const [activeTab, setActiveTab] = useState('Fundamental');
  const [isSavePanelOpen, setIsSavePanelOpen] = useState(false);
  const [saveName, setSaveName] = useState('');
  
  const [fundamentalActivePresets, setFundamentalActivePresets] = useState('High ROCE');
  const [technicalActivePresets, setTechnicalActivePresets] = useState('Oversold Bounce');

  const [activeFunFilters, setActiveFunFilters] = useState(allFundamentalFilters.slice(0, 5));
  const [activeTechFilters, setActiveTechFilters] = useState(allTechnicalFilters.slice(0, 3));

  const activeFilters = activeTab === 'Fundamental' ? activeFunFilters : activeTechFilters;
  const availableFilters = activeTab === 'Fundamental' ? allFundamentalFilters : allTechnicalFilters;
  
  const handleAddFilter = (id) => {
    const filterToAdd = availableFilters.find(f => f.id === id);
    if (filterToAdd) {
      if (activeTab === 'Fundamental') {
        setActiveFunFilters([...activeFunFilters, filterToAdd]);
      } else {
        setActiveTechFilters([...activeTechFilters, filterToAdd]);
      }
    }
  };

  const handleRemoveFilter = (id) => {
    if (activeTab === 'Fundamental') {
      setActiveFunFilters(activeFunFilters.filter(f => f.id !== id));
    } else {
      setActiveTechFilters(activeTechFilters.filter(f => f.id !== id));
    }
  };

  const handleUpdateFilter = (id, newValue) => {
    if (activeTab === 'Fundamental') {
      setActiveFunFilters(activeFunFilters.map(f => f.id === id ? { ...f, value: newValue } : f));
    } else {
      setActiveTechFilters(activeTechFilters.map(f => f.id === id ? { ...f, value: newValue } : f));
    }
  };

  const renderValueColored = (val, threshold, invert = false) => {
    const isGood = invert ? val < threshold : val > threshold;
    return <span className={`font-mono ${isGood ? 'text-gain' : 'text-loss'}`}>{val}</span>;
  };

  const renderChangeColored = (val) => {
    const isGain = val >= 0;
    return <span className={`font-mono ${isGain ? 'text-gain' : 'text-loss'}`}>{isGain ? '+' : ''}{val}%</span>;
  };

  const formatCurrency = (val) => {
    return `₹${new Intl.NumberFormat('en-IN').format(val)}`;
  };

  const renderTickerLink = (ticker) => (
    <Link to={`/stock/${ticker}`} state={{ from: 'Screener', fromPath: '/screener' }} className="inline-block hover:opacity-80 transition-opacity">
      <TickerBadge ticker={ticker} />
    </Link>
  );

  const fundamentalCols = [
    { key: 'ticker', label: 'Ticker', type: 'badge', renderBadge: (row) => renderTickerLink(row.ticker) },
    { key: 'company', label: 'Name', type: 'text' },
    { key: 'sector', label: 'Sector', type: 'badge', renderBadge: (row) => <span className="text-muted">{row.sector}</span> },
    { key: 'ltp', label: 'LTP', type: 'badge', renderBadge: (row) => <span className="font-mono">{formatCurrency(row.ltp)}</span>, align: 'right' },
    { key: 'pe', label: 'P/E', type: 'number', align: 'right' },
    { key: 'roce', label: 'ROCE %', type: 'badge', renderBadge: (row) => renderValueColored(row.roce, 15), align: 'right' },
    { key: 'debtEq', label: 'Debt/Eq', type: 'badge', renderBadge: (row) => renderValueColored(row.debtEq, 0.5, true), align: 'right' },
    { key: 'mktCap', label: 'Mkt Cap', type: 'badge', renderBadge: (row) => <span className="font-mono">{row.mktCap}</span>, align: 'right' },
    { key: 'actions', label: 'Actions', type: 'badge', align: 'center', renderBadge: (row) => (
      <div className="flex items-center justify-center gap-2">
        <button className="text-accent hover:opacity-80 transition-opacity focus:outline-none" title="Add to Watchlist">
          <Eye className="w-4 h-4" />
        </button>
        <Link to={`/stock/${row.ticker}`} state={{ from: 'Screener', fromPath: '/screener' }} className="text-muted hover:text-primary transition-colors">
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    )}
  ];

  const technicalCols = [
    { key: 'ticker', label: 'Ticker', type: 'badge', renderBadge: (row) => renderTickerLink(row.ticker) },
    { key: 'company', label: 'Name', type: 'text' },
    { key: 'ltp', label: 'LTP', type: 'badge', renderBadge: (row) => <span className="font-mono">{formatCurrency(row.ltp)}</span>, align: 'right' },
    { key: 'rsi', label: 'RSI', type: 'badge', renderBadge: (row) => <RSIBadge value={row.rsi} />, align: 'right' },
    { key: 'vs50dma', label: 'vs 50 DMA', type: 'badge', renderBadge: (row) => renderChangeColored(row.vs50dma), align: 'right' },
    { key: 'vs200dma', label: 'vs 200 DMA', type: 'badge', renderBadge: (row) => renderChangeColored(row.vs200dma), align: 'right' },
    { key: 'volSpike', label: 'Vol Spike', type: 'badge', renderBadge: (row) => <span className="font-mono">{row.volSpike}</span>, align: 'right' },
    { key: 'signal', label: 'Signal', type: 'badge', renderBadge: (row) => <SignalBadge signal={row.signal} />, align: 'center' },
    { key: 'actions', label: 'Actions', type: 'badge', align: 'center', renderBadge: (row) => (
      <div className="flex items-center justify-center gap-2">
        <button className="text-accent hover:opacity-80 transition-opacity focus:outline-none" title="Add to Watchlist">
          <Eye className="w-4 h-4" />
        </button>
        <Link to={`/stock/${row.ticker}`} state={{ from: 'Screener', fromPath: '/screener' }} className="text-muted hover:text-primary transition-colors">
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    )}
  ];

  return (
    <div className="w-full min-h-screen bg-page flex flex-col font-ui text-primary">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Screener' }]} />

      <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col gap-6 px-6 py-6 pb-20">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">Screener</h1>
            <p className="text-muted mt-1">Discover new investment opportunities</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" icon={<Save className="w-4 h-4" />} onClick={() => setIsSavePanelOpen(!isSavePanelOpen)}>Save Screen</Button>
            <Button variant="primary" icon={<Play className="w-4 h-4" />}>Run Scan</Button>
          </div>
        </div>

        {/* Save Screen Panel */}
        {isSavePanelOpen && (
          <div className="bg-surface border border-default rounded-md p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1 w-full max-w-sm">
              <label className="text-sm font-medium text-primary">Save this Screen</label>
              <TextInput 
                placeholder="High ROCE + Low Debt..."
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
            <div className="flex flex-col sm:items-end gap-2 shrink-0">
              <span className="font-mono text-muted text-sm mt-1 sm:mt-0">
                Tab: {activeTab} | Filters active: {activeFilters.length}
              </span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => setIsSavePanelOpen(false)}>Cancel</Button>
                <Button variant="accent" onClick={() => setIsSavePanelOpen(false)}>Save Screen →</Button>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-subtle flex gap-6">
          {['Fundamental', 'Technical'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-[14px] transition-colors focus:outline-none ${
                activeTab === tab 
                  ? 'border-b-2 border-accent text-accent font-medium' 
                  : 'text-muted hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Preset Chips */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
          {(activeTab === 'Fundamental' ? fundamentalPresets : technicalPresets).map((preset) => {
            const isActive = activeTab === 'Fundamental' ? preset === fundamentalActivePresets : preset === technicalActivePresets;
            return (
              <button
                key={preset}
                onClick={() => activeTab === 'Fundamental' ? setFundamentalActivePresets(preset) : setTechnicalActivePresets(preset)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 border px-3 py-1 text-sm transition-colors focus:outline-none rounded-full ${
                  isActive 
                    ? 'bg-accent/10 text-accent border-accent font-medium' 
                    : 'bg-muted/10 text-primary border-default hover:bg-muted/20'
                }`}
              >
                {isActive && <Zap className="w-3 h-3" />}
                {preset}
              </button>
            );
          })}
        </div>

        {/* Filter Panel */}
        <ScreenerFilterPanel 
          activeFilters={activeFilters}
          availableFilters={availableFilters}
          onAddFilter={handleAddFilter}
          onRemoveFilter={handleRemoveFilter}
          onUpdateFilter={handleUpdateFilter}
        />

        {/* Results Table */}
        <div className="flex flex-col w-full">
          <DataTable 
            columns={activeTab === 'Fundamental' ? fundamentalCols : technicalCols}
            rows={activeTab === 'Fundamental' ? fundamentalResults : technicalResults}
            selectable={false}
            footer={
              <div className="px-4 py-3 flex justify-between items-center text-sm border-t border-subtle bg-surface">
                <span className="font-mono text-muted">Showing 8 of 847 results matching your filters</span>
                <button className="text-accent font-medium hover:opacity-80 transition-opacity focus:outline-none">
                  Load more
                </button>
              </div>
            }
          />
        </div>

      </div>
    </div>
  );
};

export default Screener;
