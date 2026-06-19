import PropTypes from 'prop-types';

const TickerBadge = ({ ticker, variant = 'neutral', size = 'md' }) => {
  const baseClasses = 'font-mono rounded-sm border inline-flex items-center justify-center font-medium';
  
  const sizeClasses = {
    sm: 'text-[11px] px-1.5 py-0.5',
    md: 'text-[13px] px-2 py-1',
  };

  const variantClasses = {
    gain: 'bg-gain-bg border-gain-border text-gain',
    loss: 'bg-loss-bg border-loss-border text-loss',
    neutral: 'bg-muted border-default text-secondary',
  };

  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}>
      {ticker}
    </span>
  );
};

TickerBadge.propTypes = {
  ticker: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['gain', 'loss', 'neutral']),
  size: PropTypes.oneOf(['sm', 'md']),
};

export default TickerBadge;
