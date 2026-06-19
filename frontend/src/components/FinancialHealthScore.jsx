import PropTypes from 'prop-types';

const CircularScore = ({ label, value, color }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  // value is expected to be 0-10 or 0-100, let's assume 0-100 for percentage
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Background track */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="transparent"
            stroke="var(--color-border-subtle)"
            strokeWidth="4"
          />
          {/* Progress ring */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="font-mono text-[13px] font-semibold text-primary z-10">
          {value}
        </span>
      </div>
      <span className="font-ui text-[11px] text-muted text-center max-w-[64px] leading-tight">
        {label}
      </span>
    </div>
  );
};

CircularScore.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

const FinancialHealthScore = ({ scores }) => {
  return (
    <div className="flex items-start justify-around w-full py-4">
      {scores.map((score, idx) => (
        <CircularScore 
          key={idx}
          label={score.label}
          value={score.value}
          color={score.color}
        />
      ))}
    </div>
  );
};

FinancialHealthScore.propTypes = {
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FinancialHealthScore;
