import PropTypes from 'prop-types';

const RSIBadge = ({ value }) => {
  return (
    <span className="font-mono text-[11px] font-medium leading-[14px] bg-warning-bg border border-warning-border text-warning rounded-sm px-1.5 py-0.5 inline-flex items-center justify-center">
      RSI {value}
    </span>
  );
};

RSIBadge.propTypes = {
  value: PropTypes.number.isRequired,
};

export default RSIBadge;
