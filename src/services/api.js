import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export const productService = {
  getAllProducts: async (limit = 20, sort = 'asc') => {
    const response = await api.get(`/products?limit=${limit}&sort=${sort}`);
    return response.data;
  },

  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/products/categories');
    return response.data;
  },

  getProductsByCategory: async (category) => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },
};

export default api;
