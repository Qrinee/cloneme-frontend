import { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";

export default function AgeVerification() {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Check if user has already verified age
    const verified = localStorage.getItem("age-verified-clonme");
    if (verified) {
      setIsVerified(true);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem("age-verified-clonme", "true");
    setIsVerified(true);
  };

  // Don't render anything if already verified
  if (isVerified) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-[#000000f8] z-[99999] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <svg
            className="w-16 h-16 mx-auto text-[var(--accent-primary)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          AGE VERIFICATION
        </h1>

        <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
          This website contains material intended for adults only (18+). By entering this site, you certify that you are at least 18 years old and legally permitted to view adult content in your jurisdiction.
        </p>

        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3 text-left">
            <span className="text-xl">🔞</span>
            <p className="text-sm text-gray-400">
              You must be 18 years of age or older to access this website. 
              If you are under 18, please exit now.
            </p>
          </div>
        </div>

        <button
          onClick={handleVerify}
          className="w-full sm:w-auto px-10 py-4 bg-[var(--accent-primary)] text-white text-lg font-semibold rounded-lg 
                     hover:bg-[var(--accent-primary)]/90 transition-all duration-200 
                     active:scale-95 shadow-lg shadow-[var(--accent-primary)]/20"
        >
          I AM 18+ / ENTER
        </button>

        <p className="text-xs text-gray-500 mt-6">
          By clicking "I AM 18+" you confirm that you are of legal age to view adult content.
        </p>

        <div className="mt-8 flex items-center justify-center gap-2 text-gray-500 text-xs">
          <span><FaLock/></span>
          <span>Secure & Private</span>
        </div>
      </div>
    </div>
  );
}