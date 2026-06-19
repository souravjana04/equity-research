import PropTypes from 'prop-types';
import { Search } from 'lucide-react';

const SearchInput = ({ placeholder = 'Search...', value, onChange, shortcut }) => {
  return (
    <div className="relative flex items-center">
      <Search className="absolute left-3 w-4 h-4 text-muted" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-surface border border-default rounded-md py-2 pl-9 pr-10 text-[13px] font-ui text-primary placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
      />
      {shortcut && (
        <span className="absolute right-3 font-mono text-[11px] text-muted border border-default rounded px-1">
          {shortcut}
        </span>
      )}
    </div>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  shortcut: PropTypes.string,
};

export default SearchInput;
