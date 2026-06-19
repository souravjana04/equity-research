import PropTypes from 'prop-types';

const SectionLabel = ({ children }) => {
  return (
    <div className="font-ui text-[10px] font-semibold leading-[12px] tracking-[0.05em] uppercase text-muted mb-3">
      {children}
    </div>
  );
};

SectionLabel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionLabel;
