import { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';

const AccordionRow = ({ title, badge, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="w-full bg-surface border border-default rounded-lg overflow-hidden flex flex-col transition-all duration-200">
      <div 
        className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-page transition-colors select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          <span className="font-ui text-[14px] font-medium text-primary">
            {title}
          </span>
        </div>
        {badge && (
          <div>{badge}</div>
        )}
      </div>
      
      {isOpen && (
        <div className="px-4 py-4 border-t border-subtle bg-surface animate-in slide-in-from-top-1 fade-in duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

AccordionRow.propTypes = {
  title: PropTypes.string.isRequired,
  badge: PropTypes.node,
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
};

export default AccordionRow;
