import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const FilterChip = ({ label, value, onRemove }) => {
  return (
    <div className="inline-flex items-center gap-1.5 bg-canvas border border-default hover:border-strong transition-colors rounded-full px-3 py-1 font-ui text-[12px] text-primary">
      <span className="text-secondary">{label}</span>
      <span className="font-medium">{value}</span>
      <button 
        onClick={onRemove}
        className="ml-1 text-muted hover:text-primary transition-colors focus:outline-none"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};

FilterChip.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default FilterChip;
