import axios from 'axios';
// import {url} from "../lib/api";
import React, { useContext } from 'react';
import AppContext from './AppContext.js';

const PayButton = ({ cartItems }) => {
  const { user } = useContext(AppContext);
  const url = '/api';
  // const handleCheckout = () => {
  //   axios
  //     .post(`${url}/stripe/create-checkout-session/`, {
  //       cartItems,
  //       userId: user.userId,
  //     })
  //     .then((res) => {
  //       if (res.data.url) {
  //         window.location.href = res.data.url;
  //       }
  //     })
  //     .catch((err) => console.log(err.message));
  //   console.log('handleCheckout');
  // };

  // async function handleCheckout() {
  //   const req = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ cartItems, user }),
  //   };
  //   await fetch('/api/create-checkout-session', req);
  //   console.log(cartItems);
  // }

  async function handleCheckout() {
    const res = await fetch(`/api/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await res.json();
    window.location.href = body.url;
  }
  return (
    <>
      <button onClick={() => handleCheckout()}>Check Out</button>
    </>
  );
};

export default PayButton;
