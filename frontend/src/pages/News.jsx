import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Newspaper, Search, ChevronRight, ChevronDown, AlertTriangle, X } from 'lucide-react';
import { 
  Breadcrumb, 
  SearchInput, 
  SelectDropdown, 
  Card, 
  TickerBadge, 
  SentimentBadge, 
  EmptyState,
  FilterPill
} from '../components';

const newsData = [
  {
    ticker: 'HDFCBANK',
    company: 'HDFC Bank Limited',
    type: 'holding',
    articles: [
      {
        id: 1,
        headline: 'HDFC Bank Q3 results beat expectations, NIM improves to 4.2% on strong retail deposit growth',
        source: 'Reuters',
        timeAgo: '2h ago',
        sentiment: 'positive',
        excerpt: 'HDFC Bank reported Q3 FY25 results with net interest margins expanding to 4.2%, ahead of analyst estimates of 4.0%.',
        url: '#'
      },
      {
        id: 2,
        headline: 'RBI satisfied with HDFC Bank\'s post-merger integration progress, no further restrictions expected',
        source: 'Business Standard',
        timeAgo: '5h ago',
        sentiment: 'positive',
        excerpt: 'The Reserve Bank of India has signalled comfort with HDFC Bank\'s merger integration pace, lifting overhang on the stock.',
        url: '#'
      },
      {
        id: 3,
        headline: 'HDFC Bank net interest margin under pressure from higher cost of funds, analysts say',
        source: 'Mint',
        timeAgo: '1d ago',
        sentiment: 'neutral',
        excerpt: 'Several brokerages flagged that rising deposit costs could cap NIM expansion beyond 4.2% in the near term.',
        url: '#'
      }
    ]
  },
  {
    ticker: 'INFY',
    company: 'Infosys Limited',
    type: 'holding',
    articles: [
      {
        id: 4,
        headline: 'Infosys warns of weak discretionary spending, cuts FY25 revenue guidance to 4.5–5%',
        source: 'Economic Times',
        timeAgo: '3h ago',
        sentiment: 'negative',
        excerpt: 'Infosys trimmed its full-year revenue growth guidance citing continued client caution on discretionary IT spending.',
        url: '#'
      },
      {
        id: 5,
        headline: 'Infosys loses two large retail banking deals to Accenture in Q3, sources say',
        source: 'The Ken',
        timeAgo: '6h ago',
        sentiment: 'negative',
        excerpt: 'Two major North American banking clients awarded multi-year transformation contracts to Accenture over Infosys bids.',
        url: '#'
      },
      {
        id: 6,
        headline: 'Infosys CEO Salil Parekh sells shares worth ₹42 Cr under pre-planned divestment schedule',
        source: 'Moneycontrol',
        timeAgo: '8h ago',
        sentiment: 'negative',
        excerpt: 'Salil Parekh exercised ESOPs and sold shares in a pre-scheduled transaction; company says this is routine.',
        url: '#'
      }
    ]
  },
  {
    ticker: 'BAJFINANCE',
    company: 'Bajaj Finance Limited',
    type: 'watchlist',
    articles: [
      {
        id: 7,
        headline: 'Bajaj Finance AUM crosses ₹3.5 lakh crore, fastest growth in 6 quarters',
        source: 'CNBC TV18',
        timeAgo: '4h ago',
        sentiment: 'positive',
        excerpt: 'Bajaj Finance reported assets under management of ₹3.5L Cr, growing 34% YoY driven by B2B and rural lending segments.',
        url: '#'
      },
      {
        id: 8,
        headline: 'RBI draft circular on NBFC liquidity norms may raise Bajaj Finance\'s compliance costs',
        source: 'Business Line',
        timeAgo: '12h ago',
        sentiment: 'neutral',
        excerpt: 'A proposed RBI circular on liquidity coverage ratios for large NBFCs could require additional buffer capital.',
        url: '#'
      },
      {
        id: 9,
        headline: 'Bajaj Finance announces ₹10,000 Cr NCD issue to fund loan book expansion',
        source: 'Reuters',
        timeAgo: '1d ago',
        sentiment: 'neutral',
        excerpt: 'The company filed for a non-convertible debenture issue at competitive rates to fund its next phase of growth.',
        url: '#'
      }
    ]
  }
];

const News = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [timeRange, setTimeRange] = useState('24h');
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());
  const [expandedGroups, setExpandedGroups] = useState(
    newsData.reduce((acc, group) => {
      acc[group.ticker] = true;
      return acc;
    }, {})
  );

  const toggleGroup = (ticker) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [ticker]: !prev[ticker],
    }));
  };

  const handleDismissAlert = (ticker) => {
    setDismissedAlerts((prev) => {
      const next = new Set(prev);
      next.add(ticker);
      return next;
    });
  };

  const filteredData = useMemo(() => {
    let result = newsData.map((group) => ({
      ...group,
      articles: [...group.articles],
    }));

    if (activeFilter === 'Holdings only') {
      result = result.filter((g) => g.type === 'holding');
    } else if (activeFilter === 'Watchlist only') {
      result = result.filter((g) => g.type === 'watchlist');
    } else if (activeFilter === 'Positive') {
      result = result.map((g) => ({
        ...g,
        articles: g.articles.filter((a) => a.sentiment === 'positive'),
      })).filter((g) => g.articles.length > 0);
    } else if (activeFilter === 'Negative') {
      result = result.map((g) => ({
        ...g,
        articles: g.articles.filter((a) => a.sentiment === 'negative'),
      })).filter((g) => g.articles.length > 0);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.map((g) => {
        if (g.ticker.toLowerCase().includes(q) || g.company.toLowerCase().includes(q)) {
          return g;
        }
        const matchedArticles = g.articles.filter(
          (a) => a.headline.toLowerCase().includes(q) || a.excerpt?.toLowerCase().includes(q)
        );
        return { ...g, articles: matchedArticles };
      }).filter((g) => g.articles.length > 0);
    }

    return result;
  }, [searchQuery, activeFilter]);

  const totalArticles = filteredData.reduce((acc, g) => acc + g.articles.length, 0);

  const alerts = useMemo(() => {
    const activeAlerts = [];
    newsData.forEach((group) => {
      if (group.type === 'holding' && !dismissedAlerts.has(group.ticker)) {
        const negativeCount = group.articles.filter((a) => a.sentiment === 'negative').length;
        if (negativeCount >= 3) {
          activeAlerts.push({
            ticker: group.ticker,
            count: negativeCount,
          });
        }
      }
    });
    return activeAlerts;
  }, [dismissedAlerts]);

  const timeRangeOptions = [
    { label: 'Last 24h', value: '24h' },
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
  ];

  return (
    <div className="w-full min-h-screen bg-page flex flex-col max-w-[1440px] mx-auto font-ui text-primary pb-12">
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' }, 
          { label: 'News' }
        ]} 
      />

      <div className="px-4 md:px-page-x py-page-y flex flex-col gap-section-gap w-full">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-primary">News</h1>
            <p className="text-sm text-muted">Sentiment-tagged headlines across your holdings and watchlist.</p>
          </div>
          <div className="w-full sm:w-[280px]">
            <SearchInput 
              placeholder="Search headlines, tickers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Alert Banners */}
        {alerts.map((alert) => (
          <div 
            key={`alert-${alert.ticker}`}
            className="w-full flex items-start gap-3 p-3 bg-loss/10 border-l-4 border-loss rounded-r-md border-y border-r border-loss/30"
          >
            <AlertTriangle className="w-4 h-4 shrink-0 text-loss mt-0.5" />
            <div className="flex-1 font-ui text-[13px] leading-[18px] text-primary">
              <span className="font-medium text-loss mr-1">⚠️ Negative sentiment spike detected</span>
              <br />
              {alert.ticker} — {alert.count} negative articles in the last 24 hours.{' '}
              <button 
                onClick={() => {
                  setActiveFilter('All');
                  setSearchQuery(alert.ticker);
                }}
                className="text-loss underline hover:text-loss/80 transition-colors"
              >
                View {alert.ticker} News →
              </button>
            </div>
            <button 
              onClick={() => handleDismissAlert(alert.ticker)}
              className="shrink-0 p-1 rounded-md hover:bg-black/5 text-muted hover:text-primary transition-colors focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Filter Bar */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Holdings only', 'Watchlist only', 'Positive', 'Negative'].map((f) => (
              <FilterPill 
                key={f} 
                label={f} 
                active={activeFilter === f} 
                onClick={() => setActiveFilter(f)} 
              />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="w-[160px]">
              <SelectDropdown 
                options={timeRangeOptions} 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)} 
              />
            </div>
            <div className="text-sm text-muted font-ui">
              Showing {totalArticles} articles across {filteredData.length} stocks
            </div>
          </div>
        </div>

        {/* News Feed */}
        <div className="flex flex-col gap-4">
          {filteredData.length === 0 ? (
            <EmptyState 
              icon={Newspaper}
              title="No news found"
              subtitle={
                activeFilter !== 'All' 
                  ? "Try removing filters or expanding the time range." 
                  : "No articles in the current time range for your holdings and watchlist."
              }
              ctaLabel={timeRange !== '7d' ? "Expand to last 7 days →" : null}
              onCta={timeRange !== '7d' ? () => setTimeRange('7d') : null}
            />
          ) : (
            filteredData.map((group) => (
              <Card key={group.ticker} padding="p-0" className="overflow-hidden">
                <div 
                  onClick={() => toggleGroup(group.ticker)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <Link 
                      to={`/stock/${group.ticker}`}
                      state={{ from: 'News', fromPath: '/news' }}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:opacity-80 transition-opacity"
                    >
                      <TickerBadge ticker={group.ticker} />
                    </Link>
                    <span className="text-sm font-medium text-primary">{group.company}</span>
                    <span className="text-xs text-muted ml-2"><span className="font-mono">{group.articles.length}</span> articles</span>
                  </div>
                  {expandedGroups[group.ticker] ? (
                    <ChevronDown className="w-4 h-4 text-muted" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted" />
                  )}
                </div>
                
                {expandedGroups[group.ticker] && (
                  <div className="flex flex-col border-t border-subtle">
                    {group.articles.map((article, idx) => (
                      <div 
                        key={article.id} 
                        className={`px-4 py-3 bg-surface hover:bg-muted/30 transition-colors group ${
                          idx !== group.articles.length - 1 ? 'border-b border-border' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <h3 className="text-sm font-medium text-primary line-clamp-2">
                            {article.headline}
                          </h3>
                          <div className="shrink-0">
                            <SentimentBadge sentiment={article.sentiment.toUpperCase()} />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted mb-2">
                          <span>{article.source}</span>
                          <span>·</span>
                          <span className="font-mono">{article.timeAgo}</span>
                        </div>
                        {article.excerpt && (
                          <p className="text-xs text-muted line-clamp-2 mb-2 pr-4">
                            {article.excerpt}
                          </p>
                        )}
                        <div className="flex justify-end mt-1">
                          <a 
                            href={article.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-accent hover:text-accent-hover font-medium inline-flex items-center gap-1 transition-colors"
                          >
                            Read <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
