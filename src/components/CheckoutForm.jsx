import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

export default function CheckoutForm({ clientSecret, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardOptions, setCardOptions] = useState({});

  useEffect(() => {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    setCardOptions({
      style: {
        base: {
          fontSize: '16px',
          color: isDark ? '#ffffff' : '#000000',
          '::placeholder': {
            color: isDark ? '#aaaaaa' : '#666666',
          },
        },
        invalid: {
          color: '#fa755a',
        },
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      alert('Payment successful!');
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="p-4 border rounded mb-4 bg-transparent"
        options={cardOptions}
      />
      <Button disabled={!stripe || loading} type="submit" className="w-full">
        {loading ? 'Processing...' : 'Pay now'}
      </Button>
    </form>
  );
}
