
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);
};


export const truncateText = (text, maxLength = 80) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};


export const capitalize = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const calculateCartTotals = (cartItems) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxRate = 0.08; 
  const tax = subtotal * taxRate;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  return {
    subtotal,
    tax,
    shipping,
    total,
    itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
  };
};

export const getRatingStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  return { fullStars, hasHalf, emptyStars };
};

export const filterBySearch = (products, query) => {
  if (!query.trim()) return products;
  const lower = query.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      p.category.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower)
  );
};

export const filterByPrice = (products, priceRange) => {
  if (!priceRange || priceRange === 'all') return products;
  const ranges = {
    '0-50': [0, 50],
    '50-100': [50, 100],
    '100-300': [100, 300],
    '300-500': [300, 500],
    '500+': [500, Infinity],
  };
  const [min, max] = ranges[priceRange] || [0, Infinity];
  return products.filter((p) => p.price >= min && p.price <= max);
};

export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    case 'name-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'newest':
    default:
      return sorted.sort((a, b) => b.id - a.id);
  }
};

export const getUniqueCategories = (products) => {
  return [...new Set(products.map((p) => p.category))];
};
