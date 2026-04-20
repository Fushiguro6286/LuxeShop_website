import { motion } from 'framer-motion';
import { FiSliders } from 'react-icons/fi';
import { capitalize } from '../../utils/helpers';
import './Filters.css';

const PRICE_RANGES = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under $50', value: '0-50' },
  { label: '$50 – $100', value: '50-100' },
  { label: '$100 – $300', value: '100-300' },
  { label: '$300 – $500', value: '300-500' },
  { label: '$500+', value: '500+' },
];

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Top Rated', value: 'rating' },
  { label: 'Name A–Z', value: 'name-asc' },
];

const Filters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <motion.aside
      className="filters"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="filters-header">
        <FiSliders />
        <span>Filters</span>
      </div>

      <div className="filter-section">
        <h4 className="filter-title">Category</h4>
        <div className="filter-options">
          <button
            className={`filter-chip ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => onCategoryChange('all')}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat)}
            >
              {capitalize(cat)}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-title">Price Range</h4>
        <div className="filter-options">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.value}
              className={`filter-chip ${priceRange === range.value ? 'active' : ''}`}
              onClick={() => onPriceChange(range.value)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-title">Sort By</h4>
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </motion.aside>
  );
};

export default Filters;
