import { useState } from 'react';
import PropTypes from 'prop-types';
import FilterChip from './FilterChip';
import AddFilterButton from './AddFilterButton';
import SearchInput from './SearchInput';
import SelectDropdown from './SelectDropdown';
import RangeSlider from './RangeSlider';
import Toggle from './Toggle';

// This is a complex composite component as requested
const ScreenerFilterPanel = ({ filters, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="bg-surface border border-default rounded-lg p-card-padding flex flex-col gap-6">
      
      {/* Example form inputs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SearchInput 
          placeholder="Search within screener..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SelectDropdown 
          label="Index"
          options={[
            { label: 'Nifty 50', value: 'NIFTY50' },
            { label: 'Nifty 500', value: 'NIFTY500' },
            { label: 'All Stocks', value: 'ALL' }
          ]}
          value="NIFTY500"
          onChange={() => {}}
        />
        <div className="col-span-1 md:col-span-2 lg:col-span-2 flex items-end">
           <RangeSlider 
            label="Market Cap (Cr)"
            min={100}
            max={1000000}
            value={5000}
            onChange={() => {}}
            showMinMax
           />
        </div>
      </div>
      
      <div className="flex items-center gap-6 pt-4 border-t border-subtle">
        <Toggle 
          label="Exclude Financials"
          checked={false}
          onChange={() => {}}
        />
      </div>

      {/* Active Filters Row */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-subtle">
        {filters && filters.map((filter, idx) => (
          <FilterChip 
            key={idx}
            label={filter.label}
            value={filter.value}
            onRemove={() => onFilterChange(filters.filter((_, i) => i !== idx))}
          />
        ))}
        <AddFilterButton onClick={() => {}} />
      </div>

    </div>
  );
};

ScreenerFilterPanel.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  onFilterChange: PropTypes.func.isRequired,
};

export default ScreenerFilterPanel;
