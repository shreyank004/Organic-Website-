import './ProductCard.css';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementQuantity, decrementQuantity } from "../store/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  

  const cartItem = cartItems.find(item => item.id === product.id);
  const isInCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;

  const isOnSale = product.oldPrice && product.oldPrice > product.price;
  

  const unitPrice = product.price || 0;
  const totalPrice = unitPrice * quantity;
  
  const handleAddToCart = () => {
    console.log('Adding product to cart:', product);
    try {
      dispatch(addToCart(product));
      console.log('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(product.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(product.id));
  };

  
  const getPriceDisplay = () => {
    if (product.priceRange) {
      return `$${product.priceRange.min.toFixed(2)} - $${product.priceRange.max.toFixed(2)}`;
    }
    return `$${unitPrice.toFixed(2)}`;
  };

  return (
    <div className="product-card">
      <img 
        src={product.image || product.images?.[0]} 
        alt={product.title || product.name || 'Product'} 
        className="product-image" 
      />
      <h3 className="product-title">{product.title || product.name || 'Product Title'}</h3>
      <div className="product-price">
        {getPriceDisplay()}
      </div>
      <div className="product-rating">
        {"★".repeat(5)}
      </div>
      
      {isInCart ? (
        <div className="quantity-controls">
          <button onClick={handleDecrement} className="quantity-btn decrement">
            -
          </button>
          <span className="quantity-display">{quantity}</span>
          <button onClick={handleIncrement} className="quantity-btn increment">
            +
          </button>
        </div>
      ) : (
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Add to Cart
        </button>
      )}
    </div>
  );
}


