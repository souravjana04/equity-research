import PropTypes from 'prop-types';

const SignalBadge = ({ signal }) => {
  const baseClasses = 'font-ui text-[10px] font-semibold leading-[12px] tracking-[0.05em] uppercase rounded-sm border px-2 py-1 inline-flex items-center justify-center';
  
  const variantMap = {
    BUY: 'bg-gain-bg border-gain-border text-gain',
    SELL: 'bg-loss-bg border-loss-border text-loss',
    HOLD: 'bg-muted border-default text-secondary',
  };

  return (
    <span className={`${baseClasses} ${variantMap[signal] || variantMap.HOLD}`}>
      {signal}
    </span>
  );
};

SignalBadge.propTypes = {
  signal: PropTypes.oneOf(['BUY', 'SELL', 'HOLD']).isRequired,
};

export default SignalBadge;
