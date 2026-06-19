import PropTypes from 'prop-types';
import { Check } from 'lucide-react';

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div className="relative flex items-center justify-center w-4 h-4">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div 
          className={`w-4 h-4 rounded-[4px] border transition-colors flex items-center justify-center
            ${checked ? 'bg-accent border-accent text-surface' : 'bg-surface border-default group-hover:border-accent'}
          `}
        >
          {checked && <Check className="w-3 h-3" strokeWidth={3} />}
        </div>
      </div>
      {label && (
        <span className="font-ui text-[13px] text-primary select-none group-hover:text-accent transition-colors">
          {label}
        </span>
      )}
    </label>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
