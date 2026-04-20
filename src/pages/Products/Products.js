import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useProducts from '../../hooks/useProducts';
import useDebounce from '../../hooks/useDebounce';
import SearchBar from '../../components/SearchBar/SearchBar';
import Filters from '../../components/Filters/Filters';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import { productService } from '../../services/api';
import {
  filterBySearch,
  filterByPrice,
  sortProducts,
  capitalize,
} from '../../utils/helpers';
import './Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [categories, setCategories] = useState([]);

  const debouncedSearch = useDebounce(searchQuery, 400);
  const { products, loading, error } = useProducts(
    selectedCategory !== 'all' ? selectedCategory : null
  );

  // Fetch categories
  useEffect(() => {
    productService.getCategories().then(setCategories).catch(console.error);
  }, []);

  // Sync category from URL
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat !== 'all') {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  const displayedProducts = useMemo(() => {
    let result = [...products];
    if (debouncedSearch) result = filterBySearch(result, debouncedSearch);
    if (priceRange !== 'all') result = filterByPrice(result, priceRange);
    result = sortProducts(result, sortBy);
    return result;
  }, [products, debouncedSearch, priceRange, sortBy]);

  const TABS = ['all', ...categories];

  return (
    <div className="products-page container">
      <motion.div
        className="products-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="section-title">
          {selectedCategory === 'all' ? (
            <>All <span>Products</span></>
          ) : (
            <><span>{capitalize(selectedCategory)}</span></>
          )}
        </h1>
        <p className="products-count">
          {loading ? 'Loading...' : `${displayedProducts.length} products found`}
        </p>
      </motion.div>

      <div className="products-search">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name, category, description..."
        />
      </div>

      <div className="category-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`category-tab ${selectedCategory === tab ? 'active' : ''}`}
            onClick={() => handleCategoryChange(tab)}
          >
            {tab === 'all' ? 'All Products' : capitalize(tab)}
          </button>
        ))}
      </div>

      <div className="products-layout">
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="products-main">
          {error ? (
            <div className="error-state">
              <p>⚠️ {error}</p>
            </div>
          ) : (
            <ProductGrid products={displayedProducts} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
