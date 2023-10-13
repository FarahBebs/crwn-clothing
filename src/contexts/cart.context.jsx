import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const { id } = productToAdd;
  const isProductExist = cartItems.find((item) => item.id === id);
  if (isProductExist) {
    return cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const { id } = productToRemove;
  const isProductExist = cartItems.find((item) => item.id === id);
  if (isProductExist.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== id);
  }
  if (isProductExist) {
    return cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
  }
};

const deleteCartItem = (cartItems, productToDelete) => {
  const { id } = productToDelete;
  return cartItems.filter((cartItem) => cartItem.id !== id);
};

export const CartContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
  cartItem: [],
  addToCart: () => {},
  cartCount: 0,
  removeFromCart: () => {},
  deleteItem: () => {},
  total: 0,
});

export const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartNewCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(cartNewCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((sum, current) => {
      return sum + current.price * current.quantity;
    }, 0);

    setTotal(newCartTotal);
  }, [cartItems]);

  const addToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const deleteItem = (productToDelete) => {
    setCartItems(deleteCartItem(cartItems, productToDelete));
  };

  const value = {
    isOpen,
    setIsOpen,
    cartItems,
    addToCart,
    cartCount,
    removeFromCart,
    deleteItem,
    total,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
