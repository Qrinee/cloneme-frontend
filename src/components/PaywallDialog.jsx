import React, { useState } from 'react';
import { Crown, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import StripeEmbeddedCheckout from "./StripeEmbeddedCheckout";

export default function PaywallDialog({ open, onOpenChange }) {
  const [selectedPlan, setSelectedPlan] = useState('price_1TKc7ZC3BOlFgA9PiqYYgmMd');
  const [showCheckout, setShowCheckout] = useState(false);

  const plans = [
    { title: "1 month", price: "13.99", id: 'price_1TKaJyC3BOlFgA9PtqmM5YNl' },
    { title: "3 months", price: "8.99", discount: "35% OFF", id: 'price_1TKc6XC3BOlFgA9Puv0bQMYe' },
    { title: "12 months", price: "3.99", discount: "70% OFF", badge: "BEST", id: 'price_1TKc7ZC3BOlFgA9PiqYYgmMd' },
  ];

  const benefits = [
    "Create your own AI Girlfriend(s)",
    "Unlimited text messages",
    "Get 100 FREE tokens / month",
    "Remove image blur",
    "Generate images",
    "Fast response time",
  ];

  const handleClose = () => {
    setShowCheckout(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-[#15151d] border-gray-800 text-white overflow-hidden p-0 max-h-[90vh]">
        <div className="overflow-y-auto max-h-[85vh]">
          {showCheckout ? (
            <div className="p-2">
              <StripeEmbeddedCheckout 
                selectedPlan={selectedPlan} 
                onClose={() => setShowCheckout(false)} 
              />
            </div>
          ) : (
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="text-yellow-500" size={24} />
                <h2 className="text-xl font-bold">Premium Required</h2>
              </div>

              <p className="text-gray-400 text-sm">
                This content is available exclusively for Premium subscribers.
              </p>

              <div className="space-y-2">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative border rounded-lg p-3 cursor-pointer transition ${
                      selectedPlan === plan.id
                        ? "border-red-500 bg-red-500/10"
                        : "border-gray-700 bg-[#1b1b24] hover:border-gray-600"
                    }`}
                  >
                    {plan.badge && (
                      <span className="absolute -top-2 right-2 bg-red-500 text-[10px] px-1.5 py-0.5 rounded font-bold">
                        {plan.badge}
                      </span>
                    )}
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-sm">{plan.title}</p>
                      <div className="text-right">
                        {plan.discount && (
                          <span className="text-xs text-red-400 mr-2">{plan.discount}</span>
                        )}
                        <span className="font-bold">${plan.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <ul className="space-y-2">
                {benefits.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                    <div className="w-4 h-4 bg-red-500/20 rounded-full flex items-center justify-center">
                      <Check size={10} className="text-red-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => setShowCheckout(true)}
                className="w-full bg-red-500 hover:bg-red-600 font-semibold"
              >
                <Crown size={18} className="mr-2" />
                Upgrade Now
              </Button>

              <p className="text-[10px] text-gray-500 text-center">
                Cancel anytime • Secure payment
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
