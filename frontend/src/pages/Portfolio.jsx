import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetricCard from '../components/MetricCard';
import PortfolioDonutChart from '../components/PortfolioDonutChart';
import DataTable from '../components/DataTable';
import Breadcrumb from '../components/Breadcrumb';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock Data
const metrics = [
  { label: 'Total Invested', value: '₹12,50,000', change: null, trend: 'neutral' },
  { label: 'Current Value', value: '₹14,85,200', change: null, trend: 'neutral' },
  { label: 'Total P&L', value: '+₹2,35,200', change: '+18.8%', trend: 'gain' },
  { label: "Day's P&L", value: '-₹12,400', change: '-0.8%', trend: 'loss' },
];

const sectorData = [
  { name: 'Financials', value: 35, color: '#0EA882' },
  { name: 'IT Services', value: 25, color: '#2563EB' },
  { name: 'Consumer', value: 20, color: '#F59E0B' },
  { name: 'Automobile', value: 10, color: '#8B5CF6' },
  { name: 'Others', value: 10, color: '#64748B' },
];

const holdingsColumns = [
  { key: 'ticker', label: 'Ticker', type: 'ticker' },
  { key: 'avgBuy', label: 'Avg Buy Price', type: 'number', align: 'right' },
  { key: 'ltp', label: 'LTP', type: 'number', align: 'right' },
  { key: 'qty', label: 'Quantity', type: 'number', align: 'right' },
  { key: 'invested', label: 'Invested', type: 'number', align: 'right' },
  { key: 'current', label: 'Current Value', type: 'number', align: 'right' },
  { key: 'pnlPct', label: 'P&L %', type: 'change', align: 'right' },
  { key: 'dayChange', label: 'Day Change', type: 'change', align: 'right' },
];

const holdingsData = [
  { ticker: 'HDFCBANK', avgBuy: '1,450.00', ltp: '1,520.50', qty: 100, invested: '1,45,000', current: '1,52,050', pnlPct: '+4.86%', dayChange: '+1.2%' },
  { ticker: 'RELIANCE', avgBuy: '2,400.00', ltp: '2,850.00', qty: 50, invested: '1,20,000', current: '1,42,500', pnlPct: '+18.75%', dayChange: '-0.5%' },
  { ticker: 'TCS', avgBuy: '3,600.00', ltp: '3,950.00', qty: 30, invested: '1,08,000', current: '1,18,500', pnlPct: '+9.72%', dayChange: '+0.8%' },
  { ticker: 'INFY', avgBuy: '1,550.00', ltp: '1,420.00', qty: 80, invested: '1,24,000', current: '1,13,600', pnlPct: '-8.38%', dayChange: '-1.5%' },
];

const benchmarkData = [
  { date: 'Jan', Portfolio: 100, Nifty50: 100, SP500: 100 },
  { date: 'Feb', Portfolio: 105, Nifty50: 102, SP500: 104 },
  { date: 'Mar', Portfolio: 108, Nifty50: 103, SP500: 107 },
  { date: 'Apr', Portfolio: 112, Nifty50: 106, SP500: 105 },
  { date: 'May', Portfolio: 118, Nifty50: 108, SP500: 109 },
  { date: 'Jun', Portfolio: 122, Nifty50: 110, SP500: 114 },
];

const Portfolio = () => {
  const [timeRange, setTimeRange] = useState('1Y');
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-page flex flex-col max-w-[1440px] mx-auto">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Portfolio' }]} />
      
      <div className="px-4 md:px-page-x py-page-y flex flex-col gap-section-gap">
        {/* Header */}
        <section>
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Portfolio Performance</h1>
            <p className="text-[13px] text-muted mt-1">Deep P&L analytics, asset allocation, and holdings breakdown review.</p>
          </div>
        
        {/* Hero Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <MetricCard 
              key={i}
              label={m.label}
              value={m.value}
              change={m.change}
              trend={m.trend}
            />
          ))}
        </div>
      </section>

      {/* Allocation & Benchmark Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Sector Donut: 40% width on desktop */}
        <div className="lg:col-span-2">
          <PortfolioDonutChart 
            data={sectorData}
            totalLabel="Total Assets"
            totalValue="₹14.8L"
          />
        </div>
        
        {/* Benchmark Chart: 60% width on desktop */}
        <div className="lg:col-span-3 bg-surface border border-default rounded-lg p-card-padding flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-semibold">Benchmark Comparison</h2>
            <div className="flex bg-canvas rounded-md p-1">
              {['1M', '3M', '6M', '1Y', 'All'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-[11px] font-medium rounded-sm transition-colors ${
                    timeRange === range 
                      ? 'bg-surface text-primary shadow-sm border border-default' 
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full h-64 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={benchmarkData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#A1A1AA' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#A1A1AA', fontFamily: 'JetBrains Mono' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E4E4E7', borderRadius: '6px', fontSize: '12px' }}
                  itemStyle={{ fontFamily: 'JetBrains Mono' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="Portfolio" stroke="#0EA882" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Nifty50" stroke="#2563EB" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="SP500" stroke="#F59E0B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Holdings Table */}
      <section>
        <h2 className="text-[14px] font-semibold mb-4">Current Holdings</h2>
        <DataTable 
          columns={holdingsColumns}
          rows={holdingsData}
          onRowClick={(row) => navigate('/stock/' + row.ticker, { state: { from: 'Portfolio', fromPath: '/portfolio' } })}
        />
      </section>

      </div>
    </div>
  );
};

export default Portfolio;
