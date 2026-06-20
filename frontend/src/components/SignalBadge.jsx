import PropTypes from 'prop-types';

const SignalBadge = ({ signal }) => {
  if (!signal || signal === '—') return <span className="text-muted">—</span>;

  const baseClasses = 'font-ui text-[10px] font-semibold leading-[12px] tracking-[0.05em] uppercase rounded-sm border px-2 py-1 inline-flex items-center justify-center';
  
  const variantMap = {
    'Breakout': 'bg-accent/10 border-accent text-accent',
    'Bullish MA Cross': 'bg-info/10 border-info text-info',
    'Volume Spike': 'bg-warning/10 border-warning text-warning',
    'Oversold': 'bg-gain/10 border-gain text-gain',
    'Overbought': 'bg-loss/10 border-loss text-loss',
  };

  const currentClass = variantMap[signal] || 'bg-canvas border-default text-secondary';

  return (
    <span className={`${baseClasses} ${currentClass}`}>
      {signal}
    </span>
  );
};

SignalBadge.propTypes = {
  signal: PropTypes.string.isRequired,
};

export default SignalBadge;
