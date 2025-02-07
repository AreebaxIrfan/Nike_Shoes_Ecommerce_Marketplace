'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  color: string;
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string, size: string ) => void;
  updateQuantity: (productId: string, size: string, quantity: number ) => void;
  getCartItemsCount: () => number;
  clearCart: () => void; // ✅ Add this

}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}


export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage only once
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Add to cart function with localStorage update
  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.size === product.size
      );

      if (existingProduct) {
        return prevCart;
      } else {
        const updatedCart = [...prevCart, product];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      }
    });
  };

 

  // Remove from cart function
  const removeFromCart = (productId: string, size: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => !(item.id === productId && item.size === size)
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Update quantity function
  const updateQuantity = (productId: string, size: string, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const getCartItemsCount = () => cart.reduce((total, item) => total + item.quantity, 0);

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart'); // ✅ Ensure localStorage is cleared
  };
  
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, getCartItemsCount , clearCart  }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
