import React, { useContext } from 'react';
import AppContext from './AppContext.js';

const PayButton = ({ cartItems }) => {
  const { user } = useContext(AppContext);

  async function handleCheckout() {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems }),
    };
    const res = await fetch(`/api/create-checkout-session`, req);
    const body2 = await res.json();
    console.log(req.body);
    window.location.href = body2.url;
  }
  return (
    <>
      <button className="payButton" onClick={() => handleCheckout()}>
        Check Out
      </button>
    </>
  );
};

export default PayButton;
