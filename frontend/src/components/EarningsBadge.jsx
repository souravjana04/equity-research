import PropTypes from 'prop-types';

const EarningsBadge = ({ type }) => {
  const baseClasses = 'font-ui text-xs font-medium uppercase rounded-md border px-2 py-0.5 inline-flex items-center justify-center';
  
  const variantMap = {
    beat: 'bg-gain/10 border-gain text-gain',
    miss: 'bg-loss/10 border-loss text-loss',
    inline: 'bg-warning/10 border-warning text-warning',
    pending: 'bg-muted/10 border-default text-muted',
  };

  const labelMap = {
    beat: 'BEAT',
    miss: 'MISS',
    inline: 'IN-LINE',
    pending: 'PENDING',
  };

  return (
    <span className={`${baseClasses} ${variantMap[type] || variantMap.pending}`}>
      {labelMap[type] || type}
    </span>
  );
};

EarningsBadge.propTypes = {
  type: PropTypes.oneOf(['beat', 'miss', 'inline', 'pending']).isRequired,
};

export default EarningsBadge;
