import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/cartSlice";
import "./Checkout.css";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "United Kingdom (UK)",
    streetAddress: "",
    apartment: "",
    city: "",
    county: "",
    postcode: "",
    phone: ""
  });
  
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer");

  const total = cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      customerInfo: formData,
      items: cartItems.map(item => ({
        id: item.id,
        title: item.title || item.name,
        price: item.price,
        quantity: item.quantity || 1,
        total: (item.price || 0) * (item.quantity || 1),
        image: item.image
      })),
      paymentMethod,
      total,
      orderDate: new Date().toISOString()
    };
    
    console.log("Order submitted:", orderData);
    dispatch(clearCart());
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="checkout-empty-content">
          <svg className="empty-cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart before checkout</p>
          <button 
            className="continue-shopping-btn"
            onClick={() => navigate("/product")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <h1 className="checkout-title">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-sections">
            <div className="billing-section">
              <h2 className="section-title">Billing Details</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">
                    First name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName">
                    Last name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="companyName">Company name (optional)</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                  <option value="United States (US)">United States (US)</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="streetAddress">
                  House number and street name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="apartment">Apartment, suite, unit, etc. (optional)</label>
                <input
                  type="text"
                  id="apartment"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">
                    Town / City <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="county">County (optional)</label>
                  <input
                    type="text"
                    id="county"
                    name="county"
                    value={formData.county}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="postcode">
                    Postcode <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">
                    Phone <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="order-section">
              <h2 className="section-title">Your Order</h2>
              
              <div className="order-summary">
                <table className="order-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => {
                      const quantity = item.quantity || 1;
                      const price = item.price || 0;
                      const subtotal = price * quantity;
                      
                      return (
                        <tr key={item.id}>
                          <td>
                            <div className="order-item">
                              <img 
                                src={item.image || 'https://via.placeholder.com/40x40?text=Product'} 
                                alt={item.title || item.name || 'Product'}
                                className="order-item-image"
                              />
                              <span>{item.title || item.name || 'Product'}</span>
                            </div>
                          </td>
                          <td className="quantity-cell">
                            <span className="quantity-badge">{quantity}</span>
                          </td>
                          <td>${price.toFixed(2)}</td>
                          <td>${subtotal.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="subtotal-row">
                      <td colSpan="3">Subtotal</td>
                      <td>${total.toFixed(2)}</td>
                    </tr>
                    <tr className="total-row">
                      <td colSpan="3">Total</td>
                      <td>${total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Payment Methods */}
              <div className="payment-methods">
                <h3>Payment Methods</h3>
                
                <div className="payment-option">
                  <input
                    type="radio"
                    id="bank-transfer"
                    name="paymentMethod"
                    value="bank-transfer"
                    checked={paymentMethod === "bank-transfer"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="bank-transfer">Direct bank transfer</label>
                  {paymentMethod === "bank-transfer" && (
                    <div className="payment-description">
                      Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                    </div>
                  )}
                </div>

                <div className="payment-option">
                  <input
                    type="radio"
                    id="check"
                    name="paymentMethod"
                    value="check"
                    checked={paymentMethod === "check"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="check">Check payments</label>
                </div>

                <div className="payment-option">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="cod">Cash on delivery</label>
                </div>

                <div className="payment-option">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="paypal">PayPal</label>
                  <div className="paypal-logos">
                    <span>PayPal</span>
                    <div className="card-logos">
                      <span>Visa</span>
                      <span>Mastercard</span>
                      <span>Maestro</span>
                      <span>American Express</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="privacy-policy">
                <p>
                  Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{" "}
                  <a href="#" className="privacy-link">privacy policy</a>.
                </p>
              </div>

              <button type="submit" className="place-order-btn">
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
