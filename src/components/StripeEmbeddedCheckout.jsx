import { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function StripeEmbeddedCheckout({ selectedPlan, onClose }) {
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoadingUser(false);
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/mydata`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user?.email) {
            setUserEmail(data.user.email);
          }
        }
      } catch (err) {
        console.log("Could not fetch user data:", err);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, []);

  const fetchClientSecret = useCallback(() => {
    const body = { planId: selectedPlan };
    if (userEmail) {
      body.email = userEmail;
    }

    return fetch(`${import.meta.env.VITE_API_URL}/payment/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        return data.clientSecret;
      });
  }, [selectedPlan, userEmail]);

  const handleError = (err) => {
    setError(err.message);
  };

  if (loadingUser) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e11d48] mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-[#e11d48] mb-4">{error}</p>
        <button onClick={onClose} className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20">Close</button>
      </div>
    );
  }

  return (
    <div className="bg-[#15151d] rounded-xl p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Premium Plan</h3>
      </div>
      <div id="checkout">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret }}
          onError={handleError}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}





