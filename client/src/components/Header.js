import '../styles.css';
import { Link, Outlet } from 'react-router-dom';
import { React, useContext, useState } from 'react';
import AppContext from '../components/AppContext';
import Cart from '../components/Cart';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  let [showCart, setShowCart] = useState(false);
  function handleCartClicked() {
    if (user) {
      console.log('Cart Clicked');
      setShowCart(true);
    } else {
      navigate('/account');
    }
  }
  function handleOnClose() {
    setShowCart(false);
    // document.body.style.overflow = 'unset';
  }

  return (
    <div>
      <div className="navbar">
        <Link to="/">
          <span className="nav-item nav-icon">
            <i class="mobile bi bi-list"></i>
            <p class="desktop shop">Shop</p>
          </span>
        </Link>
        <Link to="/about">
          <span className="nav-item nav-icon desktop about">About</span>
        </Link>
        {!user ? (
          <Link to="/sign-in">
            <span className="nav-item nav-icon">
              <i class="bi bi-person"></i>
            </span>
          </Link>
        ) : (
          <Link to="/account">
            <span className="nav-item nav-icon">
              <i class="bi bi-person"></i>
            </span>
          </Link>
        )}
        <div>
          <span className="nav-item nav-icon">
            <i class="bi bi-bag" onClick={handleCartClicked}></i>
          </span>
        </div>
      </div>
      <div className="cart-container">
        {showCart ? (
          <Cart onClose={() => handleOnClose()} />
        ) : (
          console.log('Close cart')
        )}
      </div>
      <Outlet></Outlet>
    </div>
  );
}
