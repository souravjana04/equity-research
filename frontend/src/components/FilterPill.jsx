import PropTypes from 'prop-types';

const FilterPill = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`rounded-full px-3 py-1 text-sm transition-colors focus:outline-none ${
      active
        ? 'bg-accent text-white'
        : 'bg-muted/10 text-primary hover:bg-muted/20'
    }`}
  >
    {label}
  </button>
);

FilterPill.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FilterPill;
