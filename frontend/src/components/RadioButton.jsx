import PropTypes from 'prop-types';

const RadioButton = ({ label, checked, onChange, name }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div className="relative flex items-center justify-center w-4 h-4">
        <input
          type="radio"
          name={name}
          className="sr-only"
          checked={checked}
          onChange={() => onChange(true)}
        />
        <div 
          className={`w-4 h-4 rounded-full border transition-colors flex items-center justify-center
            ${checked ? 'border-accent' : 'border-default group-hover:border-accent'}
          `}
        >
          {checked && <div className="w-2 h-2 rounded-full bg-accent" />}
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

RadioButton.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default RadioButton;
