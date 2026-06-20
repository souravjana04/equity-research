import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, Plus } from 'lucide-react';
import RangeSlider from './RangeSlider';
import SelectDropdown from './SelectDropdown';

const FilterCard = ({ filter, onUpdate, onRemove }) => {
  return (
    <div className="bg-surface border border-default rounded-md p-4 flex flex-col gap-3 relative group">
      <div className="flex justify-between items-center">
        <span className="font-ui text-sm font-medium text-primary">{filter.label}</span>
        <button 
          onClick={() => onRemove(filter.id)}
          className="text-muted hover:text-loss transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="mt-1">
        {filter.type === 'range' && (
          <RangeSlider
            min={filter.min}
            max={filter.max}
            value={filter.value}
            onChange={(val) => onUpdate(filter.id, val)}
            unit={filter.unit}
            showMinMax={false}
          />
        )}
        
        {filter.type === 'select' && (
          <SelectDropdown
            options={filter.options}
            value={filter.value}
            onChange={(val) => onUpdate(filter.id, val)}
            multiple={filter.multiple}
          />
        )}
      </div>
    </div>
  );
};

FilterCard.propTypes = {
  filter: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const ScreenerFilterPanel = ({ activeFilters, availableFilters, onAddFilter, onRemoveFilter, onUpdateFilter }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const addDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addDropdownRef.current && !addDropdownRef.current.contains(event.target)) {
        setIsAddOpen(false);
      }
    };
    if (isAddOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAddOpen]);

  const unselectedFilters = availableFilters.filter(
    (af) => !activeFilters.some((active) => active.id === af.id)
  );

  return (
    <div className="bg-surface border border-default rounded-lg p-card-padding flex flex-col gap-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeFilters.map((filter) => (
          <FilterCard 
            key={filter.id} 
            filter={filter} 
            onUpdate={onUpdateFilter} 
            onRemove={onRemoveFilter} 
          />
        ))}
      </div>
      
      <div className="flex items-center" ref={addDropdownRef}>
        <div className="relative">
          <button 
            onClick={() => setIsAddOpen(!isAddOpen)}
            className="inline-flex items-center gap-1.5 text-accent border border-accent/30 rounded-md px-3 py-1.5 font-ui text-sm hover:bg-accent/5 transition-colors focus:outline-none"
          >
            <Plus className="w-4 h-4" />
            <span>Add Filter</span>
          </button>
          
          {isAddOpen && unselectedFilters.length > 0 && (
            <div className="absolute z-50 top-full left-0 mt-2 w-48 bg-surface border border-default rounded-md shadow-lg max-h-60 overflow-y-auto py-1">
              {unselectedFilters.map((filter) => (
                <div
                  key={filter.id}
                  className="px-3 py-2 hover:bg-page cursor-pointer font-ui text-[13px] text-primary"
                  onClick={() => {
                    onAddFilter(filter.id);
                    setIsAddOpen(false);
                  }}
                >
                  {filter.label}
                </div>
              ))}
            </div>
          )}
          
          {isAddOpen && unselectedFilters.length === 0 && (
            <div className="absolute z-50 top-full left-0 mt-2 w-48 bg-surface border border-default rounded-md shadow-lg py-3 px-3 text-center">
              <span className="font-ui text-xs text-muted">No more filters available</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

ScreenerFilterPanel.propTypes = {
  activeFilters: PropTypes.array.isRequired,
  availableFilters: PropTypes.array.isRequired,
  onAddFilter: PropTypes.func.isRequired,
  onRemoveFilter: PropTypes.func.isRequired,
  onUpdateFilter: PropTypes.func.isRequired,
};

export default ScreenerFilterPanel;
