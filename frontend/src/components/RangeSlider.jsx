import PropTypes from 'prop-types';

const RangeSlider = ({ label, min, max, value, onChange, unit = '', showMinMax = false }) => {
  // Calculate percentage for gradient track
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-end">
        {label && (
          <label className="font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-secondary">
            {label}
          </label>
        )}
        <span className="font-mono text-[13px] text-primary">
          {value}{unit}
        </span>
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 appearance-none bg-muted rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-surface [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
        style={{
          background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${percentage}%, var(--color-bg-muted) ${percentage}%, var(--color-bg-muted) 100%)`
        }}
      />
      
      {showMinMax && (
        <div className="flex justify-between font-mono text-[11px] text-muted">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      )}
    </div>
  );
};

RangeSlider.propTypes = {
  label: PropTypes.string,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  unit: PropTypes.string,
  showMinMax: PropTypes.bool,
};

export default RangeSlider;
