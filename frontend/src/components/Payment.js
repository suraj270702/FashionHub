import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51Nec9rSGLrqb7o4YBrawx9YPYj3B5BHbQKUTEwYb0op8gkq1BmSXtH8esn3RwbaX01CJ1WLlgDJKZJTIaE0VD6RX00IRIJFN7R");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/v1/paymentprocess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({amount : orderInfo.totalprice}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}