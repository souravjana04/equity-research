import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, X } from 'lucide-react';
import Checkbox from './Checkbox';

const SelectDropdown = ({ label, options, value, onChange, multiple = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCheckboxChange = (optValue) => {
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue));
    } else {
      onChange([...value, optValue]);
    }
  };

  const handleRemoveChip = (e, optValue) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optValue));
  };

  if (!multiple) {
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
  }

  // Multiple implementation
  return (
    <div className="flex flex-col gap-1.5" ref={dropdownRef}>
      {label && (
        <label className="font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full min-h-[36px] bg-surface border ${isOpen ? 'border-accent ring-1 ring-accent' : 'border-default'} rounded-md pl-2 pr-8 py-1.5 text-[13px] font-ui text-primary flex flex-wrap gap-1 items-center cursor-pointer transition-colors`}
        >
          {value.length === 0 ? (
            <span className="text-muted ml-1">Select...</span>
          ) : (
            value.map((v) => {
              const opt = options.find((o) => o.value === v);
              return (
                <span
                  key={v}
                  className="inline-flex items-center gap-1 bg-canvas border border-default rounded px-1.5 py-0.5 text-xs text-primary"
                >
                  {opt ? opt.label : v}
                  <button
                    onClick={(e) => handleRemoveChip(e, v)}
                    className="text-muted hover:text-primary transition-colors focus:outline-none"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })
          )}
        </div>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
        
        {isOpen && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-surface border border-default rounded-md shadow-lg max-h-60 overflow-y-auto py-1">
            {options.map((opt) => (
              <div
                key={opt.value}
                className="flex items-center gap-2 px-3 py-2 hover:bg-page cursor-pointer"
                onClick={() => handleCheckboxChange(opt.value)}
              >
                <div className="pointer-events-none">
                  <Checkbox
                    checked={value.includes(opt.value)}
                    onChange={() => {}} // Handled by parent div click
                  />
                </div>
                <span className="font-ui text-[13px] text-primary pointer-events-none">{opt.label}</span>
              </div>
            ))}
          </div>
        )}
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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
};

export default SelectDropdown;
