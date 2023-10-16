import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {
  Name,
  Price,
  Footer,
  ProductCardContainer,
} from "./product-card.styles.jsx";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addToCart } = useContext(CartContext);
  const addProductTocart = () => addToCart(product);
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <Name>{name}</Name>
        <Price>{price}</Price>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductTocart}
      >
        Add to card
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
