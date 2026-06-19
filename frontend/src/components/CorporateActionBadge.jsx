import PropTypes from 'prop-types';

const CorporateActionBadge = ({ status }) => {
  const baseClasses = 'font-ui text-[10px] font-semibold leading-[12px] tracking-[0.05em] uppercase rounded-sm border px-2 py-1 inline-flex items-center justify-center';
  
  const variantMap = {
    SCHEDULED: 'bg-info-bg border-info-border text-info',
    COMPLETED: 'bg-gain-bg border-gain-border text-gain',
    PENDING_APPROVAL: 'bg-warning-bg border-warning-border text-warning',
    UPCOMING: 'bg-muted border-default text-secondary',
    PAID: 'bg-gain-bg border-gain-border text-gain',
  };

  return (
    <span className={`${baseClasses} ${variantMap[status] || variantMap.UPCOMING}`}>
      {status.replace('_', ' ')}
    </span>
  );
};

CorporateActionBadge.propTypes = {
  status: PropTypes.oneOf(['SCHEDULED', 'COMPLETED', 'PENDING_APPROVAL', 'UPCOMING', 'PAID']).isRequired,
};

export default CorporateActionBadge;
