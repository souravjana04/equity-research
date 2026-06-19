import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center space-x-1.5 mb-4">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={item.label} className="flex items-center space-x-1.5">
            {isLast ? (
              <span className="font-ui text-[13px] font-medium text-primary cursor-default">
                {item.label}
              </span>
            ) : (
              <Link 
                to={item.href} 
                className="font-ui text-[13px] text-muted hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            )}
            
            {!isLast && (
              <ChevronRight className="w-3.5 h-3.5 text-muted" />
            )}
          </div>
        );
      })}
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Breadcrumb;
