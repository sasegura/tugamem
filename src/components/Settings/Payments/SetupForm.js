import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import {
  confirmIntentApi,
  confirmPaymentApi,
} from "../../../network/api/otherDetailsApi";

import { useParams, useNavigate } from "react-router-dom";
import { message } from "antd";

const SetupForm = () => {
  const { id } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    setLoading(false);
    message.error(error.message);
    setErrorMessage(error.message);
  };

  const handleServerResponse = async (response, payment_id) => {
    console.log("6: reaspoinse", { response, payment_id });
    response?.message && message.error(response.message);
    if (response.error) {
      // Show error from server on payment form
    } else if (response.status === "requires_action") {
      // Use Stripe.js to handle the required next action
      const { error, setupIntent } = await stripe.handleNextAction({
        clientSecret: response.client_secret,
      });

      console.log("7: stapup intent", { error, setupIntent });

      if (error) {
        // Show error from Stripe.js in payment form
      } else {
        // Actions handled, show success message
      }
    } else if (response.status === "succeeded") {
      navigate("/my-payments");
      //  call api create payment intent api
      // if succes redirect user to balance page   succes msg
      // if error redirect user to balance page   error msg
      // let confirmPayment = await confirmPaymentApi({
      //   payment_method_id: payment_id,
      //   game_id: game_id,
      // });
      //console.log("8: confirm payment ", confirmPayment);
    } else {
      // No actions needed, show success message
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe) {
      return;
    }
    // const setupIntent = await stripe.retrieveSetupIntent({
    //   clientSecret: "seti_1OKkuZJ4OrXNMZuEwN7bdJNm",
    // });
    // console.log("setup ", setupIntent);
    setLoading(true);

    const { error: submitError } = await elements.submit();

    if (submitError) {
      console.log("1: err1", submitError);
      handleError(submitError);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      elements,
      params: {
        billing_details: {
          name: "Jenny Rosen",
        },
      },
    });

    console.log("2 : aaa => ", { error, paymentMethod });

    if (error) {
      console.log("3: err2", error);
      handleError(error);
      return;
    }
    console.log("4:  paymentmethod", paymentMethod);
    // const res = await fetch("/create-confirm-intent", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     paymentMethodId: paymentMethod.id,
    //   }),
    // });
    if (paymentMethod?.id) {
      const res = await confirmIntentApi({
        payment_method_id: paymentMethod.id,
        game_id: id,
      });
      console.log("5: res =>>> ", res);
      // message.error();
      if (res?.data?.status_code == 200 || res?.data?.status_code == 201) {
        handleServerResponse(res?.data?.data, paymentMethod?.id);
      }
    }
    // const data = await res.json();

    // Handle any next actions or errors. See the Handle any next actions step for implementation.
    // handleServerResponse(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      <div className="paying-btn-wrap">
        <button
          type="submit"
          disabled={!stripe || loading}
          className="see-all-btn"
          style={{
            fontSize: "1rem",
            height: "2.5rem",
            fontWeight: "500",
            lineHeight: "1.25rem",
            borderRadius: "3.125rem",
            minWidth: "10.625rem",
            backgroundColor: "#ffb100",
            borderColor: "#ffb100",
            color: "#fff",
            boxShadow: "none",
            cursor: "pointer",
            border: "none",
          }}
        >
          Submit
        </button>
      </div>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default SetupForm;
