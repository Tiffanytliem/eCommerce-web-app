import axios from 'axios';
// import {url} from "../lib/api";
import React, { useContext } from 'react';
import AppContext from './AppContext.js';

const PayButton = ({ cartItems }) => {
  const { user } = useContext(AppContext);
  const url = '/api';
  const handleCheckout = () => {
    axios
      .post(`${url}/stripe/create-checkout-session`, {
        cartItems,
        userId: user.userId,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      });
    console.log('handleCheckout');
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check Out</button>
    </>
  );
};

export default PayButton;
