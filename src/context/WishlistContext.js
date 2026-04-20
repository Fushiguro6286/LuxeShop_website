import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

const WISHLIST_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_WISHLIST: 'CLEAR_WISHLIST',
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case WISHLIST_ACTIONS.ADD_ITEM:
      if (state.find((item) => item.id === action.payload.id)) return state;
      return [...state, action.payload];

    case WISHLIST_ACTIONS.REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload);

    case WISHLIST_ACTIONS.CLEAR_WISHLIST:
      return [];

    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, dispatch] = useReducer(wishlistReducer, [], () => {
    try {
      const stored = localStorage.getItem('wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    dispatch({ type: WISHLIST_ACTIONS.ADD_ITEM, payload: product });
    toast.success('Added to wishlist ♥');
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: WISHLIST_ACTIONS.REMOVE_ITEM, payload: productId });
    toast.info('Removed from wishlist');
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) =>
    wishlistItems.some((item) => item.id === productId);

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlistContext must be used within WishlistProvider');
  }
  return context;
};

export default WishlistContext;
