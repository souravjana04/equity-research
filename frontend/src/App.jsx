import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComponentShowcase from './ComponentShowcase';

// Placeholder Pages
const PortfolioDashboard = () => <div className="p-8">PortfolioDashboard</div>;
const StockDetail = () => <div className="p-8">StockDetail</div>;
const Watchlist = () => <div className="p-8">Watchlist</div>;
const EarningsTracker = () => <div className="p-8">EarningsTracker</div>;
const NewsTab = () => <div className="p-8">NewsTab</div>;
const Screener = () => <div className="p-8">Screener</div>;
const SectorAnalysis = () => <div className="p-8">SectorAnalysis</div>;
const AIStockChat = () => <div className="p-8">AIStockChat</div>;
const SwingTrade = () => <div className="p-8">SwingTrade</div>;
const ThesisJournal = () => <div className="p-8">ThesisJournal</div>;
const WeeklyReport = () => <div className="p-8">WeeklyReport</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-page flex">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<PortfolioDashboard />} />
            <Route path="/stock/:ticker" element={<StockDetail />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/earnings" element={<EarningsTracker />} />
            <Route path="/news" element={<NewsTab />} />
            <Route path="/screener" element={<Screener />} />
            <Route path="/sector" element={<SectorAnalysis />} />
            <Route path="/chat" element={<AIStockChat />} />
            <Route path="/swing" element={<SwingTrade />} />
            <Route path="/thesis" element={<ThesisJournal />} />
            <Route path="/reports" element={<WeeklyReport />} />
            <Route path="/showcase" element={<ComponentShowcase />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
