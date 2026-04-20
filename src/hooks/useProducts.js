import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/api';

const useProducts = (category = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      let data;
      if (category && category !== 'all') {
        data = await productService.getProductsByCategory(category);
      } else {
        data = await productService.getAllProducts(20);
      }
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
      console.error('useProducts error:', err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
};

export default useProducts;
