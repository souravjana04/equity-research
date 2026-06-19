import PropTypes from 'prop-types';

const EarningsBadge = ({ type }) => {
  const baseClasses = 'font-ui text-[10px] font-semibold leading-[12px] tracking-[0.05em] uppercase rounded-sm border px-2 py-1 inline-flex items-center justify-center';
  
  const variantMap = {
    EPS_BEAT: 'bg-gain-bg border-gain-border text-gain',
    REV_MISS: 'bg-loss-bg border-loss-border text-loss',
    IN_LINE: 'bg-muted border-default text-secondary',
    PENDING: 'bg-warning-bg border-warning-border text-warning',
  };

  const labelMap = {
    EPS_BEAT: 'BEAT',
    REV_MISS: 'MISS',
    IN_LINE: 'IN LINE',
    PENDING: 'PENDING',
  };

  return (
    <span className={`${baseClasses} ${variantMap[type] || variantMap.IN_LINE}`}>
      {labelMap[type] || type}
    </span>
  );
};

EarningsBadge.propTypes = {
  type: PropTypes.oneOf(['EPS_BEAT', 'REV_MISS', 'IN_LINE', 'PENDING']).isRequired,
};

export default EarningsBadge;
