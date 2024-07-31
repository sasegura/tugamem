import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";

import SetupForm from "./SetupForm";
// const stripePromise = loadStripe(
//   "pk_test_51NwhyoJ4OrXNMZuEms8GcE9s6CcRUpJtuODHvsZz1u5z9Gbya75dy4OyinOct1QaHsLFnxYWFT0cNftEC0yf9Yd600Cgky3yI8"
// );
const GamePaymentMain = () => {
  const [stripePromise, setStripePromise] = useState(null);

  const options = {
    mode: "setup",
    currency: "usd",
    paymentMethodCreation: "manual",
    appearance: {
      theme: "stripe",
    },
  };
  useEffect(() => {
    setStripePromise(
      loadStripe(
        "pk_test_51NwhyoJ4OrXNMZuEms8GcE9s6CcRUpJtuODHvsZz1u5z9Gbya75dy4OyinOct1QaHsLFnxYWFT0cNftEC0yf9Yd600Cgky3yI8"
      )
    );
  }, []);
  return (
    <>
      {stripePromise && (
        <Elements stripe={stripePromise} options={options}>
          <SetupForm />
        </Elements>
      )}
    </>
  );
};

export default GamePaymentMain;
