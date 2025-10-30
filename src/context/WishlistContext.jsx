import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext(undefined);

const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem) => {
    setItems(currentItems => {
      if (currentItems.some(item => item.id === newItem.id)) {
        return currentItems;
      }
      return [...currentItems, newItem];
    });
  };

  const removeItem = (id) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const isInWishlist = (id) => {
    return items.some(item => item.id === id);
  };

  const clearWishlist = () => {
    setItems([]);
  };

  const itemCount = items.length;

  return (
    <WishlistContext.Provider value={{
      items,
      addItem,
      removeItem,
      isInWishlist,
      clearWishlist,
      itemCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export { WishlistProvider }; 