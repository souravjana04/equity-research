import PropTypes from 'prop-types';

const TextInput = ({ label, value, onChange, error, placeholder, type = 'text' }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-secondary">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-surface border rounded-md px-3 py-2 text-[13px] font-ui text-primary placeholder:text-muted focus:outline-none transition-colors
          ${error ? 'border-loss focus:border-loss focus:ring-1 focus:ring-loss' : 'border-default focus:border-accent focus:ring-1 focus:ring-accent'}
        `}
      />
      {error && (
        <span className="font-ui text-[11px] text-loss mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default TextInput;
