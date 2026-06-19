import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  List, 
  Briefcase, 
  Filter, 
  Globe, 
  BookOpen, 
  MessageSquare,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import SectionLabel from './SectionLabel';

const mainNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Watchlist', icon: List, href: '/watchlist' },
  { label: 'Portfolio', icon: Briefcase, href: '/portfolio' },
  { label: 'Screener', icon: Filter, href: '/screener' },
  { label: 'Markets', icon: Globe, href: '/sector' },
  { label: 'Research', icon: BookOpen, href: '/thesis' },
  { label: 'AI Chat', icon: MessageSquare, href: '/chat' },
];

const Sidebar = ({ activePage, collapsed = false }) => {
  return (
    <aside className={`flex flex-col bg-surface border-r border-subtle h-screen sticky top-0 transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
      
      {/* Logo Area */}
      <div className="h-16 flex items-center px-4 border-b border-subtle">
        <div className="w-8 h-8 rounded bg-accent flex items-center justify-center shrink-0">
          <TrendingUp className="w-5 h-5 text-surface" />
        </div>
        {!collapsed && (
          <div className="ml-3 overflow-hidden">
            <h1 className="font-ui text-[15px] font-semibold text-primary truncate">EquityLens</h1>
            <p className="font-ui text-[11px] text-muted truncate">Pro Workspace</p>
          </div>
        )}
      </div>

      {/* Main Nav */}
      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-6">
        <div>
          {!collapsed && <div className="px-1"><SectionLabel>NAVIGATE</SectionLabel></div>}
          <nav className="flex flex-col gap-1">
            {mainNavItems.map((item) => {
              const isActive = activePage === item.label;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors group
                    ${isActive ? 'bg-accent text-surface' : 'text-secondary hover:bg-muted hover:text-primary'}
                  `}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-surface' : 'text-muted group-hover:text-primary'}`} />
                  {!collapsed && <span className="ml-3 font-ui text-[13px] font-medium truncate">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Area */}
      <div className="p-3 border-t border-subtle">
        {!collapsed && <div className="px-1"><SectionLabel>UTILITIES</SectionLabel></div>}
        <Link
          to="/help"
          className={`flex items-center px-3 py-2 rounded-md text-secondary hover:bg-muted hover:text-primary transition-colors group mb-4`}
          title={collapsed ? 'Help Center' : undefined}
        >
          <HelpCircle className="w-[18px] h-[18px] shrink-0 text-muted group-hover:text-primary" />
          {!collapsed && <span className="ml-3 font-ui text-[13px] font-medium truncate">Help Center</span>}
        </Link>
        
        {!collapsed ? (
          <button className="w-full bg-accent hover:bg-accent-hover text-surface font-ui text-[13px] font-medium py-2 rounded-md transition-colors">
            New Trade
          </button>
        ) : (
          <button className="w-full flex justify-center bg-accent hover:bg-accent-hover text-surface py-2 rounded-md transition-colors" title="New Trade">
            <TrendingUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  activePage: PropTypes.string,
  collapsed: PropTypes.bool,
};

export default Sidebar;
