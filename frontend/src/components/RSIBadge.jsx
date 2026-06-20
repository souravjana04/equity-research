import PropTypes from 'prop-types';

const RSIBadge = ({ value }) => {
  let styleClasses = '';
  let label = '';

  if (value < 40) {
    styleClasses = 'bg-gain/10 text-gain border-gain';
    label = `${value} OS`;
  } else if (value > 70) {
    styleClasses = 'bg-loss/10 text-loss border-loss';
    label = `${value} OB`;
  } else {
    styleClasses = 'bg-canvas text-secondary border-default';
    label = `${value} NE`;
  }

  return (
    <span className={`font-mono text-xs rounded-md px-2 py-0.5 border inline-flex items-center justify-center ${styleClasses}`}>
      {label}
    </span>
  );
};

RSIBadge.propTypes = {
  value: PropTypes.number.isRequired,
};

export default RSIBadge;
