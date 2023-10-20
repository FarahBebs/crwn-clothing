import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer";

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
  cartItems: [],
  addToCart: () => {},
  cartCount: 0,
  removeFromCart: () => {},
  deleteItem: () => {},
  total: 0,
});
const CART_ACTION_TYPES = {
  SET_IS_OPEN: "SET_IS_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};
const CartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };

    case CART_ACTION_TYPES.SET_IS_OPEN:
      return {
        ...state,
        isOpen: payload,
      };

    default:
      throw new Error(`no such type ${type} unthe cart reducer`);
  }
};

const INITIAL_STATE = {
  isOpen: false,
  cartItems: [],
  cartCount: 0,
  total: 0,
};

export const CartProvider = ({ children }) => {
  const [{ isOpen, cartItems, cartCount, total }, dispatch] = useReducer(
    CartReducer,
    INITIAL_STATE
  );

  const UpdateCartItemsReducer = (newCartItems) => {
    const cartNewCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce((sum, current) => {
      return sum + current.price * current.quantity;
    }, 0);
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: cartNewCount,
        total: newCartTotal,
      })
    );
  };
  const setIsOpen = (isOpen) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_OPEN, isOpen));
  };

  const addToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    UpdateCartItemsReducer(newCartItems);
  };

  const removeFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    UpdateCartItemsReducer(newCartItems);
  };

  const deleteItem = (productToDelete) => {
    const newCartItems = deleteCartItem(cartItems, productToDelete);
    UpdateCartItemsReducer(newCartItems);
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
