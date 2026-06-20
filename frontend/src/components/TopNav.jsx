import { Bell, Settings, Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopNav = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-surface border-b border-subtle h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-3 h-full">
        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 rounded bg-accent flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-surface" />
          </div>
          <div className="ml-3 text-left">
            <h1 className="font-ui text-[14px] font-semibold text-primary leading-tight">MarketMint</h1>
            <p className="font-ui text-[10px] text-muted leading-none mt-0.5">Pro Workspace</p>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Trigger */}
        <button className="flex items-center gap-2 bg-canvas hover:bg-border-subtle transition-colors border border-default rounded-md px-3 py-1.5 w-64 text-left">
          <Search className="w-4 h-4 text-muted" />
          <span className="font-ui text-[13px] text-muted flex-1">Search tickers, docs...</span>
          <span className="font-mono text-[11px] text-muted border border-border-strong rounded px-1 tracking-tight">⌘K</span>
        </button>
        
        {/* Actions */}
        <div className="flex items-center gap-2 pl-2 border-l border-subtle">
          <button className="p-2 text-secondary hover:text-primary hover:bg-canvas rounded-full transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <button className="p-2 text-secondary hover:text-primary hover:bg-canvas rounded-full transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <div className="ml-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-surface font-ui text-[13px] font-semibold cursor-pointer">
            SJ
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
