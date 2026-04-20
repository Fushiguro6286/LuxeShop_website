import { FiSearch, FiX } from 'react-icons/fi';
import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = 'Search products...' }) => {
  const handleClear = () => onChange('');

  return (
    <div className="search-bar">
      <FiSearch className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="search-clear" onClick={handleClear} aria-label="Clear search">
          <FiX />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
