import { useState } from 'react';
import PropTypes from 'prop-types';

export const Tabs = ({ tabs, defaultActive, onChange, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultActive || tabs[0].id);

  const handleTabClick = (id) => {
    setActiveTab(id);
    if (onChange) onChange(id);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex border-b border-subtle overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`font-ui text-[13px] font-medium px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                isActive 
                  ? 'border-accent text-primary' 
                  : 'border-transparent text-secondary hover:text-primary hover:border-default'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="pt-6">
        {tabs.find(t => t.id === activeTab)?.content}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  defaultActive: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Tabs;
