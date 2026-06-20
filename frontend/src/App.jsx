import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Eye, SlidersHorizontal, PieChart, Bot, BookOpen } from 'lucide-react';
import ComponentShowcase from './ComponentShowcase';
import { MainLayout, Breadcrumb } from './components';

import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import StockDetail from './pages/StockDetail';
import News from './pages/News';
import Earnings from './pages/Earnings';
import SwingTrade from './pages/SwingTrade';
import Reports from './pages/Reports';

// Placeholder Pages
const Watchlist = () => (
  <div className="w-full min-h-screen bg-page flex flex-col font-ui text-primary">
    <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Watchlist' }]} />
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-[600px] mx-auto -mt-16">
      <Eye className="w-12 h-12 text-muted mb-4" />
      <h1 className="text-2xl font-semibold tracking-tight mb-2">Watchlist</h1>
      <p className="text-[14px] text-secondary">Coming soon — this page is under construction.</p>
    </div>
  </div>
);

const Screener = () => (
  <div className="w-full min-h-screen bg-page flex flex-col font-ui text-primary">
    <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Screener' }]} />
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-[600px] mx-auto -mt-16">
      <SlidersHorizontal className="w-12 h-12 text-muted mb-4" />
      <h1 className="text-2xl font-semibold tracking-tight mb-2">Screener</h1>
      <p className="text-[14px] text-secondary">Coming soon — this page is under construction.</p>
    </div>
  </div>
);

const SectorAnalysis = () => (
  <div className="w-full min-h-screen bg-page flex flex-col font-ui text-primary">
    <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Sector Analysis' }]} />
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-[600px] mx-auto -mt-16">
      <PieChart className="w-12 h-12 text-muted mb-4" />
      <h1 className="text-2xl font-semibold tracking-tight mb-2">Sector Analysis</h1>
      <p className="text-[14px] text-secondary">Coming soon — this page is under construction.</p>
    </div>
  </div>
);

const AIStockChat = () => (
  <div className="w-full min-h-screen bg-page flex flex-col font-ui text-primary">
    <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'AI Chat' }]} />
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-[600px] mx-auto -mt-16">
      <Bot className="w-12 h-12 text-muted mb-4" />
      <h1 className="text-2xl font-semibold tracking-tight mb-2">AI Chat</h1>
      <p className="text-[14px] text-secondary">Coming soon — this page is under construction.</p>
    </div>
  </div>
);

const ThesisJournal = () => (
  <div className="w-full min-h-screen bg-page flex flex-col font-ui text-primary">
    <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Thesis Journal' }]} />
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-[600px] mx-auto -mt-16">
      <BookOpen className="w-12 h-12 text-muted mb-4" />
      <h1 className="text-2xl font-semibold tracking-tight mb-2">Thesis Journal</h1>
      <p className="text-[14px] text-secondary">Coming soon — this page is under construction.</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Core Pages wrapped in the shared MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/stock/:ticker" element={<StockDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/news" element={<News />} />
          <Route path="/screener" element={<Screener />} />
          <Route path="/markets" element={<SectorAnalysis />} />
          <Route path="/sector" element={<SectorAnalysis />} />
          <Route path="/chat" element={<AIStockChat />} />
          <Route path="/swing" element={<SwingTrade />} />
          <Route path="/research" element={<ThesisJournal />} />
          <Route path="/thesis" element={<ThesisJournal />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
        
        {/* Isolated Component Showcase */}
        <Route path="/showcase" element={<ComponentShowcase />} />
      </Routes>
    </Router>
  );
}

export default App;
