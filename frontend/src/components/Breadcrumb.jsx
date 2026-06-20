import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import TickerBadge from './TickerBadge';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="w-full bg-page px-6 py-2 flex items-center font-ui text-sm select-none border-b border-subtle/50">
      <div className="flex items-center flex-wrap gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const hasHref = !!item.href && !isLast;

          return (
            <div key={index} className="flex items-center gap-1.5">
              {hasHref ? (
                <Link 
                  to={item.href} 
                  className="text-accent hover:text-accent-hover transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ) : isLast ? (
                item.isTickerBadge ? (
                  <TickerBadge ticker={item.label.toUpperCase()} variant="neutral" size="sm" />
                ) : (
                  <span className="text-primary font-medium cursor-default">
                    {item.label}
                  </span>
                )
              ) : (
                <span className="text-muted cursor-default">
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <ChevronRight className="w-3.5 h-3.5 text-muted shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      isTickerBadge: PropTypes.bool,
    })
  ).isRequired,
};

export default Breadcrumb;
