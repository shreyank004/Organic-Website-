import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from 'react';

const Header = ({ onCartToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          
            <img id="logo" src="./src/image/logo.png" alt="My App Logo" />
         
        </div>

        {/* <div className="mobile-menu-toggle" onClick={toggleMenu}>
          &#9776;
        </div> */}

        <nav className={`nav ${menuOpen ? 'show' : ''}`}>
          <ul className="nav-list">
            <li>
              <Link to="/" onClick={closeMenu}>Home</Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMenu}>About</Link>
            </li>
            <li>
              <Link to="/services" onClick={closeMenu}>Services</Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMenu}>Contact</Link>
            </li>
            <li>
              <Link to="/product" onClick={closeMenu}>Products</Link>
            </li>
            <li>
              <button 
                className="cart-toggle-btn"
                onClick={() => {
                  onCartToggle();
                  closeMenu();
                }}
                aria-label="Open cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/></svg>
                {cartItems.length > 0 && (
                  <span className="cart-badge">{cartItems.length}</span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

