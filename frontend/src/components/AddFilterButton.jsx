import PropTypes from 'prop-types';
import { Plus } from 'lucide-react';

const AddFilterButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="inline-flex items-center gap-1.5 bg-transparent border border-dashed border-default hover:border-accent rounded-full px-3 py-1 font-ui text-[12px] text-muted hover:text-accent transition-colors focus:outline-none group"
    >
      <Plus className="w-3.5 h-3.5 group-hover:text-accent transition-colors" />
      <span>Add Filter</span>
    </button>
  );
};

AddFilterButton.propTypes = {
  onClick: PropTypes.func,
};

export default AddFilterButton;
