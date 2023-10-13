import "./cart-icon.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

const CartIcon = () => {
  const { isOpen, setIsOpen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsOpen(!isOpen);
  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" onClick={toggleIsCartOpen} />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
