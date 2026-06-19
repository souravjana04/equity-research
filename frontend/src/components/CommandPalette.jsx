import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Search, FileText, ArrowRight, Activity, Filter, Briefcase, ChevronRight } from 'lucide-react';
import TickerBadge from './TickerBadge';
import SectionLabel from './SectionLabel';

const CommandPalette = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  // Close on Escape or outside click
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-primary/20 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4">
      <div 
        ref={modalRef}
        className="w-full max-w-xl bg-surface border border-default rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden"
      >
        {/* Search Input Area */}
        <div className="px-4 py-3 flex items-center border-b border-subtle">
          <Search className="w-5 h-5 text-muted shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search tickers, companies, or tools..."
            className="flex-1 bg-transparent border-none outline-none px-3 font-ui text-[15px] text-primary placeholder:text-muted"
          />
          <span className="font-mono text-[10px] text-muted border border-default rounded px-1.5 py-0.5 ml-2 shrink-0">
            ESC
          </span>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto max-h-[60vh] p-4 flex flex-col gap-6">
          
          {/* Recent Tickers */}
          <div>
            <SectionLabel>RECENT TICKERS</SectionLabel>
            <div className="flex flex-col gap-1">
              {[
                { ticker: 'RELIANCE.NS', name: 'Reliance Industries', exchange: 'NSE', sector: 'Energy', variant: 'gain' },
                { ticker: 'HDFCBANK.NS', name: 'HDFC Bank', exchange: 'NSE', sector: 'Financials', variant: 'loss' },
                { ticker: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', sector: 'Technology', variant: 'neutral' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-page cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <TickerBadge ticker={item.ticker} variant={item.variant} size="sm" />
                    <span className="font-ui text-[13px] font-medium text-primary group-hover:text-accent transition-colors">{item.name}</span>
                  </div>
                  <span className="font-ui text-[11px] text-muted">
                    {item.exchange} · {item.sector}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Pages */}
          <div>
            <SectionLabel>TOOLS & PAGES</SectionLabel>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Activity, name: 'Screener', desc: 'Filter stocks by criteria' },
                { icon: Briefcase, name: 'Portfolio', desc: 'View holdings & performance' },
                { icon: Filter, name: 'Sector Heatmap', desc: 'Market overview' },
              ].map((tool, idx) => (
                <div key={idx} className="flex items-start gap-3 px-3 py-2 rounded-md border border-subtle hover:border-accent hover:bg-bg-accent cursor-pointer group transition-colors">
                  <tool.icon className="w-4 h-4 text-secondary mt-0.5 group-hover:text-accent transition-colors" />
                  <div className="flex flex-col">
                    <span className="font-ui text-[13px] font-medium text-primary group-hover:text-accent transition-colors">{tool.name}</span>
                    <span className="font-ui text-[11px] text-muted">{tool.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Research */}
          <div>
            <SectionLabel>RECENT RESEARCH</SectionLabel>
            <div className="flex flex-col gap-1">
              {[
                { title: 'TCS Q3 Earnings Analysis', date: 'Oct 12' },
                { title: 'Auto Sector Deep Dive', date: 'Oct 05' },
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-page cursor-pointer group">
                  <FileText className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                  <span className="font-ui text-[13px] text-primary flex-1 group-hover:text-accent transition-colors">{doc.title}</span>
                  <span className="font-ui text-[11px] text-muted">{doc.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-page border-t border-subtle flex items-center justify-between text-[11px] font-ui text-muted">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gain inline-block animate-pulse"></span>
            Market Open
          </div>
          <div className="flex items-center gap-4">
            <span>8 results</span>
            <div className="flex items-center gap-1">
              <span>Navigate</span>
              <div className="flex gap-1 ml-1">
                <span className="border border-default rounded px-1">↑</span>
                <span className="border border-default rounded px-1">↓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CommandPalette.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CommandPalette;
