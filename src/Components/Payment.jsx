import React, { useContext, useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { AuthContext } from './store/auth';
const stripePromise = loadStripe('pk_test_51Q51C9FGVuv3Ll7roCHsG794MGe0udnsyprzkY422XEfyaLl8dcqnoBl7klUt88r4BcxmGp5vrmQVVsFD021uf6r00wqnsTlo0');

export default function Payment({ totalPrice, setNextPage, totalQuantity }) {
  const [clientSecret, setClientSecret] = useState('');
  const { authData } = useContext(AuthContext)

  const token = localStorage.getItem("token");

  const handlePayment = async () => {

    await fetch('http://localhost:2000/api/create-payment-intent', {
      method: "post",
      body: JSON.stringify({ totalAmount: totalPrice }),
      headers: {
        "Content-Type": "application/json",
        'authorization': token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }

  const options = {
    clientSecret: clientSecret,
  };

  useEffect(() => {
    handlePayment();
  }, [authData])

  return (
    <>
      {clientSecret && <Elements stripe={stripePromise} options={options}>
        <CheckoutForm clientSecret={clientSecret} totalPrice={totalPrice} totalQuantity={totalQuantity} setNextPage={setNextPage} />
      </Elements>}

    </>
  );
}