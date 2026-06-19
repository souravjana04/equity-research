import PropTypes from 'prop-types';

const Toggle = ({ label, checked, onChange, description }) => {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative flex items-center pt-0.5">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div 
          className={`w-9 h-5 rounded-full transition-colors ${checked ? 'bg-gain' : 'bg-border-strong'}`}
        />
        <div 
          className={`absolute left-0.5 top-1 w-4 h-4 bg-surface rounded-full transition-transform shadow-sm ${checked ? 'translate-x-4' : 'translate-x-0'}`}
        />
      </div>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="font-ui text-[13px] text-primary select-none group-hover:text-accent transition-colors">
              {label}
            </span>
          )}
          {description && (
            <span className="font-ui text-[11px] text-muted select-none mt-0.5">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
};

Toggle.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  description: PropTypes.string,
};

export default Toggle;
