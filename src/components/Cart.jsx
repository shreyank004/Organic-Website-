import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, incrementQuantity, decrementQuantity } from "../store/cartSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart({ isOpen, onToggle }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);

  const handleCheckout = () => {
    onToggle(); // Close cart
    navigate("/checkout");
  };

  const handleIncrement = (itemId) => {
    dispatch(incrementQuantity(itemId));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrementQuantity(itemId));
  };

  return (
    <>
 
      {isOpen && (
        <div className="cart-overlay" onClick={onToggle}></div>
      )}

 
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart</h2>
          <button 
            className="close-btn"
            onClick={onToggle}
            aria-label="Close cart"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <svg className="empty-cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p>Your cart is empty</p>
              <span>Add some items to get started</span>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img 
                        src={item.image || 'https://via.placeholder.com/60x60?text=Product'} 
                        alt={item.title || item.name || 'Product'}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/60x60?text=Product';
                        }}
                      />
                    </div>
                    <div className="item-details">
                      <h3 className="item-title">{item.title || item.name || 'Product'}</h3>
                      <p className="item-price">${(item.price || 0).toFixed(2)}</p>
                      <div className="item-quantity-controls">
                        <button 
                          onClick={() => handleDecrement(item.id)}
                          className="quantity-btn decrement"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="quantity-display">{item.quantity || 1}</span>
                        <button 
                          onClick={() => handleIncrement(item.id)}
                          className="quantity-btn increment"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <p className="item-total">Total: ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      aria-label="Remove item"
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span className="total-amount">${total.toFixed(2)}</span>
                </div>
                
                <div className="cart-actions">
                  <button 
                    className="clear-cart-btn"
                    onClick={() => dispatch(clearCart())}
                  >
                    Clear Cart
                  </button>
                  <button 
                    className="checkout-btn"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}