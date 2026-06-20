import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Tabs from '../components/Tabs';
import MetricCard from '../components/MetricCard';
import ExpandableFinancialsTable from '../components/ExpandableFinancialsTable';
import PortfolioDonutChart from '../components/PortfolioDonutChart';
import NewsCard from '../components/NewsCard';
import ConcallSummaryCard from '../components/ConcallSummaryCard';
import CandlestickChart from '../components/CandlestickChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  stockDetailHero, 
  stockKeyMetrics, 
  stockOverview, 
  stockFinancialsPeriods,
  stockFinancialsData,
  stockShareholdingCurrent,
  stockShareholdingHistory,
  stockNews,
  stockConcalls,
  generateOHLCVData
} from '../utils/dummyData';

const MOCKED_CHART_DATA = generateOHLCVData();

const OverviewTab = () => (
  <div className="flex flex-col gap-6">
    <div>
      <h3 className="font-ui text-[14px] font-semibold mb-2">About the Company</h3>
      <p className="font-ui text-[13px] text-secondary leading-relaxed">{stockOverview.about}</p>
    </div>
    
    <div>
      <h3 className="font-ui text-[14px] font-semibold mb-3">Quick Facts</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <span className="font-ui text-[11px] text-muted uppercase tracking-tight">Market Cap</span>
          <span className="font-mono text-[13px] text-primary">{stockOverview.marketCap}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-ui text-[11px] text-muted uppercase tracking-tight">52W High</span>
          <span className="font-mono text-[13px] text-primary">{stockOverview.high52w}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-ui text-[11px] text-muted uppercase tracking-tight">52W Low</span>
          <span className="font-mono text-[13px] text-primary">{stockOverview.low52w}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-ui text-[11px] text-muted uppercase tracking-tight">Employees</span>
          <span className="font-ui text-[13px] text-primary">{stockOverview.employees}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-ui text-[11px] text-muted uppercase tracking-tight">Founded</span>
          <span className="font-ui text-[13px] text-primary">{stockOverview.founded}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-ui text-[11px] text-muted uppercase tracking-tight">Headquarters</span>
          <span className="font-ui text-[13px] text-primary">{stockOverview.headquarters}</span>
        </div>
      </div>
    </div>

    <div>
      <a href={stockOverview.thesisUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="accent">View Thesis in Notion →</Button>
      </a>
    </div>

    <div>
      <h3 className="font-ui text-[14px] font-semibold mb-2">Quick Notes</h3>
      <div className="bg-surface border border-default rounded-lg p-3">
        <textarea 
          className="w-full bg-transparent border-none outline-none font-ui text-[13px] text-primary resize-none h-24"
          placeholder="Add notes about this stock..."
          defaultValue="HDFC is a market leader in retail banking. Watch for Q3 results. Strong NIM trajectory."
        />
        <div className="flex justify-end mt-2">
          {/* Dummy button, saving to local storage can be added later */}
          <Button variant="secondary" size="sm">Save Notes</Button>
        </div>
      </div>
    </div>
  </div>
);

const FinancialsTab = () => (
  <div className="flex flex-col gap-6">
    {stockFinancialsData.map((fyData, index) => (
      <div key={index} className="flex flex-col gap-2">
        <h3 className="font-ui text-[14px] font-semibold">{fyData.fiscalYear}</h3>
        <ExpandableFinancialsTable 
          rows={fyData.rows} 
          periods={stockFinancialsPeriods} 
        />
      </div>
    ))}
  </div>
);

const ShareholdingTab = () => (
  <div className="flex flex-col lg:flex-row gap-8 items-start">
    <div className="w-full lg:w-1/2 flex flex-col items-center">
      <h3 className="font-ui text-[14px] font-semibold mb-4 w-full">Current Pattern</h3>
      <PortfolioDonutChart 
        data={stockShareholdingCurrent}
        totalLabel="Total %"
        totalValue="100%"
      />
    </div>
    <div className="w-full lg:w-1/2 flex flex-col">
      <h3 className="font-ui text-[14px] font-semibold mb-4">Historical Trend</h3>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stockShareholdingHistory} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#A1A1AA' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#A1A1AA' }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E4E4E7', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ fontSize: '12px', fontWeight: '500' }}
            />
            <Line type="monotone" dataKey="promoter" name="Promoter" stroke="#0EA882" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="fii" name="FII" stroke="#2563EB" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="dii" name="DII" stroke="#F59E0B" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="public" name="Public" stroke="#EF4444" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const NewsTab = () => (
  <div className="flex flex-col gap-4">
    <div className="flex gap-2 mb-2">
      {/* Dummy filters */}
      <Button variant="secondary" size="sm" className="bg-canvas border-default text-primary">All</Button>
      <Button variant="ghost" size="sm">Positive</Button>
      <Button variant="ghost" size="sm">Neutral</Button>
      <Button variant="ghost" size="sm">Negative</Button>
    </div>
    <div className="grid grid-cols-1 gap-4">
      {stockNews.map((news, idx) => (
        <NewsCard key={idx} {...news} />
      ))}
    </div>
  </div>
);

const ConcallsTab = () => (
  <div className="grid grid-cols-1 gap-4">
    {stockConcalls.map((call) => (
      <ConcallSummaryCard 
        key={call.id}
        ticker={call.ticker}
        quarter={call.quarter}
        sentiment={call.sentiment}
        summary={call.summary}
        keyPoints={call.keyPoints}
        actions={
          <>
            <Button variant="secondary" size="sm">Watch on YouTube</Button>
            <Button variant="accent" size="sm">View Full Summary</Button>
          </>
        }
      />
    ))}
  </div>
);

const StockDetail = () => {
  const { ticker } = useParams();
  const [chartRange, setChartRange] = useState('1M');

  const tabsData = [
    { id: 'overview', label: 'Overview', content: <OverviewTab /> },
    { id: 'financials', label: 'Financials', content: <FinancialsTab /> },
    { id: 'shareholding', label: 'Shareholding', content: <ShareholdingTab /> },
    { id: 'news', label: 'News', content: <NewsTab /> },
    { id: 'concalls', label: 'Concalls', content: <ConcallsTab /> },
  ];

  return (
    <div className="w-full min-h-screen bg-page flex flex-col max-w-[1440px] mx-auto">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Stock Detail' },
        { label: ticker || stockDetailHero.ticker, isTickerBadge: true }
      ]} />
      
      <div className="px-4 md:px-page-x py-page-y flex flex-col gap-section-gap">
        {/* Header Section */}
        <section className="bg-surface border-b border-subtle px-4 py-3 rounded-t-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Badge variant="muted">{stockDetailHero.ticker}</Badge>
          <h1 className="text-lg font-medium text-primary">{stockDetailHero.companyName}</h1>
          <Badge variant="secondary" className="bg-canvas border-default">{stockDetailHero.sector}</Badge>
          <Badge variant="muted" className="bg-canvas border-default">{stockDetailHero.exchange}</Badge>
          {stockDetailHero.rsi && stockDetailHero.rsi > 70 && (
            <span className="font-mono text-[11px] font-medium leading-[14px] bg-loss-bg border border-loss-border text-loss rounded-sm px-1.5 py-0.5 inline-flex items-center justify-center">
              RSI {stockDetailHero.rsi} (OB)
            </span>
          )}
          {stockDetailHero.rsi && stockDetailHero.rsi < 30 && (
            <span className="font-mono text-[11px] font-medium leading-[14px] bg-gain-bg border border-gain-border text-gain rounded-sm px-1.5 py-0.5 inline-flex items-center justify-center">
              RSI {stockDetailHero.rsi} (OS)
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[20px] font-medium text-primary">₹{stockDetailHero.ltp.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
          <div className="flex flex-col items-end">
            <span className={`font-mono text-[13px] ${stockDetailHero.isGain ? 'text-gain' : 'text-loss'}`}>
              {stockDetailHero.dayChangeValue > 0 ? '+' : ''}{stockDetailHero.dayChangeValue} ({stockDetailHero.dayChange})
            </span>
          </div>
        </div>
      </section>

      {/* Price Chart Section */}
      <section className="flex flex-col gap-4">
        <div className="flex gap-2">
          {['1W', '1M', '3M', '6M', '1Y'].map(range => (
            <Button 
              key={range} 
              variant={chartRange === range ? 'primary' : 'secondary'} 
              size="sm"
              onClick={() => setChartRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
        <CandlestickChart data={MOCKED_CHART_DATA} />
      </section>

      {/* Key Metrics Strip */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2">
          {stockKeyMetrics.map((m, i) => (
            <MetricCard 
              key={i}
              label={m.label}
              value={m.value}
              trend={m.trend}
            />
          ))}
        </div>
      </section>

      {/* Tabbed Content */}
      <section className="bg-surface border border-default rounded-lg p-card-padding">
        <Tabs tabs={tabsData} defaultActive="overview" />
      </section>

      </div>
    </div>
  );
};

export default StockDetail;
