import PropTypes from 'prop-types';

const Card = ({ children, header, footer, padding = 'p-card-padding', className = '' }) => {
  return (
    <div className={`bg-surface border border-default rounded-lg flex flex-col ${className}`}>
      {header && (
        <div className="border-b border-subtle px-card-padding py-3">
          {header}
        </div>
      )}
      <div className={`flex-1 ${padding}`}>
        {children}
      </div>
      {footer && (
        <div className="border-t border-subtle px-card-padding py-3">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
  padding: PropTypes.string,
  className: PropTypes.string,
};

export default Card;
