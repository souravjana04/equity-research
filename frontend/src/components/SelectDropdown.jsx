import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';

const SelectDropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full appearance-none bg-surface border border-default rounded-md pl-3 pr-8 py-2 text-[13px] font-ui text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
      </div>
    </div>
  );
};

SelectDropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectDropdown;
