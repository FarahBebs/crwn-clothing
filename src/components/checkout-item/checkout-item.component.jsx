import "./chechout-item.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
const CheckoutItem = ({ cartItem }) => {
  const { quantity, name, imageUrl, price } = cartItem;
  const { addToCart, removeFromCart, deleteItem } = useContext(CartContext);
  const clearItemHandler = () => deleteItem(cartItem);
  const addItemHandler = () => addToCart(cartItem);
  const removeItemHandler = () => removeFromCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span> <br />
      <div className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </div>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
{
  /* <span
        onClick={() => {
          addToCart(cartItem);
        }}
      >
        +
      </span>
      <span
        onClick={() => {
          removeFromCart(cartItem);
        }}
      >
        -
      </span> */
}
