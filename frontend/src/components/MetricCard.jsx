import PropTypes from 'prop-types';

const MetricCard = ({ label, value, change, trend = 'neutral', variant = 'surface' }) => {
  const isSurface = variant === 'surface';
  
  const containerClasses = isSurface 
    ? 'bg-surface border border-default rounded-lg p-card-padding' 
    : 'bg-canvas rounded-md px-metric-cell-px py-metric-cell-py';

  const trendStyles = {
    gain: 'text-gain bg-gain-bg border-gain-border',
    loss: 'text-loss bg-loss-bg border-loss-border',
    neutral: 'text-secondary bg-canvas border-default',
  };

  return (
    <div className={`${containerClasses} flex flex-col justify-between`}>
      <span className="font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-muted mb-2">
        {label}
      </span>
      <div className="flex items-end gap-3">
        <span className="font-mono text-[20px] font-medium leading-[24px] text-primary">
          {value}
        </span>
        {change && (
          <span className={`font-mono text-[11px] px-1.5 py-0.5 rounded-sm border inline-flex items-center justify-center mb-0.5 ${trendStyles[trend]}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

MetricCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.string,
  trend: PropTypes.oneOf(['gain', 'loss', 'neutral']),
  variant: PropTypes.oneOf(['surface', 'inlay']),
};

export default MetricCard;
