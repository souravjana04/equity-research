import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Eye,
  Newspaper,
  CalendarDays,
  SlidersHorizontal,
  PieChart,
  Bot,
  TrendingUp,
  BookOpen,
  FileBarChart,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import SectionLabel from './SectionLabel';

const mainNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Portfolio', icon: Briefcase, href: '/portfolio' },
  { label: 'Watchlist', icon: Eye, href: '/watchlist' },
  { label: 'News', icon: Newspaper, href: '/news' },
  { label: 'Earnings', icon: CalendarDays, href: '/earnings' },
  { label: 'Screener', icon: SlidersHorizontal, href: '/screener' },
  { label: 'Sector Analysis', icon: PieChart, href: '/sector' },
  { label: 'AI Chat', icon: Bot, href: '/chat' },
  { label: 'Swing Trade', icon: TrendingUp, href: '/swing' },
  { label: 'Thesis Journal', icon: BookOpen, href: '/thesis' },
  { label: 'Reports', icon: FileBarChart, href: '/reports' },
];

const Sidebar = ({ activePage, collapsed = false, onToggleCollapse }) => {
  return (
    <aside className={`relative flex flex-col bg-surface border-r border-subtle h-[calc(100vh-4rem)] sticky top-16 z-40 transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
      
      {/* Collapse/Expand Toggle Button */}
      {onToggleCollapse && (
        <button 
          onClick={onToggleCollapse}
          className="absolute -right-3 top-4 w-6 h-6 rounded-full border border-default bg-surface hover:bg-canvas flex items-center justify-center text-secondary hover:text-primary z-50 cursor-pointer shadow-sm"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      )}

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
                    ${isActive ? 'bg-accent text-surface' : 'text-secondary hover:bg-canvas hover:text-primary'}
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
          className={`flex items-center px-3 py-2 rounded-md text-secondary hover:bg-canvas hover:text-primary transition-colors group mb-4`}
          title={collapsed ? 'Help Center' : undefined}
        >
          <HelpCircle className="w-[18px] h-[18px] shrink-0 text-muted group-hover:text-primary" />
          {!collapsed && <span className="ml-3 font-ui text-[13px] font-medium truncate">Help Center</span>}
        </Link>
        
        {!collapsed ? (
          <Link 
            to="/swing" 
            className="w-full bg-accent hover:bg-accent-hover text-surface font-ui text-[13px] font-medium py-2 rounded-md transition-colors block text-center cursor-pointer"
          >
            New Trade
          </Link>
        ) : (
          <Link 
            to="/swing" 
            className="w-full flex justify-center bg-accent hover:bg-accent-hover text-surface py-2 rounded-md transition-colors cursor-pointer" 
            title="New Trade"
          >
            <TrendingUp className="w-4 h-4" />
          </Link>
        )}
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  activePage: PropTypes.string,
  collapsed: PropTypes.bool,
  onToggleCollapse: PropTypes.func,
};

export default Sidebar;
