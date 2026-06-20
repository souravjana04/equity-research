// TODO: Delete this file once backend integration is complete in Sprint 3

export const stockDetailHero = {
  ticker: 'HDFCBANK',
  companyName: 'HDFC Bank Limited',
  ltp: 1520.50,
  dayChange: '+1.2%',
  dayChangeValue: 18.20,
  isGain: true,
  sector: 'Financials',
  exchange: 'NSE',
  rsi: 74
};

export const stockKeyMetrics = [
  { label: 'P/E Ratio', value: '28.5x', trend: 'neutral' },
  { label: 'P/B Ratio', value: '2.1x', trend: 'neutral' },
  { label: 'ROCE %', value: '18.4%', trend: 'gain' },
  { label: 'ROE %', value: '16.2%', trend: 'gain' },
  { label: 'Debt/Equity', value: '0.45x', trend: 'neutral' },
  { label: 'Div Yield %', value: '2.8%', trend: 'neutral' },
];

export const stockOverview = {
  about: "HDFC Bank is India's largest private sector bank by assets and market capitalization. It provides a wide range of commercial and transactional banking services, including retail banking, wholesale banking, and treasury operations. The bank boasts a massive branch network and leads the market in credit cards and digital banking adoption.",
  marketCap: "₹14.8L Cr",
  high52w: "₹1,680",
  low52w: "₹1,420",
  employees: "285K+",
  founded: "1994",
  headquarters: "Mumbai, India",
  thesisUrl: "https://notion.so/dummy-thesis"
};

export const stockFinancialsPeriods = ['Q3 FY25', 'Q2 FY25', 'Q1 FY25'];

// Adapted to match ExpandableFinancialsTable requirements
export const stockFinancialsData = [
  {
    fiscalYear: "FY 2025",
    rows: [
      {
        label: "Revenue",
        values: [24050, 23000, 22000],
        yoy: 12.5
      },
      {
        label: "EBITDA",
        values: [8920, 8500, 8000],
        yoy: 14.3,
        children: [
          { label: "EBITDA Margin %", values: [37.1, 37.0, 36.4] }
        ]
      },
      {
        label: "PAT",
        values: [6540, 6000, 5500],
        yoy: 15.8,
        children: [
          { label: "PAT Margin %", values: [27.2, 26.1, 25.0] }
        ]
      }
    ]
  },
  {
    fiscalYear: "FY 2024",
    rows: [
      { label: "Revenue", values: [21500, 20800, 20100], yoy: 10.2 },
      { label: "EBITDA", values: [7800, 7500, 7200], yoy: 11.5, children: [{ label: "EBITDA Margin %", values: [36.3, 36.1, 35.8] }] },
      { label: "PAT", values: [5650, 5400, 5100], yoy: 13.0, children: [{ label: "PAT Margin %", values: [26.3, 26.0, 25.4] }] }
    ]
  }
];

export const stockShareholdingCurrent = [
  { name: 'Promoter', value: 72.5, color: '#0EA882' },
  { name: 'FII', value: 9.8, color: '#2563EB' },
  { name: 'DII', value: 8.2, color: '#F59E0B' },
  { name: 'Public', value: 9.5, color: '#EF4444' }
];

export const stockNews = [
  {
    headline: "HDFC Bank Q3 results beat expectations, NIM improves to 4.2%",
    source: "Reuters",
    date: "2025-12-20",
    sentiment: "POSITIVE",
    url: "#",
    excerpt: "HDFC Bank announced Q3 FY25 results with net interest margins expanding well beyond street estimates, led by robust retail credit growth."
  },
  {
    headline: "RBI hikes repo rate, impact on bank profitability under review",
    source: "Business Today",
    date: "2025-12-18",
    sentiment: "NEUTRAL",
    url: "#",
    excerpt: "The RBI's latest monetary policy decision may pressure margins across the banking sector as deposit repricing outpaces loan yields."
  },
  {
    headline: "HDFC Bank stock falls on profit-taking after strong rally",
    source: "Economic Times",
    date: "2025-12-17",
    sentiment: "NEGATIVE",
    url: "#",
    excerpt: "Stock corrected 2.5% today as investors booked profits following a sustained 15% run-up over the past month."
  }
];

export const stockConcalls = [
  {
    id: "hdfc-q3-fy25",
    ticker: "HDFCBANK",
    quarter: "Q3 FY25",
    date: "2025-12-14",
    duration: "52 min",
    sentiment: "POSITIVE",
    summary: "Management highlighted record loan growth and improved asset quality. Guidance for 15-16% credit growth and NIM stabilization around 4.1-4.2%.",
    keyPoints: [
      "Credit growth YoY: 14.8%",
      "NIM: 4.1%, up from 3.95% in Q2",
      "CAR: 19.2%, well above regulatory minimum",
      "Expected capex for 2026: ₹2,000 Cr"
    ],
    youtubeUrl: "#",
    notionUrl: "#"
  },
  {
    id: "hdfc-q2-fy25",
    ticker: "HDFCBANK",
    quarter: "Q2 FY25",
    date: "2025-09-15",
    duration: "48 min",
    sentiment: "NEUTRAL",
    summary: "Steady quarter with deposit growth matching credit growth. Elevated opex due to branch expansion impacting operating profit margins slightly.",
    keyPoints: [
      "Deposit growth YoY: 15.2%",
      "Cost to Income ratio increased by 40bps",
      "Added 145 new branches in Q2",
      "Retail asset quality remains pristine"
    ],
    youtubeUrl: "#",
    notionUrl: "#"
  }
];

export const stockShareholdingHistory = [
  { month: "Jan 2024", promoter: 72.0, fii: 8.5, dii: 7.5, public: 12.0 },
  { month: "Feb 2024", promoter: 72.0, fii: 8.7, dii: 7.8, public: 11.5 },
  { month: "Mar 2024", promoter: 72.0, fii: 9.0, dii: 7.9, public: 11.1 },
  { month: "Apr 2024", promoter: 72.2, fii: 9.1, dii: 8.0, public: 10.7 },
  { month: "May 2024", promoter: 72.2, fii: 9.3, dii: 8.0, public: 10.5 },
  { month: "Jun 2024", promoter: 72.2, fii: 9.4, dii: 8.1, public: 10.3 },
  { month: "Jul 2024", promoter: 72.3, fii: 9.5, dii: 8.1, public: 10.1 },
  { month: "Aug 2024", promoter: 72.3, fii: 9.6, dii: 8.1, public: 10.0 },
  { month: "Sep 2024", promoter: 72.3, fii: 9.7, dii: 8.2, public: 9.8 },
  { month: "Oct 2024", promoter: 72.4, fii: 9.7, dii: 8.2, public: 9.7 },
  { month: "Nov 2024", promoter: 72.4, fii: 9.8, dii: 8.2, public: 9.6 },
  { month: "Dec 2024", promoter: 72.5, fii: 9.8, dii: 8.2, public: 9.5 }
];

export const generateOHLCVData = (days = 250) => {
  const data = [];
  let currentPrice = 1400;
  let currentDate = new Date('2024-01-01');

  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.5) * 40;
    const open = currentPrice + (Math.random() - 0.5) * 10;
    const close = currentPrice + change;
    const high = Math.max(open, close) + Math.random() * 20;
    const low = Math.min(open, close) - Math.random() * 20;
    const volume = Math.floor(Math.random() * 5000000) + 1000000;

    data.push({
      time: currentDate.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      value: volume,
    });

    currentPrice = close;
    currentDate.setDate(currentDate.getDate() + 1);
    
    // Skip weekends
    if (currentDate.getDay() === 6) currentDate.setDate(currentDate.getDate() + 2);
    else if (currentDate.getDay() === 0) currentDate.setDate(currentDate.getDate() + 1);
  }

  // Calculate moving averages
  const withMAs = data.map((d, index) => {
    let dma50 = null;
    let dma200 = null;

    if (index >= 49) {
      const slice50 = data.slice(index - 49, index + 1);
      dma50 = slice50.reduce((sum, item) => sum + item.close, 0) / 50;
    }
    
    if (index >= 199) {
      const slice200 = data.slice(index - 199, index + 1);
      dma200 = slice200.reduce((sum, item) => sum + item.close, 0) / 200;
    }

    return {
      ...d,
      dma50: dma50 ? parseFloat(dma50.toFixed(2)) : null,
      dma200: dma200 ? parseFloat(dma200.toFixed(2)) : null,
    };
  });

  return withMAs;
};
