import PropTypes from 'prop-types';

const SectorTag = ({ children }) => {
  return (
    <span className="font-ui text-[12px] font-medium leading-[16px] bg-canvas text-secondary rounded-sm px-2 py-1 inline-flex items-center justify-center">
      {children}
    </span>
  );
};

SectorTag.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectorTag;
