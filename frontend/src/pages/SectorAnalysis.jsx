import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ComposedChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  Cell, Legend, BarChart 
} from 'recharts';
import { ChevronDown, ArrowRight } from 'lucide-react';

import { 
  Breadcrumb, 
  RSIBadge, 
  SelectDropdown,
  SectorTagWithDot,
  MomentumBar,
  SectorHeatmapTile,
  DataTable
} from '../components';

// -----------------------------------------------------------------------------
// DUMMY DATA
// -----------------------------------------------------------------------------

const sectorData = [
  { name: 'Financials',    dayChange: +1.8,  rsi: 58.2, momentum: 72 },
  { name: 'IT Services',   dayChange: -1.5,  rsi: 38.4, momentum: 31 },
  { name: 'Consumer',      dayChange: +0.4,  rsi: 52.1, momentum: 55 },
  { name: 'Automobile',    dayChange: +2.4,  rsi: 64.8, momentum: 78 },
  { name: 'Pharma',        dayChange: -2.1,  rsi: 34.2, momentum: 28 },
  { name: 'Energy',        dayChange: +0.8,  rsi: 55.6, momentum: 61 },
  { name: 'Metals',        dayChange: -0.6,  rsi: 44.8, momentum: 42 },
  { name: 'Real Estate',   dayChange: +1.2,  rsi: 60.4, momentum: 68 },
  { name: 'Infra',         dayChange: +0.2,  rsi: 49.8, momentum: 51 },
  { name: 'FMCG',          dayChange: -0.3,  rsi: 47.2, momentum: 46 },
  { name: 'Telecom',       dayChange: +3.1,  rsi: 72.4, momentum: 88 },
  { name: 'Power',         dayChange: -1.1,  rsi: 41.6, momentum: 36 },
];

const fiiDiiData = [
  { date: '01 Dec', fiiNet: +2840,  diiNet: -1200 },
  { date: '02 Dec', fiiNet: +1920,  diiNet: -840  },
  { date: '03 Dec', fiiNet: -820,   diiNet: +2100 },
  { date: '04 Dec', fiiNet: -2400,  diiNet: +3200 },
  { date: '05 Dec', fiiNet: -1840,  diiNet: +2800 },
  { date: '08 Dec', fiiNet: +420,   diiNet: +1200 },
  { date: '09 Dec', fiiNet: +1640,  diiNet: -620  },
  { date: '10 Dec', fiiNet: +3200,  diiNet: -1840 },
  { date: '11 Dec', fiiNet: +2840,  diiNet: -2100 },
  { date: '12 Dec', fiiNet: -640,   diiNet: +1800 },
  { date: '15 Dec', fiiNet: +1100,  diiNet: -400  },
  { date: '16 Dec', fiiNet: +3400,  diiNet: -2000 },
  { date: '17 Dec', fiiNet: -500,   diiNet: +1000 },
  { date: '18 Dec', fiiNet: -2100,  diiNet: +3500 },
  { date: '19 Dec', fiiNet: -1500,  diiNet: +2400 },
  { date: '22 Dec', fiiNet: +600,   diiNet: +1500 },
  { date: '23 Dec', fiiNet: +1800,  diiNet: -800  },
  { date: '24 Dec', fiiNet: +4100,  diiNet: -2500 },
  { date: '26 Dec', fiiNet: +3200,  diiNet: -1900 },
  { date: '29 Dec', fiiNet: -800,   diiNet: +2100 },
];

const fpiAllocation = [
  { sector: 'Financials',  pct: 34.2 },
  { sector: 'IT Services', pct: 22.8 },
  { sector: 'Consumer',    pct: 12.4 },
  { sector: 'Energy',      pct:  8.6 },
  { sector: 'Automobile',  pct:  7.2 },
  { sector: 'Pharma',      pct:  6.8 },
  { sector: 'Metals',      pct:  4.4 },
  { sector: 'Others',      pct:  3.6 },
];

const sectorMomentum = [
  { sector: 'Telecom',    dayChange: +3.1, weekChange: +4.8,  monthChange: +8.2,  rsi: 72.4, momentum: 88, fiiFlow: +4200  },
  { sector: 'Automobile', dayChange: +2.4, weekChange: +3.2,  monthChange: +6.8,  rsi: 64.8, momentum: 78, fiiFlow: +2800  },
  { sector: 'Financials', dayChange: +1.8, weekChange: +2.4,  monthChange: +4.2,  rsi: 58.2, momentum: 72, fiiFlow: +5400  },
  { sector: 'Real Estate',dayChange: +1.2, weekChange: +1.8,  monthChange: +3.6,  rsi: 60.4, momentum: 68, fiiFlow: +1200  },
  { sector: 'Energy',     dayChange: +0.8, weekChange: +1.2,  monthChange: +2.8,  rsi: 55.6, momentum: 61, fiiFlow: +840   },
  { sector: 'Consumer',   dayChange: +0.4, weekChange: +0.8,  monthChange: +1.4,  rsi: 52.1, momentum: 55, fiiFlow: -420   },
  { sector: 'Infra',      dayChange: +0.2, weekChange: +0.4,  monthChange: +1.2,  rsi: 49.8, momentum: 51, fiiFlow: +280   },
  { sector: 'FMCG',       dayChange: -0.3, weekChange: -0.6,  monthChange: -0.8,  rsi: 47.2, momentum: 46, fiiFlow: -680   },
  { sector: 'Metals',     dayChange: -0.6, weekChange: -1.2,  monthChange: -2.4,  rsi: 44.8, momentum: 42, fiiFlow: -1200  },
  { sector: 'Power',      dayChange: -1.1, weekChange: -1.8,  monthChange: -3.2,  rsi: 41.6, momentum: 36, fiiFlow: -840   },
  { sector: 'IT Services',dayChange: -1.5, weekChange: -2.4,  monthChange: -4.8,  rsi: 38.4, momentum: 31, fiiFlow: -3200  },
  { sector: 'Pharma',     dayChange: -2.1, weekChange: -3.6,  monthChange: -6.4,  rsi: 34.2, momentum: 28, fiiFlow: -2400  },
];

// -----------------------------------------------------------------------------
// UTILS & COMPONENTS
// -----------------------------------------------------------------------------




const SectorAnalysis = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('30d');

  const timeRangeOptions = [
    { label: 'Last 7 Days', value: '7d' },
    { label: 'Last 30 Days', value: '30d' },
    { label: 'Last 3 Months', value: '3m' },
  ];
  
  // DataTable columns
  const columns = [
    {
      key: 'sector',
      label: 'Sector',
      type: 'badge',
      renderBadge: (row) => <SectorTagWithDot sector={row.sector} />,
    },
    {
      key: 'dayChange',
      label: 'Day Δ%',
      type: 'badge',
      align: 'right',
      renderBadge: (row) => {
        const isGain = row.dayChange >= 0;
        return (
          <span className={`font-mono ${isGain ? 'text-gain' : 'text-loss'}`}>
            {row.dayChange > 0 ? '+' : ''}{row.dayChange.toFixed(1)}%
          </span>
        );
      }
    },
    {
      key: 'weekChange',
      label: 'Week Δ%',
      type: 'badge',
      align: 'right',
      renderBadge: (row) => {
        const isGain = row.weekChange >= 0;
        return (
          <span className={`font-mono ${isGain ? 'text-gain' : 'text-loss'}`}>
            {row.weekChange > 0 ? '+' : ''}{row.weekChange.toFixed(1)}%
          </span>
        );
      }
    },
    {
      key: 'monthChange',
      label: 'Month Δ%',
      type: 'badge',
      align: 'right',
      renderBadge: (row) => {
        const isGain = row.monthChange >= 0;
        return (
          <span className={`font-mono ${isGain ? 'text-gain' : 'text-loss'}`}>
            {row.monthChange > 0 ? '+' : ''}{row.monthChange.toFixed(1)}%
          </span>
        );
      }
    },
    {
      key: 'rsi',
      label: 'RSI',
      type: 'badge',
      align: 'center',
      renderBadge: (row) => <RSIBadge value={row.rsi} />,
    },
    {
      key: 'momentum',
      label: 'Momentum',
      type: 'badge',
      renderBadge: (row) => <MomentumBar score={row.momentum} />,
    },
    {
      key: 'fiiFlow',
      label: 'FII Flow',
      type: 'badge',
      align: 'right',
      renderBadge: (row) => {
        const isGain = row.fiiFlow >= 0;
        return (
          <span className={`font-mono ${isGain ? 'text-gain' : 'text-loss'}`}>
            {row.fiiFlow > 0 ? '+' : ''}₹{row.fiiFlow.toLocaleString('en-IN')} Cr
          </span>
        );
      }
    },
    {
      key: 'action',
      label: 'Action',
      type: 'badge',
      align: 'right',
      renderBadge: (row) => (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/screener?sector=${row.sector}`);
          }}
          className="font-ui text-xs text-accent border border-accent/30 hover:border-accent hover:bg-accent/5 rounded px-2 py-1 transition-colors inline-flex items-center gap-1 cursor-pointer"
        >
          Screen <ArrowRight className="w-3 h-3" />
        </button>
      )
    }
  ];

  return (
    <div className="w-full min-h-screen bg-page flex flex-col max-w-[1440px] mx-auto font-ui text-primary relative">
      {/* 1. Breadcrumb */}
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Sector Analysis' }]} />

      <div className="px-4 md:px-page-x py-page-y flex flex-col gap-section-gap w-full">
        
        {/* 2. Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-primary">Sector Analysis</h1>
            <p className="text-sm text-muted mt-0.5">
              Institutional flows, sector momentum, and heatmap overview.
            </p>
          </div>
          
          <div className="w-40">
            <SelectDropdown 
              options={timeRangeOptions}
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            />
          </div>
        </div>

        {/* 3. Row 1: Sector Heatmap */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
          {sectorData.map((sector) => (
            <SectorHeatmapTile 
              key={sector.name} 
              sector={sector.name} 
              changeValue={sector.dayChange} 
            />
          ))}
        </div>

        {/* 4. Row 2: Charts */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* Left: FII/DII Net Flows */}
          <div className="lg:w-[60%] bg-surface border border-border rounded-lg p-4 flex flex-col">
            <h2 className="text-sm font-medium text-primary">FII / DII Net Flows (Last 30 Days)</h2>
            <div className="h-[280px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={fiiDiiData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#A1A1AA', fontFamily: 'JetBrains Mono' }}
                    interval={4}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#A1A1AA', fontFamily: 'JetBrains Mono' }}
                    tickFormatter={(val) => `${val > 0 ? '+' : ''}${val}`}
                    dx={-10}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E4E4E7', 
                      borderRadius: '6px',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                    }}
                    formatter={(value) => [`₹${value > 0 ? '+' : ''}${value} Cr`]}
                  />
                  <Legend 
                    iconType="circle" 
                    wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                  />
                  <Bar dataKey="fiiNet" name="FII Net" fill="#059669">
                    {fiiDiiData.map((entry, index) => (
                      <Cell key={`cell-fii-${index}`} fill={entry.fiiNet >= 0 ? '#059669' : '#EF4444'} />
                    ))}
                  </Bar>
                  <Bar dataKey="diiNet" name="DII Net" fill="#2563EB">
                    {fiiDiiData.map((entry, index) => (
                      <Cell key={`cell-dii-${index}`} fill={entry.diiNet >= 0 ? '#2563EB' : 'rgba(239, 68, 68, 0.6)'} />
                    ))}
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right: FPI Sector Allocation */}
          <div className="lg:w-[40%] bg-surface border border-border rounded-lg p-4 flex flex-col">
            <h2 className="text-sm font-medium text-primary">FPI Sector Allocation</h2>
            <p className="text-xs text-muted mt-0.5">Foreign Portfolio Investor holdings by sector</p>
            <div className="h-[280px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  layout="vertical" 
                  data={fpiAllocation} 
                  margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
                >
                  <XAxis 
                    type="number" 
                    domain={[0, 40]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#A1A1AA', fontFamily: 'JetBrains Mono' }}
                    tickFormatter={(val) => `${val}%`}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="sector" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#18181B' }}
                    width={90}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E4E4E7', 
                      borderRadius: '6px',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '12px'
                    }}
                    formatter={(value) => [`${value}%`, 'Allocation']}
                  />
                  <Bar dataKey="pct" fill="#F0FBF7" radius={[0, 4, 4, 0]} barSize={20}>
                    {fpiAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#0EA882" opacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 5. Row 3: Sector Momentum Table */}
        <div className="flex flex-col gap-3 w-full">
          <h2 className="text-sm font-medium text-primary">Sector Momentum</h2>
          <DataTable 
            columns={columns} 
            rows={sectorMomentum} 
            selectable={false}
            footer={
              <div className="px-4 py-3 border-t border-subtle bg-surface flex items-center justify-between font-ui text-[11px] text-muted">
                <span>Showing all {sectorMomentum.length} sectors</span>
              </div>
            }
          />
        </div>

      </div>
    </div>
  );
};

export default SectorAnalysis;
