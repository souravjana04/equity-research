import PropTypes from 'prop-types';
import { Bell, Settings, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Dashboard', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Screener', href: '/screener' },
  { label: 'Research', href: '/thesis' },
];

const TopNav = ({ activePage }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-surface border-b border-subtle h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-8 h-full">
        <Link to="/" className="font-ui text-[18px] font-semibold tracking-tight text-accent">
          EquityLens
        </Link>
        <nav className="hidden md:flex items-center h-full gap-6">
          {navLinks.map((link) => {
            const isActive = activePage === link.label;
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`h-full flex items-center font-ui text-[13px] font-medium transition-colors border-b-2
                  ${isActive ? 'text-accent border-accent' : 'text-secondary border-transparent hover:text-primary'}
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Trigger */}
        <button className="flex items-center gap-2 bg-muted hover:bg-border-subtle transition-colors border border-default rounded-md px-3 py-1.5 w-64 text-left">
          <Search className="w-4 h-4 text-muted" />
          <span className="font-ui text-[13px] text-muted flex-1">Search tickers, docs...</span>
          <span className="font-mono text-[11px] text-muted border border-border-strong rounded px-1 tracking-tight">⌘K</span>
        </button>
        
        {/* Actions */}
        <div className="flex items-center gap-2 pl-2 border-l border-subtle">
          <button className="p-2 text-secondary hover:text-primary hover:bg-muted rounded-full transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <button className="p-2 text-secondary hover:text-primary hover:bg-muted rounded-full transition-colors">
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

TopNav.propTypes = {
  activePage: PropTypes.string,
};

export default TopNav;
