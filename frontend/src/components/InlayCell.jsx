import PropTypes from 'prop-types';

const InlayCell = ({ children, className = '' }) => {
  return (
    <div className={`bg-canvas rounded-md px-metric-cell-px py-metric-cell-py ${className}`}>
      {children}
    </div>
  );
};

InlayCell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default InlayCell;
