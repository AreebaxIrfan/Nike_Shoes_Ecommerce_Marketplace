'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
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
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;

  getCartItemsCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);


// CartContext provider to manage state and interact with localStorage
interface CartProviderProps {
  children: React.ReactNode;
}


export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isClient]);


  // Add a product to the cart
  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.size === product.size
      );
      if (existingProduct) {
        return prevCart; // Avoid duplicates
      } else {
        return [...prevCart, product];
      }
    });
  };

  // Remove a product from the cart (match both id and size)
  const removeFromCart = (productId: string, size: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === productId && item.size === size))
    );
  };


  const updateQuantity = (productId: string, size: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.size === size ? { ...item, quantity } : item
      )
    );
  };
  
  // Get the total number of cart items
  const getCartItemsCount = () => cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getCartItemsCount }}>
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
