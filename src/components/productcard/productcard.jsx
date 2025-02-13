import { useCart } from "../../store/productStore"; // Import useCart hook
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  const { dispatch, cartItemAdd } = useCart();

  const handleAddToCart = () => {
    dispatch(cartItemAdd(product));
  };

  return (
    <div className="product-card ">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

// Type checking for props
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
