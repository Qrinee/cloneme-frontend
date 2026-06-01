import { Check } from "lucide-react";
import Layout from "@/components/Layout";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import confetti from "canvas-confetti"; // I'll add a simple confetti effect for better UX if possible, or just standard UI. We'll skip confetti if it's not installed. Let's just use the existing UI.

export default function PremiumSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Optionally we can trigger confetti here if it was installed.
    // We'll leave it as is to match the exact previous UI.
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f14] to-[#1a1a22] text-white flex flex-col items-center p-4 pt-20">
        <div className="max-w-6xl w-full">
          <div className="bg-[#15151d] rounded-2xl p-10 md:p-16 shadow-2xl border border-gray-800 text-center max-w-2xl mx-auto flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <Check size={40} className="text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-lg text-gray-400 mb-4 max-w-md">
              Thank you for your purchase. Your Premium subscription is now active and you have full access to all features.
            </p>
            <p className="text-sm text-gray-500 mb-8 max-w-md">
              (If you created a new account during checkout, please check your email for your login credentials.)
            </p>
            <a href="/profile" className="bg-[#e11d48] hover:bg-[#be123c] transition rounded-xl px-8 py-4 font-semibold text-white shadow-lg shadow-red-500/10 inline-block">
              Go to Profile
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
