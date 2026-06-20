import PropTypes from 'prop-types';

const RangeSlider = ({ label, min, max, value, onChange, unit = '', showMinMax = false }) => {
  const isDual = Array.isArray(value);
  
  // Calculate percentage for gradient track
  let trackStyle = {};
  if (isDual) {
    const minPercent = ((value[0] - min) / (max - min)) * 100;
    const maxPercent = ((value[1] - min) / (max - min)) * 100;
    trackStyle = {
      background: `linear-gradient(to right, var(--color-canvas) 0%, var(--color-canvas) ${minPercent}%, var(--color-accent) ${minPercent}%, var(--color-accent) ${maxPercent}%, var(--color-canvas) ${maxPercent}%, var(--color-canvas) 100%)`
    };
  } else {
    const percentage = ((value - min) / (max - min)) * 100;
    trackStyle = {
      background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${percentage}%, var(--color-canvas) ${percentage}%, var(--color-canvas) 100%)`
    };
  }

  const handleMinChange = (e) => {
    const newVal = Math.min(Number(e.target.value), value[1] - 1);
    onChange([newVal, value[1]]);
  };

  const handleMaxChange = (e) => {
    const newVal = Math.max(Number(e.target.value), value[0] + 1);
    onChange([value[0], newVal]);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Optional Top Label */}
      {label && (
        <div className="flex justify-between items-end mb-1">
          <label className="font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-secondary">
            {label}
          </label>
        </div>
      )}
      
      {/* Slider Container */}
      <div className="relative w-full h-1.5 rounded-full flex items-center" style={trackStyle}>
        {!isDual ? (
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute w-full h-full appearance-none bg-transparent outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-surface [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:rounded-full cursor-pointer z-10"
          />
        ) : (
          <>
            <input
              type="range"
              min={min}
              max={max}
              value={value[0]}
              onChange={handleMinChange}
              className="absolute w-full h-full appearance-none bg-transparent outline-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-surface [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:rounded-full cursor-pointer z-20"
            />
            <input
              type="range"
              min={min}
              max={max}
              value={value[1]}
              onChange={handleMaxChange}
              className="absolute w-full h-full appearance-none bg-transparent outline-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-surface [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:rounded-full cursor-pointer z-30"
            />
          </>
        )}
      </div>
      
      {/* Min/Max or Value Labels */}
      {isDual ? (
        <div className="flex justify-between mt-1">
          <span className="font-mono text-xs text-primary">{value[0]}{unit}</span>
          <span className="font-mono text-xs text-primary">{value[1]}{unit}</span>
        </div>
      ) : showMinMax ? (
        <div className="flex justify-between font-mono text-[11px] text-muted mt-1">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      ) : (
         <div className="flex justify-end font-mono text-xs text-primary mt-1">
          <span>{value}{unit}</span>
        </div>
      )}
    </div>
  );
};

RangeSlider.propTypes = {
  label: PropTypes.string,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  unit: PropTypes.string,
  showMinMax: PropTypes.bool,
};

export default RangeSlider;
