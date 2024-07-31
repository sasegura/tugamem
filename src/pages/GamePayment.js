import React from "react";
import GamePaymentMain from "../components/Settings/Payments/GamePaymentMain";
import StripeIntegration from "../components/StripIntegration";
import MainLayout from "../layout/mainLayout";

const GamePayment = () => {
  return (
    <MainLayout>
      <StripeIntegration />
    </MainLayout>
  );
};

export default GamePayment;
