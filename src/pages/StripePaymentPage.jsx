import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXXXXXX");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/payment-success", // lub inny adres
      },
    });

    if (result.error) {
      console.error(result.error.message);
      alert("Błąd płatności: " + result.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <PaymentElement />
      <Button type="submit" disabled={!stripe} className="w-full">
        Zapłać
      </Button>
    </form>
  );
};

export default function StripePaymentPage() {
  const clientSecret = "pi_3RQbHaHbdhs7jgas0PnuMCPq_secret_BKdS55MNUk0wxvwWDDOWxDOQH"; // 🔐 

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <div className="py-10">
      <h2 className="text-2xl text-center mb-6 font-bold">Podsumowanie płatności</h2>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p className="text-center">Brak danych płatności.</p>
      )}
    </div>
  );
}
