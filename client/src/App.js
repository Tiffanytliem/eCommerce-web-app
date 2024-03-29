import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Catalog from './pages/Catalog.js';
import ProductDetails from './pages/ProductDetails.js';
import AppContext from './components/AppContext.js';
import Auth from './pages/AuthPage.js';
import Account from './pages/Account.js';
// import Cart from './components/Cart.js';
import About from './pages/About.js';
import Terms from './pages/Terms.js';
import Policy from './pages/Policy.js';
import CheckoutSuccess from './components/CheckoutSuccess';

const tokenKey = 'react-context-jwt';

function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  useEffect(() => {
    // If user logged in previously on this browser, authorize them
    const auth = localStorage.getItem(tokenKey);
    if (auth) {
      const a = JSON.parse(auth);
      setUser(a.user);
      setToken(a.token);
    }
    setIsAuthorizing(false);
  }, []);

  if (isAuthorizing) return null;

  function handleSignIn(auth) {
    localStorage.setItem(tokenKey, JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
  }

  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    setToken(undefined);
  }

  const contextValue = { user, token, handleSignIn, handleSignOut };
  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Catalog />} />
          <Route path="details/:productId" element={<ProductDetails />} />
          <Route path="sign-in" element={<Auth action="sign-in" />} />
          <Route path="sign-up" element={<Auth action="sign-up" />} />
          <Route path="account" element={<Account />} />
          {/* <Route path="cart" element={<Cart />} /> */}
          <Route path="about" element={<About />} />
          <Route path="terms" element={<Terms />} />
          <Route path="policy" element={<Policy />} />
          <Route path="checkout-success" element={<CheckoutSuccess />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}
export default App;
