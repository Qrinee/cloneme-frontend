import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import DoctorTiles from "@/components/DoctorTiles";
import { Crown, MessageCircle, Heart, Image, Video, Coins, Check } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import StripeEmbeddedCheckout from "@/components/StripeEmbeddedCheckout";
import img1 from '../assets/task_01kmwzbe1tfvp912tg8rwe5hay_1774793926_img_1.webp'
import img2 from '../assets/task_01kmwzmaxbfbtrtm45b78g5cv6_1774794217_img_0.webp'

export default function PremiumPage() {
  const [searchParams] = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState('price_1TKc7ZC3BOlFgA9PiqYYgmMd');
  const [showCheckout, setShowCheckout] = useState(false);
  const isReturning = searchParams.get('return') === 'true';


  useEffect(() => {
    if (isReturning) {
      setShowCheckout(false);
    }
    const planParam = searchParams.get('plan');
    if (planParam === '1month') {
      setSelectedPlan('price_1TKaJyC3BOlFgA9PtqmM5YNl');
    } else if (planParam === '12month') {
      setSelectedPlan('price_1TKc7ZC3BOlFgA9PiqYYgmMd');
    }
  }, [isReturning, searchParams]);

  const plans = [
    { title: "1 month", price: "13.99", discount: null, id: 'price_1TKaJyC3BOlFgA9PtqmM5YNl' },
    { title: "3 months", price: "8.99", oldPrice: "13.99", discount: "35% OFF", id: 'price_1TKc6XC3BOlFgA9Puv0bQMYe' },
    { title: "12 months", price: "3.99", oldPrice: "13.99", discount: "70% OFF", badge: "BEST CHOICE", id: 'price_1TKc7ZC3BOlFgA9PiqYYgmMd' },
  ];

  const benefits = [
    "Create your own AI Girlfriend(s)",
    "Unlimited text messages",
    "Get 100 FREE tokens / month",
    "Remove image blur",
    "Generate images",
    "Create photos 18+",
    "Create videos 18+",
    "Instant response",
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f14] to-[#1a1a22] text-white flex flex-col items-center p-4">
     
        <div className="max-w-6xl w-full">
          {showCheckout ? (
            <div className="w-full max-w-md mx-auto relative rounded-xl overflow-hidden min-h-[500px]">
              <img src={img2} alt="Premium" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.5 }} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0f14]/20 to-[#0f0f14]" />
              <div className="relative z-10 p-4">
                <StripeEmbeddedCheckout 
                  selectedPlan={selectedPlan} 
                  onClose={() => setShowCheckout(false)} 
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Left Banner */}
              <div className="flex flex-col justify-between order-1">
                <div className="mt-6 md:mt-8 aspect-[3/4] md:aspect-auto rounded-xl overflow-hidden hidden md:block">
                  <img
                    src={img2}
                    alt="Premium Girl"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Pricing Card */}
              <div className="bg-[#15151d] rounded-2xl p-6 shadow-xl border border-gray-800 order-2 relative overflow-hidden">
                {/* Background image for mobile */}
                <img src={img2} alt="" className="md:hidden absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.15 }} />
                
                <div className="relative z-10">
                  <h1 className="text-xl md:text-2xl font-bold text-center mb-6">Choose your Plan</h1>

                <div className="space-y-3">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative border rounded-xl p-4 transition cursor-pointer ${
                      selectedPlan === plan.id
                        ? "border-[#e11d48] bg-[#e11d48]/10"
                        : "border-gray-700 bg-[#1b1b24] hover:border-gray-600"
                    }`}
                  >
                    {plan.badge && (
                      <span className="absolute -top-3 left-3 bg-[#e11d48] text-xs px-2 py-1 rounded font-bold">
                        {plan.badge}
                      </span>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{plan.title}</p>
                        {plan.discount && (
                          <p className="text-xs text-[#e11d48] font-medium">{plan.discount}</p>
                        )}
                      </div>

                      <div className="text-right">
                        {plan.oldPrice && (
                          <p className="text-sm line-through text-gray-500">
                            ${plan.oldPrice}
                          </p>
                        )}
                        <p className="text-xl font-bold">
                          ${plan.price} <span className="text-sm font-normal text-gray-400">/ mo</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-3">
                <button 
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-[#e11d48] hover:bg-[#be123c] transition rounded-xl py-3 font-semibold text-white shadow-lg shadow-red-500/10 cursor-pointer"
                >
                  Pay with Credit / Debit Card
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                {selectedPlan === 'price_1TKaJyC3BOlFgA9PtqmM5YNl' ? "Monthly billing. Cancel anytime." : selectedPlan === 'price_3month' ? "Quarterly billing. Cancel anytime." : "Annual payment billed as $47.88. Cancel anytime."}
              </p>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Charge shown as "Dyzmas" on your bank statement
              </p>
              <p className="text-xs text-gray-500 mt-1 text-center">
                No hidden fees • Cancel subscription at any time
              </p>
            </div>
            </div>

            {/* Benefits */}
            <div className="flex flex-col justify-between order-3">
              <div>
                <h2 className="text-xl font-bold mb-4">Premium Benefits</h2>
                <ul className="space-y-3">
                  {benefits.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 bg-[#e11d48]/20 rounded-full flex items-center justify-center">
                        <Check size={12} className="text-[#e11d48]" />
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                  </ul>
                </div>

                <div className="mt-6 md:mt-8 aspect-[3/4] md:aspect-auto md:h-64 overflow-hidden hidden md:block">
                  <img
                    src={img1}
                    alt="Premium Model"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>

          )}
        </div>
        <DoctorTiles />
   </div>
    </Layout>
  );
}





