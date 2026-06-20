import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Helper to determine active page label based on URL path
  const getActivePageLabel = (pathname) => {
    if (pathname === '/') return 'Dashboard';
    if (pathname === '/portfolio') return 'Portfolio';
    if (pathname === '/watchlist') return 'Watchlist';
    if (pathname === '/news') return 'News';
    if (pathname === '/earnings') return 'Earnings';
    if (pathname === '/screener') return 'Screener';
    if (pathname === '/sector' || pathname === '/markets') return 'Sector Analysis';
    if (pathname === '/chat') return 'AI Chat';
    if (pathname === '/swing') return 'Swing Trade';
    if (pathname === '/thesis' || pathname === '/research') return 'Thesis Journal';
    if (pathname === '/reports') return 'Reports';
    return '';
  };

  const activePage = getActivePageLabel(location.pathname);

  return (
    <div className="min-h-screen bg-page flex flex-col">
      {/* Top Navigation */}
      <TopNav />
      
      <div className="flex flex-1 relative">
        {/* Sidebar Navigation */}
        <Sidebar 
          activePage={activePage} 
          collapsed={sidebarCollapsed} 
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        {/* Page Content Container */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
