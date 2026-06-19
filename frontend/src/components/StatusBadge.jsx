import PropTypes from 'prop-types';

const StatusBadge = ({ status }) => {
  const baseClasses = 'font-ui text-[10px] font-semibold leading-[12px] tracking-[0.05em] uppercase rounded-sm border px-2 py-1 inline-flex items-center justify-center';
  
  const variantMap = {
    ACTIVE: 'bg-gain-bg border-gain-border text-gain',
    EXITED: 'bg-muted border-default text-secondary',
    PAUSED: 'bg-warning-bg border-warning-border text-warning',
    INVALIDATED: 'bg-loss-bg border-loss-border text-loss',
  };

  return (
    <span className={`${baseClasses} ${variantMap[status] || variantMap.EXITED}`}>
      {status}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.oneOf(['ACTIVE', 'EXITED', 'PAUSED', 'INVALIDATED']).isRequired,
};

export default StatusBadge;
