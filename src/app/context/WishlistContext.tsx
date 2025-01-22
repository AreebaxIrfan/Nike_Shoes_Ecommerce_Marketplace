'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistItem {
  id: string;
  productName: string;
  price: number;
  image: string;
  slug: string;
}


interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on mount (only on client)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    }
  }, []);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (!prev.some((wishlistItem) => wishlistItem.id === item.id)) {
        const newWishlist = [...prev, item];
        if (typeof window !== 'undefined') {
          localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        }
        return newWishlist;
      } else {
        alert('This product is already in your wishlist!');
        return prev;
      }
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => {
      const newWishlist = prev.filter((item) => item.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      }
      return newWishlist;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
