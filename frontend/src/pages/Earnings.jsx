import { useState } from 'react';
import { 
  ChevronRight, CalendarDays, LayoutList, ChevronLeft, Bell, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  FilterPill, DataTable, TickerBadge, 
  EarningsBadge, ConcallBadge, EarningsDetailCard
} from '../components';

const earningsData = [
  {
    ticker: 'TCS', company: 'Tata Consultancy', reportDate: '2024-12-09', quarter: 'Q3 FY25',
    epsEst: 28.40, epsActual: null, revEst: 62400, revActual: null,
    result: 'pending', concall: 'pending', reminderSet: true, timing: 'After market close'
  },
  {
    ticker: 'INFY', company: 'Infosys', reportDate: '2024-12-09', quarter: 'Q3 FY25',
    epsEst: 18.20, epsActual: null, revEst: 40200, revActual: null,
    result: 'pending', concall: 'pending', reminderSet: false, timing: 'After market close'
  },
  {
    ticker: 'HDFCBANK', company: 'HDFC Bank', reportDate: '2024-12-11', quarter: 'Q3 FY25',
    epsEst: 21.80, epsActual: null, revEst: 86400, revActual: null,
    result: 'pending', concall: 'pending', reminderSet: true, timing: 'After market close'
  },
  {
    ticker: 'RELIANCE', company: 'Reliance Industries', reportDate: '2024-12-03', quarter: 'Q2 FY25',
    epsEst: 32.40, epsActual: 34.80, revEst: 228000, revActual: 235400,
    result: 'beat', concall: 'ready', concallUrl: '/stock/RELIANCE#concalls', reminderSet: false, timing: 'After market close'
  },
  {
    ticker: 'INFY', company: 'Infosys', reportDate: '2024-10-17', quarter: 'Q2 FY25',
    epsEst: 19.40, epsActual: 18.20, revEst: 40800, revActual: 40286,
    result: 'miss', concall: 'ready', concallUrl: '/stock/INFY#concalls', reminderSet: false, timing: 'After market close'
  },
  {
    ticker: 'TCS', company: 'Tata Consultancy', reportDate: '2024-12-05', quarter: 'Q2 FY25',
    epsEst: 27.80, epsActual: 28.40, revEst: 61200, revActual: 62400,
    result: 'beat', concall: 'ready', concallUrl: '/stock/TCS#concalls', reminderSet: false, timing: 'After market close'
  },
  {
    ticker: 'BAJFINANCE', company: 'Bajaj Finance', reportDate: '2024-12-14', quarter: 'Q2 FY25',
    epsEst: 38.20, epsActual: 38.40, revEst: 14200, revActual: 14180,
    result: 'inline', concall: 'ready', concallUrl: '/stock/BAJFINANCE#concalls', reminderSet: false, timing: 'Before market open'
  }
];

// Helper to format Date
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Custom Table Renderer for Value diff
const renderValueWithDiff = (actual, est, isRev = false, result = '') => {
  if (actual === null) return <span className="text-muted">—</span>;
  
  let color = 'text-primary';
  if (result === 'inline') {
    color = 'text-warning';
  } else {
    const isGain = actual > est;
    const isLoss = actual < est;
    if (isGain) color = 'text-gain';
    if (isLoss) color = 'text-loss';
  }
  
  if (isRev) {
    return <span className={`font-mono ${color}`}>₹{actual.toLocaleString('en-IN')}</span>;
  }
  return <span className={`font-mono ${color}`}>{actual.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>;
};

const Earnings = () => {
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' | 'list'
  const [timeFilter, setTimeFilter] = useState('upcoming'); // 'upcoming' | 'past'
  const [stockFilter, setStockFilter] = useState('all'); // 'all' | 'holdings' | 'watchlist'
  const [resultFilter, setResultFilter] = useState('all'); // 'all' | 'beat' | 'miss' | 'inline'
  
  // For Calendar View Demo (Hardcoded to Dec 2024)
  const [selectedDate, setSelectedDate] = useState('2024-12-09');

  const filteredData = earningsData.filter(d => {
    if (timeFilter === 'upcoming' && d.result !== 'pending') return false;
    if (timeFilter === 'past' && d.result === 'pending') return false;
    
    if (timeFilter === 'past' && resultFilter !== 'all') {
      if (d.result !== resultFilter) return false;
    }
    return true;
  });

  const columns = [
    {
      key: 'ticker', label: 'Ticker', type: 'badge',
      renderBadge: (row) => (
        <Link to={`/stock/${row.ticker}`} state={{ from: 'Earnings', fromPath: '/earnings' }} className="hover:opacity-80">
          <TickerBadge ticker={row.ticker} />
        </Link>
      )
    },
    { key: 'company', label: 'Company', type: 'text' },
    {
      key: 'reportDate', label: 'Report Date', type: 'badge',
      renderBadge: (row) => <span className="font-mono text-sm text-primary">{formatDate(row.reportDate)}</span>
    },
    {
      key: 'quarter', label: 'Quarter', type: 'badge',
      renderBadge: (row) => <span className="text-muted">{row.quarter}</span>
    },
    {
      key: 'epsEst', label: 'EPS Est', type: 'badge', align: 'right',
      renderBadge: (row) => <span className="font-mono">{row.epsEst.toFixed(2)}</span>
    },
    {
      key: 'epsActual', label: 'EPS Actual', type: 'badge', align: 'right',
      renderBadge: (row) => renderValueWithDiff(row.epsActual, row.epsEst, false, row.result)
    },
    {
      key: 'revEst', label: 'Rev Est', type: 'badge', align: 'right',
      renderBadge: (row) => <span className="font-mono">₹{row.revEst.toLocaleString('en-IN')}</span>
    },
    {
      key: 'revActual', label: 'Rev Actual', type: 'badge', align: 'right',
      renderBadge: (row) => renderValueWithDiff(row.revActual, row.revEst, true, row.result)
    },
    {
      key: 'result', label: 'Result', type: 'badge', align: 'center',
      renderBadge: (row) => <EarningsBadge type={row.result} />
    },
    {
      key: 'concall', label: 'Concall', type: 'badge', align: 'center',
      renderBadge: (row) => <ConcallBadge status={row.concall} url={row.concallUrl} />
    },
    {
      key: 'reminder', label: '', type: 'badge', align: 'center',
      renderBadge: (row) => (
        <button className="focus:outline-none flex items-center justify-center w-full">
          <Bell className={`w-4 h-4 ${row.reminderSet ? 'text-warning fill-warning' : 'text-muted'}`} />
        </button>
      )
    }
  ];

  // Calendar rendering helpers
  const [currentDateObj, setCurrentDateObj] = useState(new Date(2024, 11, 1)); // Default to Dec 2024
  const currentYear = currentDateObj.getFullYear();
  const currentMonth = currentDateObj.getMonth();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const startDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  const prevMonth = () => setCurrentDateObj(new Date(currentYear, currentMonth - 1, 1));
  const nextMonth = () => setCurrentDateObj(new Date(currentYear, currentMonth + 1, 1));
  const monthName = currentDateObj.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) {
    calendarDays.push({ empty: true });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const dayEvents = earningsData.filter(d => d.reportDate === dateStr);
    calendarDays.push({ date: i, dateStr, events: dayEvents });
  }

  const selectedEvents = earningsData.filter(d => d.reportDate === selectedDate);

  return (
    <div className="w-full min-h-screen bg-page flex flex-col font-ui text-primary">
      {/* 1. Breadcrumb */}
      <div className="px-6 py-2 bg-page flex items-center gap-2 text-sm border-b border-subtle">
        <Link to="/" className="text-accent hover:underline">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-muted" />
        <span className="text-primary font-medium">Earnings</span>
      </div>

      <div className="flex-1 max-w-[1440px] w-full mx-auto px-6 py-6 flex flex-col gap-6">
        
        {/* 2. Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-primary">Earnings Tracker</h1>
            <p className="text-sm text-muted mt-1">Upcoming results, EPS beat/miss, and concall summaries.</p>
          </div>
          <div className="flex items-center p-1 bg-surface border border-default rounded-md">
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'calendar' ? 'bg-accent text-white' : 'text-muted hover:text-primary'}`}
            >
              <CalendarDays className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-accent text-white' : 'text-muted hover:text-primary'}`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3. Filter Bar */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FilterPill label="Upcoming" active={timeFilter === 'upcoming'} onClick={() => setTimeFilter('upcoming')} />
            <FilterPill label="Past" active={timeFilter === 'past'} onClick={() => setTimeFilter('past')} />
          </div>
          <div className="w-px h-6 bg-default"></div>
          <div className="flex items-center gap-2">
            <FilterPill label="All" active={stockFilter === 'all'} onClick={() => setStockFilter('all')} />
            <FilterPill label="Holdings only" active={stockFilter === 'holdings'} onClick={() => setStockFilter('holdings')} />
            <FilterPill label="Watchlist only" active={stockFilter === 'watchlist'} onClick={() => setStockFilter('watchlist')} />
          </div>
          <div className="w-px h-6 bg-default"></div>
          <div className="flex items-center gap-2 opacity-100 transition-opacity" style={{ opacity: timeFilter === 'upcoming' ? 0.4 : 1, pointerEvents: timeFilter === 'upcoming' ? 'none' : 'auto' }}>
            <FilterPill label="All Results" active={resultFilter === 'all'} onClick={() => setResultFilter('all')} />
            <FilterPill label="Beat" active={resultFilter === 'beat'} onClick={() => setResultFilter('beat')} />
            <FilterPill label="Miss" active={resultFilter === 'miss'} onClick={() => setResultFilter('miss')} />
            <FilterPill label="In-line" active={resultFilter === 'inline'} onClick={() => setResultFilter('inline')} />
          </div>
        </div>

        {/* 4. Views */}
        {viewMode === 'calendar' ? (
          <div className="flex gap-6 h-[600px]">
            {/* Calendar Grid */}
            <div className="w-[65%] bg-surface border border-default rounded-lg flex flex-col overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-subtle">
                <button onClick={prevMonth} className="p-1 hover:bg-subtle rounded text-muted transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                <span className="font-medium text-primary">{monthName}</span>
                <button onClick={nextMonth} className="p-1 hover:bg-subtle rounded text-muted transition-colors"><ChevronRight className="w-5 h-5" /></button>
              </div>
              <div className="grid grid-cols-7 border-b border-subtle bg-muted/20">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="py-2 text-center text-xs font-medium text-muted uppercase tracking-wider">{day}</div>
                ))}
              </div>
              <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-default gap-px border-b border-default">
                {calendarDays.map((day, i) => {
                  if (day.empty) return <div key={i} className="bg-surface"></div>;
                  
                  const isSelected = selectedDate === day.dateStr;
                  const isToday = day.dateStr === '2024-12-20'; // Hardcoded today
                  const hasEvents = day.events && day.events.length > 0;
                  
                  return (
                    <div 
                      key={i} 
                      onClick={() => setSelectedDate(day.dateStr)}
                      className={`bg-surface p-2 flex flex-col cursor-pointer transition-colors relative
                        ${isSelected ? 'bg-accent/10 border-2 border-accent' : 'hover:bg-page'}
                        ${hasEvents && !isSelected ? 'bg-accent/5 border border-accent/20' : ''}
                      `}
                    >
                      <div className="flex justify-end mb-1">
                        <span className={`w-6 h-6 flex items-center justify-center font-mono text-sm rounded-full
                          ${isToday ? 'bg-accent text-white' : 'text-primary'}
                        `}>
                          {day.date}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 overflow-hidden">
                        {day.events?.map((evt, idx) => {
                          let dotColor = 'text-warning'; // pending
                          if (evt.result === 'beat') dotColor = 'text-gain';
                          if (evt.result === 'miss') dotColor = 'text-loss';
                          if (evt.result === 'inline') dotColor = 'text-warning';

                          return (
                            <div key={idx} className="flex items-center gap-1.5 text-xs text-primary truncate">
                              <span className={`text-[8px] ${dotColor}`}>●</span>
                              {evt.ticker}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Event Detail Panel */}
            <div className="w-[35%] bg-surface border border-default rounded-lg p-5 flex flex-col">
              <h2 className="text-sm font-medium text-primary pb-4 mb-4 border-b border-subtle">
                {formatDate(selectedDate)} — {selectedEvents.length} event{selectedEvents.length !== 1 ? 's' : ''}
              </h2>
              <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
                {selectedEvents.length === 0 ? (
                  <div className="text-sm text-muted text-center mt-10">No earnings events on this date.</div>
                ) : (
                  selectedEvents.map((evt, idx) => (
                    <EarningsDetailCard key={idx} evt={evt} />
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <DataTable 
              columns={columns} 
              rows={filteredData}
              selectable={false}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default Earnings;
