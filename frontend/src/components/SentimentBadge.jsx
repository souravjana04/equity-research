import PropTypes from 'prop-types';

const SentimentBadge = ({ sentiment }) => {
  const baseClasses = 'font-ui text-[10px] font-semibold leading-[12px] tracking-[0.05em] uppercase rounded-sm border px-2 py-1 inline-flex items-center justify-center';
  
  const variantMap = {
    POSITIVE: 'bg-gain-bg border-gain-border text-gain',
    CAUTIOUS: 'bg-warning-bg border-warning-border text-warning',
    NEGATIVE: 'bg-loss-bg border-loss-border text-loss',
    NEUTRAL: 'bg-canvas border-default text-secondary',
  };

  return (
    <span className={`${baseClasses} ${variantMap[sentiment] || variantMap.NEUTRAL}`}>
      {sentiment}
    </span>
  );
};

SentimentBadge.propTypes = {
  sentiment: PropTypes.oneOf(['POSITIVE', 'CAUTIOUS', 'NEGATIVE', 'NEUTRAL']).isRequired,
};

export default SentimentBadge;
