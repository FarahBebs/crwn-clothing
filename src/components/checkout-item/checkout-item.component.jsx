import {
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Quentity,
  Arrow,
  Value,
  Price,
  RemoveButton,
} from "./chechout-item.styles";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
const CheckoutItem = ({ cartItem }) => {
  const { quantity, name, imageUrl, price } = cartItem;
  const { addToCart, removeFromCart, deleteItem } = useContext(CartContext);
  const clearItemHandler = () => deleteItem(cartItem);
  const addItemHandler = () => addToCart(cartItem);
  const removeItemHandler = () => removeFromCart(cartItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <Name>{name}</Name> <br />
      <Quentity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quentity>
      <Price>{price}</Price>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
